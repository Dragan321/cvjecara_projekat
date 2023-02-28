import * as React from 'react';
import './header.css'
import user_icon from '../../icons/account_circle_FILL0_wght400_GRAD0_opsz48.svg'
import { AppBar, Box, IconButton, SvgIcon, Toolbar, Typography } from "@mui/material";
import { bgcolor, Container } from "@mui/system";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { CvjetIcon } from '../customIcons/CvjetIcon';



export default function Header(props) {
    return (
        <AppBar position="sticky" sx={{ bgcolor: '#2979ff' }}>
            <Toolbar >

                <Box sx={{ alignItems: 'center', display: 'flex', color: 'white', fontSize: 'larger' }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button   >

                            <CvjetIcon sx={{ color: 'white', fontSize: '50px' }} />
                            <Typography sx={{ color: 'white' }}>Cvjecara ______</Typography>
                        </Button>
                    </Link>
                </Box>

                <Box sx={{ marginLeft: 'auto' }} >

                </Box>
                <Box sx={{ marginLeft: 'auto' }} >
                    <Link to='/cart'>
                        <IconButton  >
                            <Badge color="secondary" badgeContent={props.cartItemsCount}>
                                <ShoppingCartIcon sx={{ color: 'white', fontSize: '50px' }} />
                            </Badge>
                        </IconButton>
                    </Link>
                    <PopupState variant="popover" popupId="demo-popup-menu" >
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="text" sx={{ color: 'white' }} {...bindTrigger(popupState)} >
                                    <AccountCircleIcon sx={{ acolor: 'white', fontSize: '50px' }} />
                                    <Typography sx={{ color: 'white' }}>  {props.userName}</Typography>
                                </Button>
                                {props.isLoggedIn ? (
                                    <Menu {...bindMenu(popupState)}>
                                        <Link to='/dashboard' style={{ textDecoration: 'none' }} >
                                            <MenuItem onClick={popupState.close} id='profile' >
                                                <Typography sx={{ color: 'black' }}>Prikaz narudzbi</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link to='/' style={{ textDecoration: 'none' }} >
                                            <MenuItem onClick={() => { popupState.close(); props.logout(); }} id='logout'><Typography sx={{ color: 'black' }}>Logout</Typography></MenuItem>
                                        </Link>
                                    </Menu>
                                ) : (
                                    <Menu {...bindMenu(popupState)}>
                                        <Link to='/' style={{ textDecoration: 'none' }} >
                                            <MenuItem onClick={() => { props.setopenRegisterPopUp(true); popupState.close(); }} id='Register'><Typography sx={{ color: 'black' }}>Register</Typography></MenuItem>
                                        </Link>
                                        <Link to='/' style={{ textDecoration: 'none' }} >
                                            <MenuItem onClick={() => { props.setopenLoginPopUp(true); popupState.close() }} id='Login' ><Typography sx={{ color: 'black' }} >Login</Typography></MenuItem>
                                        </Link>

                                    </Menu>

                                )}

                            </React.Fragment>
                        )}
                    </PopupState>
                </Box>
            </Toolbar>
        </AppBar>


    );


}