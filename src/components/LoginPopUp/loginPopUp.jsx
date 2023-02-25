import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
export default function LoginPopUp(props) { 
  const { register, handleSubmit } = useForm();
  function login(data) {
    props.login(data.username, data.password)

  }
  return (
      <Dialog open={props.openLogin} onClose={() => {props.setopenLogin(false); }} >
      <form onSubmit={handleSubmit(login)}  >

      <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          
            <TextField
            required
            autoFocus
            margin="dense"
            {...register("username")}
            label="Email ili Username"
            type="text"
            fullWidth
            variant="standard"
                />
            <TextField
            required
            autoFocus
            margin="dense"
            {...register("password")}
            label="Sifra"
            type="password"
            fullWidth
            variant="standard"
          />
          <Box sx={{ color: 'red', fontWeight:'bold' }}>{props.err}</Box>
        </DialogContent>
        <DialogActions>
          <Button type='reset' onClick={() => {props.setopenLogin(false)}} >Cancel</Button>
          <Button variant='contained' type='submit'>Login</Button>
        </DialogActions>
    </form>

      </Dialog>
    );


}