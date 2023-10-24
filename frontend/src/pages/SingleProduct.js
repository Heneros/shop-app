import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components';

import { formatPrice } from '../utils/helpers';
import { useGetProductDetailsQuery } from '../redux/slices/productApiSlice';
import { addToCart } from '../redux/slices/cartSlice';

import { fetchProducts } from '../redux/slices/products';
import axios from '../axios';
import PageHero from '../components/PageHero';
import Stars from '../components/Stars';


export default function SingleProduct() {
  const { id: productId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);



  const { data: product } = useGetProductDetailsQuery(productId);
  const { name, imageUrl, rating, price, company, shipping } = product?.product || [];
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  }

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <div>
            <img src={imageUrl} alt="main image" className='main' />
          </div>
          <div className="content">
            <h2>{name}</h2>
            <Stars stars={rating} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='info'>
              <span>Brand :</span>
              {company}
            </p>
            <p className='info'>
              <span>Free shipping :</span>
              {shipping ? 'Yes' : 'No'}
            </p>
            <button
              className='btn'
              onClick={addToCartHandler}
            >Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Wrapper>

  );
}

const Wrapper = styled.main`
 .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`