import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { links } from '../utils/constants';

export default function Header() {
    return (
        <NavContainer>
            <div className='nav-center'>
                <div className='nav-header'>
                    <Link to="/">
                        Logo
                    </Link>
                </div>
                <ul className='nav-links'>
                    {/*  тернарный оператор для проверки существования массива  */}
                    {links && links.length > 0 ? (links.map((link) => {
                        const { id, text, url } = link;  // деструктризация из параметра.
                        return (
                            <li key={id}>
                                <Link to={url}>{text}</Link>
                            </li>
                        )
                    })) : (
                        <>Doesnt exists</>
                    )
                    }
                </ul>
            </div>
        </NavContainer>
    )
}


const NavContainer = styled.nav`
height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
    }
                `;