import { useContext } from 'react'
// import { CounterContext } from '../App'
import { CartCounter } from '../App'
const Display = () => {
    //  const {count}=useContext(CounterContext)
     const {cartItems}=useContext(CartCounter)
  return (
    <div>
      <h1>I am displaying count: {cartItems}</h1>
    </div>
  )
}

export default Display
