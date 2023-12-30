import React, { useEffect, useState } from 'react'
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/slices/productApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { Alert, Box, Button, Container, FormControl, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Message } from '@mui/icons-material';
import PageHero from '../../components/PageHero';

export default function ProductEdit() {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [shipping, setShipping] = useState(true);
  const [categories, setCategories] = useState([]);
  const [qty, setQty] = useState(0);

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const navigate = useNavigate();


  useEffect(() => {
    if (product) {
      setName(product?.product?.name);
      setPrice(product?.product?.price);
      setImageUrl(product?.product?.imageUrl);
      setShipping(product?.product?.shipping);
      setCategories(product?.product?.categories);
      setQty(product?.product?.qty);
    }
  }, [product?.product]);
  console.log(name);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        imageUrl,
        shipping,
        categories,
        qty
      }).unwrap();
      toast.success("Product updated");
      refetch();
      //  navigate('/admin/productlist');
    } catch (err) {
      console.log(err.error);
      toast.error(err?.data?.message || err.error);
    }
  }

  return isLoading ? (<Loader />) : error ? (<Message variant="danger" >{error?.data?.message} </Message>) : (
    <>
      <PageHero title="Product Edit" />
      <Container>
        <Link to="/admin/productlist"  >Go back</Link>
        <Box sx={{ mt: 3 }}>
          {loadingUpdate && <Loader />}
          <Typography variant="h4" component="h4">
            Edit Product
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel>Image</FormLabel>
                <TextField
                  type="file"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  value={categories}
                  placeholder='Enter category...'
                  onChange={(e) => setCategories(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  value={qty}
                  placeholder='Enter quantity...'
                  onChange={(e) => setQty(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" >Update</Button>
          </form>
        </Box>
      </Container>

    </>
  )
}
