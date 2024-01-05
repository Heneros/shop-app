import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Grid, Container, Box, TableCell, Button, Typography, TableRow, TableBody, TableContainer, TableHead, Table, IconButton } from '@mui/material';


import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../redux/slices/productApiSlice';
import PageHero from '../../components/PageHero';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate.js';

import { Message } from '@mui/icons-material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function ProductList() {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

  const products = data && data.products ? data.products : [];
  console.log(data);


  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }


  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete product?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message}</Message>) : (
    <>
      <PageHero title="Product List" />
      <Container>
        <Grid md={12}>
          <Typography sx={{
            my: 5,
            fontSize: {
              xl: 30,
              lg: 30,
              md: 20,
              sm: 20,
              xs: 20,
            }, fontWeight: 600
          }} variant='h4'> Product</Typography>
        </Grid>
        <Grid md={12}>
          <Button variant='contained' onClick={createProductHandler}> Create Product</Button>
        </Grid>
        <Grid>
          <Grid md={12} >
            <TableContainer >
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    {/* <TableCell>Paid</TableCell>
                    <TableCell>Delivered</TableCell> */}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        {product._id}
                      </TableCell>
                      <TableCell>
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {product.price} $
                      </TableCell>
                      <TableCell>
                        {product.category}
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <IconButton size="small" color="primary">
                            <FaEdit />
                          </IconButton>
                        </Link>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          <FaTrash />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Paginate pages={data.pages} page={data.page}  isAdmin={true} />
            </TableContainer>
          </Grid>

        </Grid>


      </Container>
    </>
  )
}
