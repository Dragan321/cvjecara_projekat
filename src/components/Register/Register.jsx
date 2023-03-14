import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Box } from '@mui/system';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form';

export default function RegisterPoUp(props) {
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [uniqueEmail, setUniqueEmail] = useState(true);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const [tipKor, setTipKor] = React.useState('USER');
    const handleChangeTipKor = (event) => {
        setTipKor(event.target.value);
    };
    const [err, setErr] = useState('');


    const { register, handleSubmit, errors, reset } = useForm();
    async function registerForm(data) {
        const data1 = {
            "username": data.imeReg + data.prezimeReg,
            "email": data.emailReg,
            "emailVisibility": true,
            "password": data.passwordReg,
            "passwordConfirm": data.passwordReg,
            "name": data.imeReg,
            "role": data.tipKorReg,
            "last_name": data.prezimeReg,
            "title": data.titulaReg,
            "datum_rodjenja": new Date(data.datumRodjenjaReg).toUTCString()
        };
        try {
            const record = await props.pb.collection('users').create(data1);
            const record1 = await props.pb.collection('users').getList(1, 50, {
                filter: 'role = "ADMIN"'
            });
            console.log(record1)
            console.log(record)
            if (record1.totalItems == 0) {
                const data = {
                    "verified_admin": true
                };

                const record2 = await props.pb.collection('users').update(record.id, data);
            }

            if (record.role == 'ADMIN')
                window.alert('Uspjesna registracija!!!Morate sacekati na potvrdu od administratora da bi ste se mogli ulogovati');
            else
                window.alert('Uspjesna registracija');
            props.setopenRegisterPopUp(false);
            setErr('')
            reset();
        }
        catch (error) {
            setErr('Greska pri unosu!!!');
            console.log(error.data);
        }
    }

    async function jedinstvenEmail(event) {
        try {
            const resultList = await props.pb.collection('users').getList(1, 50, {
                filter: `email="${event.target.value}"`,
            });
            console.log(resultList)
            if (resultList.totalItems > 0) {
                setUniqueEmail(false)
            }
            else if (!uniqueEmail) {
                setUniqueEmail(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={props.openRegisterPopUp} onClose={() => { props.setopenRegisterPopUp(false); }} >
            <form onSubmit={handleSubmit(registerForm)}>

                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        {...register("imeReg")}
                        label="Ime"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        {...register("prezimeReg")}
                        label="Prezime"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        {...register("titulaReg")}
                        label="Titula"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        {...register("emailReg")}
                        error={!uniqueEmail}
                        helperText={uniqueEmail ? ('') : ("Email je vec u upotrebi")}
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={jedinstvenEmail}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        {...register("passwordReg")}
                        label="Sifra"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                    <Stack spacing={4} sx={{ marginTop: 'auto' }}>
                        <Box></Box>
                        <FormControl fullWidth>
                            <InputLabel id="selectLabel">Tip korisnika</InputLabel>
                            <Select
                                labelId="selectLabel"
                                {...register("tipKorReg")}
                                value={tipKor}
                                label="Tip korisnika"
                                onChange={handleChangeTipKor}
                            >
                                <MenuItem value={'USER'} selected>USER</MenuItem>
                                <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            fullWidth
                        >
                            <MobileDatePicker
                                {...register("datumRodjenjaReg")}
                                label="Datum rodjenja"
                                required
                                inputFormat="YYYY-MM-DD"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Box sx={{ color: 'red', fontWeight: 'bold' }}>{err}</Box>


                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button type='reset' onClick={() => { props.setopenRegisterPopUp(false) }} >Cancel</Button>
                    <Button variant='contained' type='submit' disabled={!uniqueEmail}>Register</Button>
                </DialogActions>
            </form>

        </Dialog>
    );


}





