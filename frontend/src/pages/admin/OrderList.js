import React from 'react'
import { useGetOrdersQuery } from '../../redux/slices/orderApiSlice'

export default function OrderList() {
  const { data: orders, isLoading, error } = useGetOrdersQuery()
  console.log(orders);

  return (
    <div>OrderList</div>
  )
}
