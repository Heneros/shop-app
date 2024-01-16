import React from 'react'
import { useSelector } from 'react-redux'

export default function VerifiedRoute() {
  
    const { userInfo } = useSelector((state) => state.auth);

//  return userInfo.
}
