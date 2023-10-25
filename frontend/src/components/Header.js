import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { links } from '../utils/constants';
import CartButtons from './CartButtons';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import { ShoppingCart, Person, ArrowDropDown } from '@mui/icons-material';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { logout } from '../redux/slices/auth';


export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart)
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation()
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppBar position="static" >
      <Container>
        <Toolbar>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant="h6">
              Logo
            </Typography>
          </Link>

          {userInfo ? (
            <>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                endIcon={<ArrowDropDown />}
              >
  
                {userInfo.name}
              </Button>
            </>
          ) : (
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              Sign In 1
            </Link>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {userInfo ? (
              <>

                <MenuItem>
                  <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ListItemText primary="Profile" />
                  </Link>
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <ListItemText primary="Logout" />
                </MenuItem>

              </>
            ) : (

              <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Sign In 13" />
              </Link>

            )}
          </Menu>
          {/* <CartButtons /> */}
          {/* <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit">
              <Badge badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)} color="secondary">
         
              </Badge>
            </IconButton>
          </Link> */}
        </Toolbar>
      </Container>
    </AppBar>
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