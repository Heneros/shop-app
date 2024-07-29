import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'




export default function CartButtons() {
  // const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // const dispatch = useDispatch();
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   setAnchorEl(null);
  // };


  // const [logoutApiCall] = useLogoutMutation();

  // const logoutHandler = async () => {

  //   try {
  //     await logoutApiCall().unwrap();
  //     dispatch(logout());
  //     // console.log(logout());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' >
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          {
            cartItems.length > 0 && (
              <span className='cart-value'>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )
          }
        </span>
      </Link>
      {/* {userInfo ? (
        <>
          <Button
            color="inherit"
            className='cart-btn'
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            {userInfo.name}
            <AccountCircleIcon />
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/profile"
              disableRipple
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} disableRipple>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button color="inherit" component={Link} to="/login">
          <FaUser /> Sign In
        </Button>
      )} */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
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
`