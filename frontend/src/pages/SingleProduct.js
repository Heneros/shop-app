import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components';

import { useGetProductDetailsQuery } from '../redux/slices/productApiSlice';
import { addToCart } from '../redux/slices/cartSlice';

import { fetchProducts } from '../redux/slices/products';
import axios from '../axios';
import PageHero from '../components/PageHero';
import Stars from '../components/Stars';


export default function SingleProduct() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { data: productData } = useGetProductDetailsQuery(id);

  console.log(productData);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);
  if (isLoading) {
    return <span>Loading...</span>;
  }

  const { name, imageUrl, rating } = data.product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...productData, qty }));
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
            <img src={imageUrl} alt="main image" />
          </div>
          <div className="content">
            <h2>{name}</h2>
            <Stars stars={rating} />
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

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`