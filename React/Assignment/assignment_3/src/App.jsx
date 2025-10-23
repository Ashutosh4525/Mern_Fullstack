import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Head from './Component/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './Component/Hero';
import About from './Component/About';
import Services from './Component/Services';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Portfolio from './Component/Portfolio';
import Footer from './Component/Footer';


function App() {
  

  return (
    <>
        <Head/>
        <Hero/>
        <About/>
        <Services/>
        <Portfolio/>
        <Footer/>
    </>
  )
}

export default App
