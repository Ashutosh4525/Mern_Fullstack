import './App.css'
import { ChaiCard } from './components/ChaiCard'
import { Counter } from './components/Counter'
import type { Chai } from './types'
import { ChaiList } from './components/ChaiList'
import { OrderForm } from './components/OrderForm'
import Card from './components/Card'


const menu:Chai[]=[
  {id:1, name:"Masala", price:25},
  {id:2, name:"Ginger", price:50},
  {id:3, name:"Lemon", price:60},
]
function App() {

  return (
    <>
      <div>
       <h1>Vite + React</h1>
       <ChaiCard
       name="Headphone"
       price={1000}/>
       <Counter></Counter>
      </div>
      <div>
        <ChaiList items={menu}/>
      </div>
      <div>
        <OrderForm 
        
        onSubmit={(order)=>{
          console.log("Placed ", order.name, order.cups);
          
        }}/>
      </div>
      <div>
        <Card 
        title='Chai aur Typscript'
        // footer="hello"
        footer={<button>Order Now</button>}  //this is how react node is given
        />
      </div>
    </>
  )
}

export default App
