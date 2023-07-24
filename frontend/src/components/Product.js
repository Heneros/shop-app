import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

import { formatPrice } from '../utils//helpers';
export default function Product({ _id, name, imageUrl, price, rating, company }) {
  return (
    <Wrapper>
      <div className="container">
        <img src={imageUrl} alt={name} />
        <Link to={`/products/${_id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5><Link to={`/products/${_id}`}>
          {name}
        </Link> </h5>
        <p> {formatPrice(price)} </p>
      </footer>
    </Wrapper>
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
`;
