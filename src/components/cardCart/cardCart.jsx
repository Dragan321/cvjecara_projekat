import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Input, Slider, Stack } from '@mui/material';
import MuiInput from '@mui/material/Input';


export default function CardCart({ img, naziv, opis, maxKolicina, cijena, cvijet, setCartItems, cartItems, kolicinaCvjeta, setKolicinaMax, kolicinaMax, setCartItemsCount, cartItemsCount, setCartUkupnaCjena, cartUkupnaCjena }) {
    function removeFromCart() {
        cvijet.kolicina = kolicinaCvjeta + kolicinaMax;
        setCartItems(cartItems.filter((cartItem) => cartItem.cvijet != cvijet))
        setCartItemsCount(cartItemsCount - kolicinaCvjeta)
        setCartUkupnaCjena(cartUkupnaCjena - cijena * kolicinaCvjeta)
    }



    return (
        <Card sx={{ marginTop: '15px' }}>
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