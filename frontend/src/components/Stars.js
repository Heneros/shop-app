import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import styled from 'styled-components';

export default function Stars({ stars }) {
    const tempStars = Array.from({ length: 5 }, (_, index) => {
        const number = index + 0.5;
        return (
            <span key={index}>
                {stars > number ? (
                    <BsStarFill />
                ) : stars > index ? (
                    <BsStarHalf />
                ) : (
                    <BsStar />
                )}
            </span>
        )
    })
    return (
        <Wrapper>
            <div className='stars'>{tempStars}</div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }

`