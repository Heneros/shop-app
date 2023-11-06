import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function CartTotal() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  }
  return (
    <Wrapper>
      <article>
        <h5>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
          items
        </h5>
        <hr />
        <h4>
          order Total : <span>
            {formatPrice(subtotal.toFixed(2))}
          </span>
        </h4>
        <button className='btn'
          onClick={checkoutHandler}
        >
          Checkout
        </button>
      </article>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`