import React from 'react'
import Counter from './Counter'
import { useState } from 'react'
import Product from './Product'

const Body = () => {

    const [items, setItems]=useState([
        {id:1,name:"Milk",price:10},
        {id:2,name:"Milk1",price:20},
        {id:3,name:"Milk2",price:30},
        {id:4,name:"Milk3",price:40},
        {id:5,name:"Milk4",price:50},
    ])
  return (
    <div>
      <h1>This is blinkIt body</h1>
      {/* <Counter /> */}
      <div style={{display:'flex', justifyContent:"center",flexWrap:"wrap",alignContent:"center", gap:"20px"}}>
        {
            items.map((i)=><Product key={i.id} item={i}></Product>)
        }
      </div>
    </div>
  )
}

export default Body
