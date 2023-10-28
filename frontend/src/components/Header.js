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
} from '@mui/material';
import { ShoppingCart, Person, ArrowDropDown, AccountCircle } from '@mui/icons-material';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/auth';
import { FaShoppingCart } from 'react-icons/fa';


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
            <Link className='item-mob' style={ItemMobile} to='/cart'>Cart</Link>
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
        </List>
      )}
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
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
                <li style={{ padding: ' 0 15px' }} >
                  <Link to="/cart">
                    <FaShoppingCart />
                    Cart
                  </Link>
                </li>
                {userInfo ? (
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <li style={{ padding: ' 0 15px' }} >
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li style={{ padding: ' 0 15px' }} >
                        <Link onClick={logoutHandler}>Logout</Link>
                      </li>
                    </Menu>
                  </div>
                ) : (
                  <li style={{ padding: ' 0 15px' }} >
                    <Link to="/login">Login</Link>
                  </li>
                )}
                {/* <li style={{ padding: ' 0 15px' }} >
                  <Link to="/cart">
                    Cart
                  </Link>
                </li> */}
                {/* {links.map((link) => {
                const { id, text, url } = link;
                return (
                  <li key={id} style={{ padding: ' 0 15px' }} >
                    <Link
                      to={url}
                      style={{ color: '#000', textDecoration: 'none' }}>
                      {text}
                    </Link>
                  </li>
                )
              })} */}
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
    // <AppBar position="static" >
    //   <Container>
    //     <Toolbar className='toolbar-class'>
    //       <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
    //         <Typography variant="h6">
    //           Logo
    //         </Typography>
    //       </Link>
    //       <Box className="item">
    //         {userInfo ? (
    //           <>
    //             <Button
    //               color="inherit"
    //               onClick={handleMenuOpen}
    //               endIcon={<ArrowDropDown />}
    //             >
    //               {userInfo.name}
    //             </Button>
    //           </>
    //         ) : (
    //           <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
    //             Sign In
    //           </Link>
    //         )}

    //         <Menu
    //           anchorEl={anchorEl}
    //           open={Boolean(anchorEl)}
    //           onClose={handleMenuClose}
    //         >
    //           {userInfo ? (
    //             <>
    //               <MenuItem>
    //                 <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
    //                   <ListItemText primary="Profile" />
    //                 </Link>
    //               </MenuItem>
    //               <MenuItem onClick={logoutHandler}>
    //                 <ListItemText primary="Logout" />
    //               </MenuItem>
    //             </>
    //           ) : (
    //             <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
    //               <ListItemText primary="Sign In 13" />
    //             </Link>
    //           )}
    //         </Menu>
    //         <CartButtons />
    //       </Box>

    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
  // <NavContainer>
  //   <div className='nav-center'>
  //     <div className='nav-header'>
  //       <Link to="/">
  //         Logo
  //       </Link>
  //     </div>
  //     <ul className='nav-links'>
  //       {links && links.length > 0 ? (links.map((link) => {
  //         const { id, text, url } = link;
  //         return (
  //           <li key={id}>
  //             <Link to={url}>{text}</Link>
  //           </li>
  //         )
  //       })) : (
  //         <>No links</>
  //       )}
  //     </ul>
  //     <CartButtons />
  //   </div>
  // </NavContainer>

}
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
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



// const NavContainer = styled.nav`
// height: 5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   .nav-center {
//     width: 90vw;
//     margin: 0 auto;
//     max-width: var(--max-width);
//   }
//   .nav-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .nav-links {
//       display: flex;
//       justify-content: center;
//       li {
//         margin: 0 0.5rem;
//       }
//     }
//     @media (min-width: 992px) {
//     .nav-toggle {
//       display: none;
//     }
//     .nav-center {
//       display: grid;
//       grid-template-columns: auto 1fr auto;
//       align-items: center;
//     }
//     .nav-links {
//       display: flex;
//       justify-content: center;
//       li {
//         margin: 0 0.5rem;
//       }
//       a {
//         color: var(--clr-grey-3);
//         font-size: 1rem;
//         text-transform: capitalize;
//         letter-spacing: var(--spacing);
//         padding: 0.5rem;
//         &:hover {
//           border-bottom: 2px solid var(--clr-primary-7);
//         }
//       }
//     }
//     .cart-btn-wrapper {
//       display: grid;
//     }
//   }
//                 `;