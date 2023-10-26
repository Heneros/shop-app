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
} from '@mui/material';
import { ShoppingCart, Person, ArrowDropDown } from '@mui/icons-material';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/auth';


export default function Header(props) {
  const { window } = props;

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


  const drawer = (
    <Box onClick={handleDrawerOpen} sx={{ display: "flex" }} component="header">
      <Typography variant="h5" sx={{ textAlign: "left" }} >
        React Shop
      </Typography>
      <List>
        {links && links.length > 0 ? (links.map((link) => {
          const { id, text, url } = link;
          return (
            <ListItem key={id} sx={{ textAlign: 'center' }}>
              <Link to={url}>{text}</Link>
            </ListItem>
          )
        })) : (
          <>No links</>
        )}
      </List>

    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position='static'>
        <Toolbar>
          <IconButton
            color="inherit"
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
            sx={{ flexGrow: 1 }}
          >
            React Shop
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }} >

            <List style={flexContainer}>
              {links.map((link) => {
                const { id, text, url } = link;
                return (
                  <li key={id} style={{ padding: ' 0 15px' }} >
                    <Link
                      to={url}
                      style={{ color: 'inherit', textDecoration: 'none' }}>
                      {text}
                    </Link>
                  </li>
                )
              })}
            </List>

          </Box>
        </Toolbar>
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

const NavContainer = styled.nav`
height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
    }
    @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
                `;