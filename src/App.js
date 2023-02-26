import './App.css';
import { Container, Box, Button } from '@mui/material';
import Header from './components/Header/header';
import PocketBase from 'pocketbase';
import React, { useState, useEffect } from 'react';
import LoginPopUp from './components/LoginPopUp/loginPopUp';
import RegisterPoUp from './components/Register/Register';
import Home from './Pages/Home/home';
import Cart from './Pages/Cart/cart';
import { Redirect, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/dashboard';



const pb = new PocketBase('http://127.0.0.1:8090');


function App() {
  const [isLoggedIn, setlsLoggedin] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegisterPopUp, setopenRegisterPopUp] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsBuketi, setCartItemsBuketi] = useState([]);

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartUkupnaCjena, setCartUkupnaCjena] = useState(0);
  const [userName, setUserName] = useState('Gost');
  const [err, setErr] = useState('');
  const [cartClear, setCartClear] = useState(true);
  const [cvjetovi, setCvjetovi] = useState([]);
  const [buketi, setBuketi] = useState([]);

  function onLoadLogin() {
    if (pb.authStore.isValid) {
      setlsLoggedin(true);
      setUserName(pb.authStore.model.name + ' ' + pb.authStore.model.last_name);
    }
  }
  async function ucitajCvjetove() {
    try {
      const data = await pb.collection('cvjet').getList(1, 50, { '$autoCancel': false })
      setCvjetovi(data.items);
    } catch (error) {
      console.log(error);

    }
  }
  async function ucitajBukete() {
    try {
      const resultList = await pb.collection('buket').getList(1, 50, {
        expand: 'sadrzajBuketa_id.id_cvijeta',
        '$autoCancel': false
      });

      setBuketi(resultList.items)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onLoadLogin();
    ucitajCvjetove();
    ucitajBukete();


  }, [""]);


  useEffect(() => {
    if (cartItemsCount < 0)
      setCartItemsCount(0)
  }, [cartItemsCount]);


  async function login(username, password) {
    try {
      const authData = await pb.collection('users').authWithPassword(
        username,
        password
      ).then(function () {
        if (pb.authStore.isValid) {
          setlsLoggedin(true);
          setUserName(pb.authStore.model.name + ' ' + pb.authStore.model.last_name);
          setErr('')
          setOpenLogin(false)
          return true;
        }
        else {
          setlsLoggedin(false);
          setUserName('Gost');
          setErr('Greska pri unosu imena ili sifre!!!')
          return false;
        }
      })


    } catch (error) {
      setlsLoggedin(false);
      setUserName('Gost');
      setErr('Greska pri unosu imena ili sifre!!!')
      return false;
    }

  }
  async function logout() {

    if (pb.authStore.isValid) {
      pb.authStore.clear();
      setlsLoggedin(false);
      setUserName('Gost');
      return true;
    }

  }

  return (
    <Box>
      <Header setopenLoginPopUp={setOpenLogin} logout={logout} setCartItemsCount={setCartItemsCount} cartItemsCount={cartItemsCount} setopenRegisterPopUp={setopenRegisterPopUp} isLoggedIn={isLoggedIn} userName={userName}></Header>
      <LoginPopUp openLogin={openLogin} err={err} setopenLogin={setOpenLogin} isLoggedIn={isLoggedIn} login={login}></LoginPopUp>
      <RegisterPoUp pb={pb} setopenRegisterPopUp={setopenRegisterPopUp} openRegisterPopUp={openRegisterPopUp}></RegisterPoUp>

      <Routes>
        <Route path='/' element={<Home buketi={buketi} cvjetovi={cvjetovi} setCvjetovi={setCvjetovi} pb={pb} setCartItems={setCartItems} cartItems={cartItems} cartItemsBuketi={cartItemsBuketi} setCartItemsBuketi={setCartItemsBuketi} setCartItemsCount={setCartItemsCount} setCartUkupnaCjena={setCartUkupnaCjena} cartUkupnaCjena={cartUkupnaCjena} cartItemsCount={cartItemsCount} ></Home>}></Route>
        <Route path='/cart' element={<Cart ucitajBukete={ucitajBukete} cartItemsBuketi={cartItemsBuketi} setCartItemsBuketi={setCartItemsBuketi} ucitajCvjetove={ucitajCvjetove} isLoggedIn={isLoggedIn} setCartClear={setCartClear} cartClear={cartClear} pb={pb} setCartUkupnaCjena={setCartUkupnaCjena} cartUkupnaCjena={cartUkupnaCjena} cartItems={cartItems} setCartItemsCount={setCartItemsCount} cartItemsCount={cartItemsCount} setCartItems={setCartItems}></Cart>}></Route>
        <Route path='/dashboard' element={<Dashboard pb={pb} isLoggedIn={isLoggedIn} />} />
      </Routes>

    </Box>
  );
}

export default App;
