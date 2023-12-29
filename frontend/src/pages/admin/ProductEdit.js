import React from 'react'
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/slices/productApiSlice'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify';

export default function ProductEdit() {
  const { id: productId } = useParams();
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        imageUrl,
        shipping,
        category,
        qty
      }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <div>ProductEdit</div>
  )
}
