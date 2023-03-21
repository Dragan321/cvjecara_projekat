import { Button, Checkbox } from "@mui/material";
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Slider, FormControlLabel } from '@mui/material';
import { useStateWithCallbackLazy } from 'use-state-with-callback';


export default function DodajCvjet({ img, naziv, maxKolicina, cijena, cvjetovi, id, maxKolicinaBuketa, setMaxKolicinaBuketa }) {
    const [kolicina, setKolicina] = useState(1);
    const [kolicinaMax, setKolicinaMax] = useState(maxKolicina);
    const [cijenaUkupno, setCijenaUkupno] = useState(cijena);
    const [disableButton, setDisableButton] = useState(false)
    const [uBuketu, setUBuketu] = useState(false);
    const [checked, setChecked] = useState(false)
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
        var maxBuketa = maxKolicinaBuketa
        var uBuketPom = uBuketu
        if (event.target.checked) {

            const kol = kolicina
            if (cvjetovi.filter((cvijet) => cvijet.id == id).length == 0) {
                cvjetovi.push({ id, kol, maxKolicina })
            }
            else {
                cvjetovi = cvjetovi.filter((cvijet) => cvijet.id != id)
                cvjetovi.push({ id, kol, maxKolicina })
            }
            if (maxKolicina / kolicina < maxKolicinaBuketa || maxKolicinaBuketa == 0)
                maxBuketa = (Math.round(maxKolicina / kolicina))

            uBuketPom = (true)

        }
        else {
            if (cvjetovi.length > 0) {
                cvjetovi.forEach(myFunction)

                function myFunction(item, index, arr) {
                    if (item.id == id)
                        cvjetovi.splice(index, 1)
                }
                if (cvjetovi.length > 0) {
                    let maxKolicinaBuketaPom = cvjetovi[0].maxKolicina / cvjetovi[0].kol
                    cvjetovi.forEach(cvjet => {
                        if (cvjet.maxKolicina / cvjet.kol < maxKolicinaBuketaPom)
                            maxKolicinaBuketaPom = Math.round(cvjet.maxKolicina / cvjet.kol)
                    })
                    maxBuketa = (maxKolicinaBuketaPom)
                }
            }
            else {
                maxBuketa = (0)
            }

            if (uBuketu)
                uBuketPom = (false)

        }
        if (uBuketPom != uBuketu)
            setUBuketu(uBuketPom)
        if (maxKolicinaBuketa != maxBuketa)
            setMaxKolicinaBuketa(maxBuketa)

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
                        disabled={disableButton || uBuketu}
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