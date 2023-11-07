import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import styled from 'styled-components';
import { Box, Button, Grid, TextField } from '@mui/material';
import { saveShippingAddress } from '../redux/slices/cartSlice';

export default function Shipping() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;


    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        // console.log(123)
    }

    return (<>
        <main>
            <PageHero title='Shipping Address' />
            <Wrapper className='section section-center'>
                <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Address"
                                type="text"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="City"
                                type="text"
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Postal Code"
                                type="text"
                                fullWidth
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Country"
                                type="text"
                                fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <button
                                type='submit'
                                className='link-btn clear-btn'
                                size='large' fullWidth variant="outlined">
                                Send
                            </button>
                        </Grid>
                    </Grid>
                </Box>
            </Wrapper>
        </main>
    </>
    )
}


const Wrapper = styled.main`
    display: block;
    .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  
`