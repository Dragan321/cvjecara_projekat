import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Slider, Stack } from '@mui/material';

export default function CardCvijet({ img, naziv, opis, maxKolicina, cijena, cvijet, setCartItems, cartItems, setCartItemsCount, cartItemsCount, setCartUkupnaCjena, cartUkupnaCjena }) {
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

    useEffect(() => {
        if (kolicinaMax > 0) {
            setKolicina(1)

        }
        else {
            setCijenaUkupno(cijena);
            setKolicina(0);
            setDisableButton(true)
        }
    }, []);

    function dodajUCart() {

        var kolicinaMaxpom = kolicinaMax - kolicina

        setKolicinaMax(kolicinaMaxpom)
        cvijet.kolicina = kolicinaMaxpom
        if (kolicinaMaxpom > 0) {
            setKolicina(1)

        }
        else {
            setCijenaUkupno(cijena);
            setKolicina(0);
            setDisableButton(true)
        }
        if (kolicina > 0) {
            var duplikat = cartItems.filter((cartItem) => cartItem.cvijet == cvijet)
            if (duplikat.length > 0) {
                duplikat[0].kolicina += kolicina
                setCartItems(cartItems.filter((cartItem) => cartItem.cvijet != cvijet))
                setCartItems([...cartItems], duplikat[0])
                setCartItemsCount(cartItemsCount + kolicina)

            }
            else {
                setCartItemsCount(cartItemsCount + kolicina)
                setCartItems([...cartItems, { cvijet, kolicina, setKolicinaMax, kolicinaMaxpom }])
            }
            setCartUkupnaCjena(cartUkupnaCjena + kolicina * cijena)

        }
    }

    return (
        <Card sx={{ maxWidth: 345, marginTop: '15px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={img}
                />
                <CardContent>
                    <Stack spacing={1}>
                        <Typography gutterBottom variant="h5" component="div">
                            {naziv}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {opis}
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
                        <Typography id="non-linear-slider" gutterBottom>
                            Cijena: {cijenaUkupno + ' KM'}
                        </Typography>
                        <Button fullWidth size="small" color="primary" variant='contained' onClick={() => dodajUCart()} disabled={disableButton}>
                            Dodaj u korpu
                        </Button>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    );



}