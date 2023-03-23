import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Edit, Delete } from '@mui/icons-material'
import AlertDialog from './AlertDialog';
import FormDialog from './FormDialog';


export default function CustomTable ({ characters, onCheckboxSelect }) {
  const [selected, setSelected] = useState([]);
  const statusEmojiMap = {
    Alive: "\u{1F603}",
    Dead: "\u{1F635}",
    unknown: "\u{1F610}"
  }

  const handleSelectAll = (event) => {
    console.log(event.target.checked)
    if (event.target.checked) {
      const allCharacters = characters.map((character) => character.name);
      setSelected(allCharacters);
      return;
    }
    setSelected([]);
    console.log(selected)
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div>
      <h3>Rick & Morty Characters</h3>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                <Checkbox
                  color="primary"
                  inputProps={{
                    'aria-label': 'select all characters',
                  }}
                  indeterminate={selected.length > 0 && selected.length < characters.length}
                  checked={selected.length > 0}
                  onChange={handleSelectAll}
                />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.map((character) => {
                const isItemSelected = isSelected(character.name);
                return (
                  <TableRow
                  key={character.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={(event) => handleClick(character.name)}
                  />
                  </TableCell>
                  <TableCell>{character.name}</TableCell>
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