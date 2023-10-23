import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Link, useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

import { formatPrice } from '../utils//helpers';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../redux/slices/productApiSlice';
import { addToCart } from '../redux/slices/cartSlice';
export default function Product({ _id, name, imageUrl, price, rating, company }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { data, error } = useGetProductDetailsQuery(_id);
  const product = data?.product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  }

  return (
    <Wrapper>
      <div className="container">

        <Link to={`/products/${_id}`}>
          <img src={imageUrl} alt={name} />
          {/* <FaSearch /> */}
        </Link>
      </div>
      <footer>
        <h5 className='name-product'>
          <Link to={`/products/${_id}`}>
            {name}
          </Link>
        </h5>
        <p> {formatPrice(price)} </p>
      </footer >
      <button
        className='btn'
        onClick={addToCartHandler}
      >Add To Cart
      </button>
    </Wrapper >
  )
}

const Wrapper = styled.article`
 .container{
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
 }
 img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  footer {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;

  } 
   footer h5 a,
  footer p a {
color : hsl(209, 61%, 16%);
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`;
