import { Alert, Button, Container, FormControl, MenuItem, Select, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
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
import SearchBar from '@mkyy/mui-search-bar';
import React, { useState, useEffect } from 'react';


export default function Home(props) {
  const [value, setValue] = useState('1');
  const [searchTermCvjet, setSearchTermCvjet] = useState('')
  const [searchTermBuket, setSearchTermBuket] = useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [sortValueCvjet, setSortValueCvjet] = useState('Cjena+');
  const handleChangeSortCvjetove = (event) => {
    setSortValueCvjet(event.target.value);
    if (props.cvjetovi.length > 0) {
      if (event.target.value === 'Cjena+')
        props.cvjetovi.sort((a, b) => a.cijena - b.cijena)
      else
        props.cvjetovi.sort((a, b) => b.cijena - a.cijena)
    }
  };
  const cvjetovi = [];
  const [sortValueBuket, setSortValueBuket] = useState('Cjena+');
  const handleChangeSortBukete = (event) => {
    setSortValueBuket(event.target.value);
    if (props.buketi.length > 0) {
      if (event.target.value === 'Cjena+')
        props.buketi.sort((a, b) => a.cijena - b.cijena)
      else
        props.buketi.sort((a, b) => b.cijena - a.cijena)
    }
  };


  useEffect(() => {
    props.cvjetovi.sort((a, b) => a.cijena - b.cijena)
    props.buketi.sort((a, b) => a.cijena - b.cijena)

  }, [])

  function searchSadrzajBuketa(buket, izraz) {
    var sadrzaj = buket.expand['sadrzajBuketa_id']
    var sadrzajBuketa = ''
    for (let item in sadrzaj) {
      sadrzajBuketa += ' ' + sadrzaj[item].expand['id_cvijeta'].naziv + ' x' + sadrzaj[item].kolicina

    }
    if (sadrzajBuketa.toLowerCase().includes(izraz))
      return true
    else return false
  }



  return (
    <Container sx={{ background: 'white' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} sx={{
            '& .MuiTabs-flexContainer': {
              flexWrap: 'wrap',
            },
          }} centered>
            <Tab label="Cvjece" icon={<CvjetIcon sx={{ fontSize: '45px' }} />} iconPosition="start" value="1" sx={{ fontSize: '45px' }} />
            <Tab label="Buketi" icon={<BuketIcon sx={{ fontSize: '45px' }} />} iconPosition="start" value="2" sx={{ fontSize: '45px' }} />
          </TabList>
        </Box>
        <TabPanel value="1" >
          <Grid2 container spacing={{ xs: 2, sm: 2, md: 0 }}>
            <Grid2 item >
              <SearchBar style={{ border: 'solid 2px gray', height: '45px' }} placeholder='Unesite pojam za pretragu'
                onChange={newValue => setSearchTermCvjet(newValue)} onCancelResearch={() => setSearchTermCvjet('')}
              />
            </Grid2>
            <Grid2 item md={3} xs={12} sm={6} >
              <FormControl sx={{ m: 1, minWidth: 120, height: '45px', margin: '0', marginLeft: '15px' }} size='small'>
                <Select sx={{ m: 1, minWidth: 120, height: '45px', margin: 'auto' }}
                  value={sortValueCvjet}
                  onChange={handleChangeSortCvjetove}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >

                  <MenuItem value={'Cjena+'}>Cjena u rastucem redosljedu</MenuItem>
                  <MenuItem value={'Cjena-'}>Cjena u opadajucem redosljedu</MenuItem>


                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            {
              props.pb.authStore.isValid ?
                (props.pb.authStore.model.role == 'ADMIN' ? (
                  <Grid2 item md={3} xs={12} sm={6} >
                    <CardDodajCvijet ucitajCvjetove={props.ucitajCvjetove} pb={props.pb} />
                    <PopUpDodajBuket cvjetovi={cvjetovi} ucitajCvjetove={props.ucitajCvjetove} cvijece={props.cvjetovi} ucitajBukete={props.ucitajBukete} pb={props.pb} />

                  </Grid2>) : (null)) : (null)
            }


            {props.cvjetovi.length > 0 ? (props.cvjetovi.map((cvjet) =>
              cvjet.naziv.toLowerCase().includes(searchTermCvjet.toLowerCase()) ?
                (<Grid2 item md={3} xs={12} sm={6} key={cvjet.id}>
                  <CardCvijet pb={props.pb} setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} cvijet={cvjet} setCartItems={props.setCartItems} cartItems={props.cartItems} img={props.pb.getFileUrl(cvjet, cvjet.slika)} naziv={cvjet.naziv} opis={cvjet.opis} maxKolicina={cvjet.kolicina} cijena={cvjet.cijena}></CardCvijet>

                </Grid2>) : (<></>)
            )) : (<div></div>)}

          </Grid2>



        </TabPanel>
        <TabPanel value="2">
          <Grid2 container spacing={{ xs: 2, sm: 2, md: 0 }}>
            <Grid2 item>
              <SearchBar style={{ border: 'solid 2px gray', height: '45px' }} placeholder='Unesite pojam za pretragu'
                onChange={newValue => setSearchTermBuket(newValue)} onCancelResearch={() => setSearchTermBuket('')}
              />
            </Grid2>
            <Grid2 item>

              <FormControl sx={{ m: 1, minWidth: 120, height: '45px', margin: '0', marginLeft: '15px' }} size='small'>
                <Select sx={{
                  m: 1, minWidth: 120, height: '45px', margin: 'auto'
                }}
                  value={sortValueBuket}
                  onChange={handleChangeSortBukete}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={'Cjena+'}>Cjena u rastucem redosljedu</MenuItem>
                  <MenuItem value={'Cjena-'}>Cjena u opadajucem redosljedu</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            {
              props.pb.authStore.isValid ?

                (props.pb.authStore.model.role == 'ADMIN' ? (
                  <Grid2 item md={3} xs={12} sm={6} >
                    <PopUpDodajBuket cvijece={props.cvjetovi} ucitajCvjetove={props.ucitajCvjetove} ucitajBukete={props.ucitajBukete} pb={props.pb} />
                    <CardDodajCvijet ucitajCvjetove={props.ucitajCvjetove} pb={props.pb} />

                  </Grid2>) : (null)) : (null)
            }


            {props.buketi.length > 0 ? (props.buketi.map((buket) =>
              buket.naziv.toLowerCase().includes(searchTermBuket.toLowerCase()) ?
                (<Grid2 item md={3} xs={12} sm={6} key={buket.id}>
                  <CardBuket setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} buket={buket} cartItemsBuketi={props.cartItemsBuketi} setCartItemsBuketi={props.setCartItemsBuketi} img={props.pb.getFileUrl(buket, buket.slika)} naziv={buket.naziv} sadrzaj={buket.expand['sadrzajBuketa_id']} maxKolicina={buket.kolicina} cijena={buket.cijena} opis={buket.opis} />
                </Grid2>) : (
                  searchSadrzajBuketa(buket, searchTermBuket.toLowerCase()) ? (
                    <Grid2 item md={3} xs={12} sm={6} key={buket.id}>
                      <CardBuket setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} buket={buket} cartItemsBuketi={props.cartItemsBuketi} setCartItemsBuketi={props.setCartItemsBuketi} img={props.pb.getFileUrl(buket, buket.slika)} naziv={buket.naziv} sadrzaj={buket.expand['sadrzajBuketa_id']} maxKolicina={buket.kolicina} cijena={buket.cijena} opis={buket.opis} />
                    </Grid2>
                  ) : (null)

                )
            )) : (<div></div>)}
          </Grid2>

        </TabPanel>
      </TabContext>






    </Container >
  );


}


