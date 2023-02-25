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
import DodajCvjet from "../dodajCvjetUBuketCard/dodajCvjetUBuketCard";
import FileUpload from "react-mui-fileuploader";


export default function PopUpDodajBuket({ pb, cvijece }) {
    const { register, handleSubmit, errors, reset } = useForm();

    const [open, setOpen] = useState(false);
    const cvjetovi = [];
    const [filesToUpload, setFilesToUpload] = useState()


    const handleFilesChange = (files) => {

        setFilesToUpload(files[0])
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    async function dodajBuket(data) {
        try {
            if (cvjetovi.length > 0) {

                const formData = new FormData();
                formData.append("naziv", data.naziv);
                formData.append("kolicina", data.kolicina,);
                formData.append("cijena", data.cijena);
                formData.append("opis", data.opis);
                formData.append("slika", filesToUpload);
                const record = await pb.collection('buket').create(formData);
                cvjetovi.forEach(myFunction);

                async function myFunction(cvjet) {
                    const data1 = {
                        "id_buketa": record.id,
                        "id_cvijeta": cvjet.id,
                        "kolicina": cvjet.kol
                    };

                    const record1 = await pb.collection('sadrzajBuketa').create(data1);
                    const dataCvijet = {

                        "kolicina": cvjet.maxKolicina - cvjet.kol
                    };
                    const recordSmanjiKolicinuCvjeta = await pb.collection('cvjet').update(cvjet.id, dataCvijet);
                }

                cvjetovi.splice(0, cvjetovi.length)
                reset();
                handleClose();
            } else window.alert('Morate izabrati bar jedan cvjet')
        }
        catch (err) {
            window.alert('Greska pri dodavanju');
            console.log(err)
        }


    }

    return (
        <Box>
            {
                pb.authStore.model.role == 'ADMIN' ? (

                    <Card sx={{ maxWidth: 345, marginTop: '15px' }}>
                        <CardActionArea sx={{ height: '100%' }} onClick={handleClickOpen}>

                            <AddIcon sx={{ fontSize: 155, margin: 'auto', display: 'flex' }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" sx={{ textAlign: 'center', width: '100%' }} component="div">
                                    Dodaj buket
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                ) : (<Box></Box>)

            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dodajte buket</DialogTitle>
                <form onSubmit={handleSubmit(dodajBuket)}>
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
                            sx={{ marginBottom: '25px' }}
                        />
                        <FileUpload multiFile={false} title='Dodajte sliku'
                            onFilesChange={handleFilesChange} />
                        <Grid2 container spacing={2}>

                            {cvijece.length > 0 ? (cvijece.map((cvijet) =>
                                <Grid2 item md={6} xs={12} sm={6} key={cvijet.id}>
                                    <DodajCvjet id={cvijet.id} cvjetovi={cvjetovi} img={pb.getFileUrl(cvijet, cvijet.slika)} naziv={cvijet.naziv} opis={cvijet.opis} maxKolicina={cvijet.kolicina} cijena={cvijet.cijena}></DodajCvjet>

                                </Grid2>
                            )) : (<div></div>)}
                        </Grid2>
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