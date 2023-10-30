import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa'


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
  const { name, imageUrl, rating, price, company, shipping, categories } = product?.product || [];

  console.log(categories);
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
            {categories ? (
              categories.map((item) => (
                <>
                  <p className='info'>
                    <span>Cateories :</span>
                    {item}
                  </p>
                </>
              ))
            ) : <>No categories added</>}
            <p className='info'>
              <span>Free shipping :</span>
              {shipping ? 'Yes' : 'No'}
            </p>
            <div className="amount-btns">
              <button type='button' className='amount-btn'>
                <FaMinus />
              </button>
              <h2 className='amount'>1233</h2>
              <button type='button' className='amount-btn'>
                <FaPlus />
              </button>
            </div>
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

  /* /Amount/ */
  .amount-btns {
    width: 75px;
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: repeat(3,1fr);
    align-items: center;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
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
  @media (min-width: 776px) {
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`