import Grid2 from '@mui/material/Unstable_Grid2';
import { Button, Box, Stack, Typography, BottomNavigation, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from 'react';
import CardCart from '../../components/cardCart/cardCart';
import CardCartBuket from '../../components/cardCart/cardCartBuket';


export default function Cart({ ucitajBukete, cartItems, setCartItems, pb, setCartItemsCount, cartItemsCount, setCartUkupnaCjena, cartUkupnaCjena, isLoggedIn, ucitajCvjetove, cartItemsBuketi, setCartItemsBuketi }) {
    const [kartPrazan, setKartPrazan] = useState(true)
    async function izvrsiNarudzbu() {
        const sadrzajNarudzbe = []
        try {

            for (let i = 0; i < cartItems.length; i++) {
                const data = {
                    "cvijet_id": cartItems[i].cvijet.id,
                    "kolicina_cvjeta": cartItems[i].kolicina,
                    "cijena": cartItems[i].kolicina * cartItems[i].cvijet.cijena
                };


                const cvjet = await pb.collection('sadrzajNarudzbe').create(data);
                sadrzajNarudzbe.push(cvjet.id)
                const dataCvijet = {

                    "kolicina": cartItems[i].cvijet.kolicina
                };

                const recordSmanjiKolicinuCvjeta = await pb.collection('cvjet').update(cartItems[i].cvijet.id, dataCvijet);
            }

            for (let i = 0; i < cartItemsBuketi.length; i++) {
                const data = {
                    "buket_id": cartItemsBuketi[i].buket.id,
                    "kolicina_cvjeta": cartItemsBuketi[i].kolicina,
                    "cijena": cartItemsBuketi[i].kolicina * cartItemsBuketi[i].buket.cijena
                };

                const buket = await pb.collection('sadrzajNarudzbe').create(data);
                sadrzajNarudzbe.push(buket.id)

                const dataCvijet = {

                    "kolicina": cartItemsBuketi[i].buket.kolicina
                };

                const recordSmanjiKolicinuBuketa = await pb.collection('buket').update(cartItemsBuketi[i].buket.id, dataCvijet);


            }
            const dataNarudzba = {
                "user_id": pb.authStore.model.id,
                "order_status": "cekanje na preuzimanje",
                "ukupnaCjena": cartUkupnaCjena,
                "sadrzajNarudzbe_id": sadrzajNarudzbe
            };

            const record = await pb.collection('narudzbe').create(dataNarudzba);
            sadrzajNarudzbe.splice(0, sadrzajNarudzbe.length)

        }
        catch (error) {
            window.alert("Neuspjesna narudzba!!!")
            console.log(error)
        }

    }


    return (

        <Container>
            {isLoggedIn ? (cartItemsCount > 0 ? (

                <Box>
                    <Stack sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} direction="row" spacing={2} width={'100%'} position={'sticky'} marginTop={'15px'}>
                        <Typography textAlign={'center'} fontWeight={'bold'} fontSize={'larger'}>Ukupna cjena: {cartUkupnaCjena + ' KM'}</Typography>
                        <Button margin={'auto'} size="large" color="primary" variant='outlined' onClick={() => {
                            for (let i = 0; i <= cartItems.length; i++) {
                                setCartItems([]);
                                setCartItemsBuketi([])
                                setCartItemsCount(0);
                                ucitajCvjetove();
                                ucitajBukete();
                                setCartUkupnaCjena(0);
                            }

                        }} hidden={kartPrazan}>
                            Ponisti narudzbu
                        </Button>
                        <Button margin={'auto'} size="large" sx={{ marginTop: '5px' }} color="primary" variant='contained' onClick={() => {
                            izvrsiNarudzbu()
                            setCartItems([])
                            setCartItemsBuketi([])
                            setCartItemsCount(0)
                            setCartUkupnaCjena(0);


                        }} hidden={kartPrazan}>
                            Zavrsi narudzbu
                        </Button>
                    </Stack>
                    <Grid2 container spacing={2}>
                        {cartItems.length > 0 ? (cartItems.map((cartItem) =>
                            <Grid2 item md={3} xs={12} sm={6} key={cartItem.cvijet.id + 1}>
                                <CardCart setCartUkupnaCjena={setCartUkupnaCjena} cartUkupnaCjena={cartUkupnaCjena} setCartItemsCount={setCartItemsCount} cartItemsCount={cartItemsCount} kolicinaMax={cartItem.kolicinaMaxpom} setKolicinaMax={cartItem.setKolicinaMax} kolicinaCvjeta={cartItem.kolicina} cvijet={cartItem.cvijet} setCartItems={setCartItems} cartItems={cartItems} img={pb.getFileUrl(cartItem.cvijet, cartItem.cvijet.slika)} naziv={cartItem.cvijet.naziv} opis={cartItem.cvijet.opis} maxKolicina={cartItem.cvijet.kolicina} cijena={cartItem.cvijet.cijena}></CardCart>

                            </Grid2>
                        )) : (<div></div>)}
                        {cartItemsBuketi.length > 0 ? (cartItemsBuketi.map((cartItem) =>
                            <Grid2 item md={3} xs={12} sm={6} key={cartItem.buket.id + 1}>
                                <CardCartBuket sadrzaj={cartItem.sadrzajBuketa} setCartUkupnaCjena={setCartUkupnaCjena} cartUkupnaCjena={cartUkupnaCjena} setCartItemsCount={setCartItemsCount} cartItemsCount={cartItemsCount} kolicinaMax={cartItem.kolicinaMaxpom} setKolicinaMax={cartItem.setKolicinaMax} kolicinaCvjeta={cartItem.kolicina} buket={cartItem.buket} setCartItemsBuketi={setCartItemsBuketi} cartItemsBuketi={cartItemsBuketi} img={pb.getFileUrl(cartItem.buket, cartItem.buket.slika)} naziv={cartItem.buket.naziv} maxKolicina={cartItem.buket.kolicina} cijena={cartItem.buket.cijena} opis={cartItem.buket.opis} />

                            </Grid2>
                        )) : (<div></div>)}

                    </Grid2>



                </Box>) : (<Typography sx={{
                    display: "flex", justifyContent: "center", color: 'red', fontSize: '100px', height: '75vh', alignItems: 'center', textAlign: 'center'
                }}>Cart je prazan</Typography>)
            ) :
                (<Typography sx={{
                    display: "flex", justifyContent: "center", color: 'red', fontSize: '100px', height: '75vh', alignItems: 'center', textAlign: 'center'
                }}>Morate se ulogovati da bi koristili cart</Typography>)
            }
        </Container >
    )


}