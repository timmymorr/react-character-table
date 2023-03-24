import { useState } from 'react';
import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material'
import AlertDialog from './AlertDialog';
import FormDialog from './FormDialog';


export default function CustomTable ({ characters, onCheckboxSelect }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const statusEmojiMap = {
    Alive: '\u{1F603}',
    Dead: '\u{1F635}',
    unknown: '\u{1F610}'
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allCharacters = characters.map((character) => character.name);
      setSelected(allCharacters);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = () => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(search.toLowerCase()))

  const sortedCharacters = stableSort(filteredCharacters, getComparator(order, orderBy));

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div>
      <h3>Rick & Morty Characters</h3>
      <div>
        <FormControl sx={{mb: 4, width: '50ch' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-search'>Search</InputLabel>
          <OutlinedInput
            id='outlined-adornment-search'
            type='text'
            onChange={handleSearch}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='search'
                  onClick={() => {console.log('search')}}
                  edge='end'
                >
                  {<Search/>}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
      </div>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color='primary'
                    inputProps={{
                      'aria-label': 'select all characters',
                    }}
                    indeterminate={selected.length > 0 && selected.length < characters.length}
                    checked={selected.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {['name', 'species', 'location', 'status', 'actions'].map(header => (
                  <TableCell key={header}>
                    {header !== 'actions' ? <TableSortLabel
                      active={orderBy === header}
                      direction={orderBy === header ? order : 'asc'}
                      onClick={handleSort(header)}
                    >
                      {header.toUpperCase()}
                    </TableSortLabel> : header.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCharacters.map((character) => {
                const isItemSelected = isSelected(character.name);
                return (
                  <TableRow
                  key={character.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                  <Checkbox
                    color='primary'
                    checked={isItemSelected}
                    onChange={(event) => handleClick(character.name)}
                  />
                  </TableCell>
                  <TableCell>
                    {character.name}
                  </TableCell>
                  <TableCell>{character.species}</TableCell>
                  <TableCell>{character.location.name}</TableCell>
                  <TableCell>{statusEmojiMap[character.status]}</TableCell>
                  <TableCell>
                    <FormDialog character={character}>
                      <Edit/>
                    </FormDialog>
                    <AlertDialog character={character}>
                      <Delete/>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}