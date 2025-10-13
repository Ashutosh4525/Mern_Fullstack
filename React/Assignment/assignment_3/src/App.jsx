import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Head from './Component/Header'
// import {Container} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './Component/Hero';
import About from './Component/About';


function App() {
  

  return (
    <>
        <Head/>
        <Hero/>
        <About/>
    </>
  )
}

export default App
