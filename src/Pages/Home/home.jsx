import { Container, Card, CardActionArea, CardMedia, CardContent, Typography, CardHeader, Stack, SvgIcon, Icon } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
import { useMemo, useEffect, useState } from "react";
import CardCvijet from "../../components/card/cardCvijet";
import CardDodajCvijet from '../../components/cardDodajCvijet/cardDodajCvijet';
import PopUpDodajBuket from '../../components/popupDodajBuket/popupDodajBuket';
import CardBuket from '../../components/card/cardBuket';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import { CvjetIcon } from '../../components/customIcons/CvjetIcon';
import { BuketIcon } from '../../components/customIcons/BuketIcon';
import RuzaIcon from '../../icons/roseIcon.png'


export default function Home(props) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  return (
    <Container sx={{ background: 'white' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} centered>
            <Tab label="Cvjece" icon={<CvjetIcon sx={{ fontSize: '45px' }} />} iconPosition="start" value="1" sx={{ fontSize: '45px' }} />
            <Tab label="Buketi" icon={<BuketIcon sx={{ fontSize: '45px' }} />} iconPosition="start" value="2" sx={{ fontSize: '45px' }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid2 container spacing={2}>
            {
              props.pb.authStore.isValid ?
                (<Grid2 item md={3} xs={12} sm={6} >
                  <CardDodajCvijet ucitajCvjetove={props.setCvjetovi} pb={props.pb} />

                </Grid2>) : (<Box></Box>)
            }


            {props.cvjetovi.length > 0 ? (props.cvjetovi.map((cvijet) =>
              <Grid2 item md={3} xs={12} sm={6} key={cvijet.id}>
                <CardCvijet pb={props.pb} setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} cvijet={cvijet} setCartItems={props.setCartItems} cartItems={props.cartItems} img={props.pb.getFileUrl(cvijet, cvijet.slika)} naziv={cvijet.naziv} opis={cvijet.opis} maxKolicina={cvijet.kolicina} cijena={cvijet.cijena}></CardCvijet>

              </Grid2>
            )) : (<div></div>)}

          </Grid2>



        </TabPanel>
        <TabPanel value="2">
          <Grid2 container spacing={2}>
            {
              props.pb.authStore.isValid ?
                (<Grid2 item md={3} xs={12} sm={6} >
                  <PopUpDodajBuket cvijece={props.cvjetovi} pb={props.pb} />

                </Grid2>) : (<Box></Box>)
            }


            {props.buketi.length > 0 ? (props.buketi.map((buket) =>
              <Grid2 item md={3} xs={12} sm={6} key={buket.id}>
                <CardBuket setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} buket={buket} cartItemsBuketi={props.cartItemsBuketi} setCartItemsBuketi={props.setCartItemsBuketi} img={props.pb.getFileUrl(buket, buket.slika)} naziv={buket.naziv} sadrzaj={buket.expand['sadrzajBuketa(id_buketa)']} maxKolicina={buket.kolicina} cijena={buket.cijena} />
              </Grid2>
            )) : (<div></div>)}
          </Grid2>

        </TabPanel>
      </TabContext>






    </Container >
  );


}


