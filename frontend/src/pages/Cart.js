import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import PageHero from '../components/PageHero';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';


export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
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
                        <CartItem key={item.key} {...item} />
                    </>
                ))}

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