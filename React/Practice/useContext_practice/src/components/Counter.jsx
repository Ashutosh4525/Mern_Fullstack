import { useContext } from 'react'
// import { CounterContext } from '../App'
import { CartCounter } from '../App'

const Counter = () => {
    // const {count,setCount}=useContext(CounterContext)
    const {cartItems,setCartItems}=useContext(CartCounter)
  return (
    <div>
      <h1>Counter is: {cartItems}</h1>
      <button onClick={()=>setCartItems(count=>count+1)}>Increment</button>
      <button onClick={()=>setCartItems(count=>count-1)}>Decrement</button>
    </div>
  )
}

export default Counter
