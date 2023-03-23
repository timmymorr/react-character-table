import { useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormControl, FormLabel, IconButton, Radio, RadioGroup, TextField } from '@mui/material';

export default function FormDialog({ character, children }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(character.name)
  const[location, setLocation] = useState(character.location.name)
  const [gender, setGender] = useState(character.gender)
  const [status, setStatus] = useState(character.status)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('Would call API with update here...')
    setOpen(false);
  };

  const updateName = (event) => {
    setName(event.target.value)
  }

  const updateLocation = (event) => {
    setLocation(event.target.value)
  }

  const updateGender = (event) => {
    setGender(event.target.value)
  }

  const updateStatus = (event) => {
    setStatus(event.target.value)
  }

  return (
    <span>
      <IconButton onClick={handleClickOpen}>
        {children}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit character</DialogTitle>
        <DialogContent>
          <Avatar alt={character.name} src={character.image} sx={{ width: 156, height: 156 }} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            onChange={updateName}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            value={location}
            onChange={updateLocation}
            type="text"
            fullWidth
            variant="standard"
          />
          <br/>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={updateGender}
            >
              <FormControlLabel value="Female" checked={gender === 'Female'} control={<Radio />} label="Female" />
              <FormControlLabel value="Male" checked={gender === 'Male'} control={<Radio />} label="Male" />
              <FormControlLabel value="unknown" checked={gender === 'unknown'} control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={updateStatus}
            >
              <FormControlLabel value="Dead" checked={status === 'Dead'} control={<Radio />} label="Dead" />
              <FormControlLabel value="Alive" checked={status === 'Alive'} control={<Radio />} label="Alive" />
              <FormControlLabel value="unknown" checked={status === 'unknown'} control={<Radio />} label="Unknown" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Edit</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}