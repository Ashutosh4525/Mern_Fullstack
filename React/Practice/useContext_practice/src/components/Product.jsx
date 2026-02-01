import React from 'react'
import { useState,useContext } from 'react';
import { CartCounter } from '../App';
const Product = ({item}) => {
    const [addToCart,setAddToCart]=useState(false);
    const {cartItems,setCartItems}=useContext(CartCounter)
  return (
    <div style={{width:'200px'}}>
      <h1>Name: {item.name}</h1>
      <h2>Price: {item.price}</h2>
      {
        addToCart ? <button onClick={()=>{setAddToCart(false),setCartItems(cartItems=>cartItems-1)}}>Remove</button>:<button onClick={()=>{setAddToCart(true),setCartItems(cartItems=>cartItems+1)}}>Add</button>
      }
    </div>
  )
}

export default Product;