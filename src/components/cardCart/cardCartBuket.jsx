import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Input, Slider, Stack } from '@mui/material';
import MuiInput from '@mui/material/Input';


export default function CardCartBuket({ img, naziv, sadrzaj, maxKolicina, cijena, buket, cartItemsBuketi, setCartItemsBuketi, kolicinaCvjeta, setKolicinaMax, kolicinaMax, setCartItemsCount, cartItemsCount, setCartUkupnaCjena, cartUkupnaCjena }) {
    function removeFromCart() {
        buket.kolicina = kolicinaMax + kolicinaCvjeta
        setCartItemsBuketi(cartItemsBuketi.filter((cartItem) => cartItem.buket != buket))
        setCartItemsCount(cartItemsCount - kolicinaCvjeta)
        setCartUkupnaCjena(cartUkupnaCjena - cijena * kolicinaCvjeta)

    }



    return (
        <Card sx={{ maxWidth: 345, marginTop: '15px' }}>
            <CardActionArea >
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
                            {'Sadrzaj: ' + sadrzaj}
                        </Typography>
                        <Typography id="non-linear-slider" gutterBottom>
                            Kolicina: {kolicinaCvjeta}
                        </Typography>

                        <Typography id="non-linear-slider" gutterBottom>
                            Cijena: {cijena * kolicinaCvjeta + ' KM'}
                        </Typography>
                        <Button fullWidth size="small" color="primary" variant='contained' onClick={removeFromCart}>
                            Ukloni iz korpe
                        </Button>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card>
    );



}