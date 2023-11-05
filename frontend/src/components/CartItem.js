import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { useDispatch } from "react-redux";

import { removeFromCart, toggleAmount } from '../redux/slices/cartSlice'
import { formatPrice } from '../utils/helpers';

export default function CartItem({ _id, name, imageUrl, price, rating, company, qty, onQtyChange }) {
  // const isBase64Image = imageUrl && imageUrl.startsWith('data:image/jpeg;base64,');
  const [amount, setAmount] = useState(qty);
  const dispatch = useDispatch();



  const handleDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
      dispatch(toggleAmount({ _id, value: amount - 1 }));
    }
  }


  const handleIncrease = () => {
    if (amount < 15) {
      setAmount(amount + 1);
      dispatch(toggleAmount({ _id, value: amount + 1 }));
    }
    // console.log(dispatch(toggleAmount({ _id, value: amount + 1 })))
  }

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(_id))
  }

  return (
    <Wrapper key={_id}>
      <div className="title">
        {
          <img src={imageUrl} alt={name} />
        }
      </div>
      <div>
        <Link to={`/products/${_id}`}>
          <h5 className='name'>{name}</h5>
        </Link>
      </div>
      <div className="amount-btns">
        <button type="button" className="amount-btn" onClick={handleDecrease}>
          <FaMinus />
        </button>
        <h2 className='amount'>{qty}</h2>
        <button type="button" className="amount-btn" onClick={handleIncrease}>
          <FaPlus />
        </button>
      </div>
      <div className='quantity'>
        {formatPrice(price * qty)}
      </div>
      <button
        type='button'
        className='remove-btn'
        onClick={removeFromCartHandler}
      >
        <FaTrash />
      </button>
    </Wrapper>
  )
}
const Wrapper = styled.article`

display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  .title {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  .amount-btns {
    width: 75px;
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: repeat(3,1fr);
    align-items: center;
    button {
      background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  .name {
      font-size: 0.85rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }

    @media (max-width: 776px) {
      display: flex;
  flex-direction: column;
  .title{
    display: flex;
    margin: 0 auto;
  }
  img{
    max-width: 200px;
  }
    }
  @media (min-width: 776px) {
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }

    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;

      }
      h2 {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }
    }
  }
`