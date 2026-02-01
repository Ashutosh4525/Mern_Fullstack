import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { useState, createContext } from 'react'

// export const CounterContext=createContext();
export const CartCounter=createContext();
function App() {
  // const [count, setCount]=useState(0);
  const [cartItems, setCartItems]=useState(0);

  return (
    <>
    {/* This is state liftining or prop Drilling */}
      {/* <Header count={count}/>
      <Body count={count} setCount={setCount}/>
      <Footer/> */}
      {/* <CounterContext value={{count,setCount}}> */}
      <CartCounter value={{cartItems,setCartItems}}>
        <Header/>
        <Body/>
        <Footer/>
        </CartCounter>
      {/* </CounterContext> */}
    </>
  )
}

export default App
