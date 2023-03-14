import { Alert, Container, FormControl, InputLabel, MenuItem, NativeSelect, Select, Snackbar, Stack, Typography } from '@mui/material';
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
import React, { useState, useEffect, useRef } from 'react';


export default function Home(props) {
  const [value, setValue] = useState('1');
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermBuket, setSearchTermBuket] = useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [sortValue, setSortValue] = useState('Cjena+');
  const handleChangeSort = (event) => {
    setSortValue(event.target.value);
    if (props.cvjetovi.length > 0) {
      if (event.target.value === 'Cjena+')
        props.cvjetovi.sort((a, b) => a.cijena - b.cijena)
      else
        props.cvjetovi.sort((a, b) => b.cijena - a.cijena)
    }
  };
  const [sortValueBuket, setSortValueBuket] = useState('Cjena+');
  const handleChangeSortBuket = (event) => {
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
          <Stack direction={'row'}>
            <SearchBar style={{ border: 'solid 3px #2979ff', height: '45px' }} placeholder='Unesite pojam za pretragu'
              onChange={newValue => setSearchTerm(newValue)} onCancelResearch={() => setSearchTerm('')}
            />
            <FormControl sx={{ m: 1, minWidth: 120, height: '45px', margin: '0', marginLeft: '15px' }} size='small'>
              <Select sx={{ m: 1, minWidth: 120, height: '45px', margin: 'auto' }}
                value={sortValue}
                onChange={handleChangeSort}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >

                <MenuItem value={'Cjena+'}>Cjena u rastucem redosljedu</MenuItem>
                <MenuItem value={'Cjena-'}>Cjena u opadajucem redosljedu</MenuItem>


              </Select>
            </FormControl>

          </Stack>
          <Grid2 container spacing={2}>
            {
              props.pb.authStore.isValid ?
                (<Grid2 item md={3} xs={12} sm={6} >
                  <CardDodajCvijet ucitajCvjetove={props.setCvjetovi} pb={props.pb} />

                </Grid2>) : (<Box></Box>)
            }


            {props.cvjetovi.length > 0 ? (props.cvjetovi.map((cvjet) =>
              cvjet.naziv.toLowerCase().includes(searchTerm.toLowerCase()) ?
                (<Grid2 item md={3} xs={12} sm={6} key={cvjet.id}>
                  <CardCvijet pb={props.pb} setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} cvijet={cvjet} setCartItems={props.setCartItems} cartItems={props.cartItems} img={props.pb.getFileUrl(cvjet, cvjet.slika)} naziv={cvjet.naziv} opis={cvjet.opis} maxKolicina={cvjet.kolicina} cijena={cvjet.cijena}></CardCvijet>

                </Grid2>) : (<></>)
            )) : (<div></div>)}

          </Grid2>



        </TabPanel>
        <TabPanel value="2">
          <Stack direction={'row'}>
            <SearchBar style={{ border: 'solid 3px #2979ff', height: '45px' }} placeholder='Unesite pojam za pretragu'
              onChange={newValue => setSearchTermBuket(newValue)} onCancelResearch={() => setSearchTermBuket('')}
            />
            <FormControl sx={{ m: 1, minWidth: 120, height: '45px', margin: '0', marginLeft: '15px' }} size='small'>
              <Select sx={{ m: 1, minWidth: 120, height: '45px', margin: 'auto' }}
                value={sortValueBuket}
                onChange={handleChangeSortBuket}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'Cjena+'}>Cjena u rastucem redosljedu</MenuItem>
                <MenuItem value={'Cjena-'}>Cjena u opadajucem redosljedu</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Grid2 container spacing={2}>
            {
              props.pb.authStore.isValid ?
                (<Grid2 item md={3} xs={12} sm={6} >
                  <PopUpDodajBuket cvijece={props.cvjetovi} pb={props.pb} />

                </Grid2>) : (<Box></Box>)
            }


            {props.buketi.length > 0 ? (props.buketi.map((buket) =>
              buket.naziv.toLowerCase().includes(searchTermBuket.toLowerCase()) ?
                (<Grid2 item md={3} xs={12} sm={6} key={buket.id}>
                  <CardBuket setCartUkupnaCjena={props.setCartUkupnaCjena} cartUkupnaCjena={props.cartUkupnaCjena} setCartItemsCount={props.setCartItemsCount} cartItemsCount={props.cartItemsCount} buket={buket} cartItemsBuketi={props.cartItemsBuketi} setCartItemsBuketi={props.setCartItemsBuketi} img={props.pb.getFileUrl(buket, buket.slika)} naziv={buket.naziv} sadrzaj={buket.expand['sadrzajBuketa_id']} maxKolicina={buket.kolicina} cijena={buket.cijena} opis={buket.opis} />
                </Grid2>) : (<></>)
            )) : (<div></div>)}
          </Grid2>

        </TabPanel>
      </TabContext>






    </Container >
  );


}


