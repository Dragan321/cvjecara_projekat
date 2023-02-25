import { Button, Checkbox } from "@mui/material";
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Slider, FormControlLabel } from '@mui/material';


export default function DodajCvjet({ img, naziv, maxKolicina, cijena, cvjetovi, id }) {
    const [kolicina, setKolicina] = useState(1);
    const [kolicinaMax, setKolicinaMax] = useState(maxKolicina);
    const [cijenaUkupno, setCijenaUkupno] = useState(cijena);
    const [disableButton, setDisableButton] = useState(false)
    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            if (kolicinaMax == 0) {
                setKolicina(0);
                setCijenaUkupno(cijena);
            }
            else {
                setKolicina(newValue);
                setCijenaUkupno(newValue * cijena);
            }
        }
    }

    function dodajUklonicCvjet(event) {

        if (event.target.checked) {
            const kol = kolicina
            if (cvjetovi.filter((cvijet) => cvijet.id == id).length == 0) {
                cvjetovi.push({ id, kol, maxKolicina })
            }
            else {
                cvjetovi = cvjetovi.filter((cvijet) => cvijet.id != id)
                cvjetovi.push({ id, kol, maxKolicina })
            }

        }
        else {
            if (cvjetovi.length > 0) {
                cvjetovi.forEach(myFunction)

                function myFunction(item, index, arr) {
                    if (item.id == id)
                        cvjetovi.splice(index, 1)
                }
            }
        }


    }


    return (
        <Card sx={{ maxWidth: 345, marginTop: '15px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image={img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {naziv}
                    </Typography>
                    {!disableButton ? (<Typography id="non-linear-slider" gutterBottom>
                        Kolicina:{kolicina}
                    </Typography>) : (<Typography id="non-linear-slider" gutterBottom color={'red'}>Nema na stanju</Typography>)}

                    <Slider
                        value={kolicina}
                        min={0}
                        step={1}
                        max={kolicinaMax}
                        disabled={disableButton}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                    />
                    <FormControlLabel control={<Checkbox onChange={dodajUklonicCvjet} />} label="Dodaj u buket" />
                </CardContent>
            </CardActionArea>

        </Card>
    );



}