import { Box } from "@mui/system"
import { Card, CardActionArea, CardContent, Typography, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FileUpload from "react-mui-fileuploader";




export default function CardDodajCvijet({ pb, ucitajCvjetove }) {

    const { register, handleSubmit, errors, reset } = useForm();
    const [filesToUpload, setFilesToUpload] = useState()
    const [open, setOpen] = useState(false);
    const cvjetovi = [];
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function dodajCvjet(data) {

        try {
            const cvjet = {
                "naziv": data.naziv,
                "kolicina": data.kolicina,
                "cijena": data.cijena,
                "opis": data.opis
            };
            const formData = new FormData();
            formData.append("naziv", data.naziv);
            formData.append("kolicina", data.kolicina,);
            formData.append("cijena", data.cijena);
            formData.append("opis", data.opis);
            formData.append("slika", filesToUpload);


            const record = await pb.collection('cvjet').create(formData);

            reset();
            ucitajCvjetove();
            handleClose();

        }
        catch (err) {
            console.log(err);
            window.alert('Greska pri dodavanju');
        }




    }
    const handleFilesChange = (files) => {

        setFilesToUpload(files[0])
    };

    return (
        <Box>
            {
                pb.authStore.model.role == 'ADMIN' ? (

                    <Card sx={{ height: '100%', maxWidth: 345, marginTop: '15px' }}>
                        <CardActionArea sx={{ height: '100%' }} onClick={handleClickOpen}>

                            <AddIcon sx={{ fontSize: 155, margin: 'auto', display: 'flex' }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" sx={{ textAlign: 'center', width: '100%' }} component="div">
                                    Dodaj cvijet
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                ) : (<Box></Box>)

            }


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dodajte cvjet</DialogTitle>
                <form onSubmit={handleSubmit(dodajCvjet)}>
                    <DialogContent>
                        <TextField
                            {...register("naziv")}

                            autoFocus
                            margin="dense"
                            id="naziv"
                            label="Naziv"
                            type="text"
                            fullWidth
                            required
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="kolicina"
                            label="Kolicina"
                            type="number"
                            fullWidth
                            inputProps={{ min: 0 }}
                            min={0}
                            required
                            variant="standard"
                            {...register("kolicina")}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cijena"
                            label="Cijena u KM"
                            type="number"
                            required
                            fullWidth
                            inputProps={{ step: 'any', min: 0 }}
                            min={0}
                            variant="standard"
                            {...register("cijena")}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="opis"
                            label="Opis"
                            type="text"
                            fullWidth
                            required
                            variant="standard"
                            {...register("opis")}

                        />

                        <FileUpload multiFile={false} title='Dodajte sliku'
                            onFilesChange={handleFilesChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} type='reset'>Ponisti</Button>
                        <Button variant='contained' type='submit'>Dodaj</Button>
                    </DialogActions>
                </form>
            </Dialog>



        </Box>
    )




}