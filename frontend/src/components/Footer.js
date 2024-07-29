import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


export default function Footer() {
  return (
    <Container>
      <Typography variant="h5">
        &copy; {new Date().getFullYear()}
        <span> Ecommerce MERN  APP </span>
        Code   <Link className='author' target='_blank' to={`https://github.com/heneros`}>Rustam</Link>
      </Typography>
      <h5>All rights reserved</h5>
    </Container>
  )
}

const Container = styled.footer`
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
    font-size: 19px;
  }
  .author{
    color: var(--clr-primary-5);
    font-weight: 500;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;