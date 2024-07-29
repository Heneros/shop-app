import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'


export default function PageHero({ title, product }) {
  // const isHome = title === "";
  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === '/';

  // console.log(pathname)
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>
          <Link to="/">Ecommerce React</Link>
          {!isHome && ' / '}
          {title && <span> {title} </span>}
          {product && <span> {product} </span>}
        </h3>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`