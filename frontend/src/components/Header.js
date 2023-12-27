import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { links } from '../utils/constants';
import CartButtons from './CartButtons';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  Avatar,
  Box,
  List,
  ListItem,
  Drawer,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { ShoppingCart, Person, ArrowDropDown, AccountCircle, Logout } from '@mui/icons-material';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/auth';
import { FaShoppingCart, FaUserPlus } from 'react-icons/fa';


export default function Header(props) {
  const { window } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart)

  const [mobileOpen, setMobileOpen] = useState(false);


  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation()


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error)
    }
  }
  const handleDrawerOpen = () => {
    setMobileOpen(prevState => !prevState)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }


  const drawer = (
    <Wrapper>
      <Box onClick={handleDrawerOpen} sx={{ display: "flex", textAlign: 'center', flexDirection: "column", justifyContent: 'center', m: 2 }} component="header">
        <Typography variant="h5" sx={{ textAlign: "center", }} >
          <Link to="/" className='logo'>
            React Shop
          </Link>
        </Typography>
        <Divider />
        {userInfo ? (
          <List sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', m: '0 auto' }}>
            <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
              <Link className='item-mob' style={ItemMobile}>Hello, {userInfo.name}</Link>
            </ListItem>
            <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
              <Link className='cart-btn' style={ItemMobile} to='/cart'>Cart
                <div className="cart-container">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <span className='cart-value'>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  )}
                </div>
              </Link>
            </ListItem>
            <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
              <Link className='item-mob' style={ItemMobile} to='/profile'>Profile</Link>
            </ListItem>
            <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
              <Link className='item-mob' style={ItemMobile} onClick={logoutHandler}>Logout</Link>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem sx={{ textAlign: 'center' }}>
              <Link to="/login" style={ItemMobile} >Login</Link>
            </ListItem>
            <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
              <Link className='cart-btn' style={ItemMobile} to='/cart'>Cart
                <div className="cart-container">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <span className='cart-value'>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  )}
                </div>
              </Link>
            </ListItem>
          </List>
        )}
      </Box>
    </Wrapper>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Wrapper>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav" position='static'>
          <Container maxWidth="lg" >
            <Box style={NavContainer}>
              <IconButton
                color="#000"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginRight: '5px' }}
              >
                <Link to="/" className='logo'>
                  React Shop
                </Link>
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }} >
                <List style={flexContainer}>
                  <div style={{ padding: ' 0 15px' }} >
                    <Link to="/cart" className='cart-btn'>
                      Cart
                      <div className="cart-container">
                        <FaShoppingCart />
                        {cartItems.length > 0 && (
                          <span className='cart-value'>
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                  {userInfo ? (
                    <div className='userInfo'>
                      <Button
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        className='auth-user'>
                        {userInfo.name}
                        <FaUserPlus />
                      </Button>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={handleClose} >

                          <Link to='/profile' className='menu-item-nav'>
                            <Avatar />
                            Profile
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                        {/* <li style={{ padding: ' 0 15px' }} >
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li style={{ padding: ' 0 15px' }} >
                          <Link onClick={logoutHandler}>Logout</Link>
                        </li> */}
                      </Menu>
                    </div>
                  ) : (
                    <li style={{ padding: ' 0 15px' }} >
                      <Link to="/login" className='auth-btn'>
                        Login
                        <FaUserPlus />
                      </Link>
                    </li>
                  )}
                </List>
              </Box>
            </Box>
          </Container>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            open={mobileOpen}
            onClose={handleDrawerOpen} >
            {drawer}
          </Drawer>
        </nav>
      </Box >
    </Wrapper>
  );
}
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}
const NavContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0px',
};
const ItemMobile = {
  color: '#000',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif ',
  textDecoration: 'none',
  textTransform: 'capitalize',
  fontWeight: '500',
  fontSize: '1.5rem',
  lineHeight: '1.5',
  textAlign: 'center',
}


const Wrapper = styled.div`
.cart-btn {
  font-size: 1.5rem;
  color: var(--clr-grey-1);
  display: flex;
  align-items: center;
  svg{
    fill: #000;
  }
}

.cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }

  .menu-itemm{
  color: #000;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
}



  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-user{
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
