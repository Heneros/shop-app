import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import PageHero from '../components/PageHero';
import { addToCart, clearCartItems, removeFromCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';
import { Button } from '@mui/material';


export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart


  // const addToCartHandler = (product, qty) => {
  //   dispatch(addToCart({ ...product, qty }));
  // };
  const handlerClearAll = (id) => {
    dispatch(clearCartItems());
  };

  // console.log(cartItems);
  if (cartItems.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/' className='btn'>
            fill it
          </Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <main>
      <PageHero title='cart' />
      <Wrapper className='section section-center'>
        <div className="cart-columns">
          <div className='content'>
            <h5></h5>
            <h5>Name</h5>
            <h5>quantity</h5>
            <h5>subtotal</h5>
            <span></span>
          </div>
          <hr />
        </div>
        {cartItems.map((item) => (
          <>
            <CartItem
              key={item.key}
              {...item} />
          </>
        ))}
        <div className="items-btns">
          <Link
            className='link-btn'
            to="/"
          >
            Continue Shopping
          </Link>
          <button
            type='button'
            className='link-btn clear-btn'
            onClick={handlerClearAll}>
            Clear All Items
          </button>
        </div>
        <CartTotal />
      </Wrapper>

    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  .items-btns{
    display: flex;
    justify-content: space-between;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn{
    /* display: flex;
    margin-left: auto; */
    background-color: #000;
  }
  .cart-columns{
    display: none;
    @media (min-width: 776px) {
    display: block;
    .content {
      display: grid;
      grid-template-columns: 316px 1fr 1fr 1fr auto;
      justify-items: center;
      column-gap: 1rem;
      h5 {
        color: var(--clr-grey-5);
        font-weight: 400;
      }
    }

    span {
      width: 2rem;
      height: 2rem;
    }
    hr {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
  }
  }
`