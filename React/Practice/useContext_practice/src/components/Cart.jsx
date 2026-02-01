import React from 'react'
import { useContext } from 'react'
import { CartCounter } from '../App'
const Cart = () => {
    const {cartItems}=useContext(CartCounter)
  return (
    <div>
      <h1>Total cart Count : {cartItems}</h1>
    </div>
  )
}

export default Cart
