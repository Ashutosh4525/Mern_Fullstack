
import { Route,Routes } from 'react-router-dom';
import Header from './Component/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './Component/Hero';
import About from './Component/About';
import Services from './Component/Services';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Portfolio from './Component/Portfolio';
import Footer from './Component/Footer';
import Contact from './Component/Contact/Contact';
import Team from './Component/Team/Team';
import Testimonials from './Component/Testimonial/Testimonial';
import PageNotFound from './Component/PageNotFound';




function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route index element={<Hero/>}/>
      <Route path='/home' element={<Hero/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/portfolio' element={<Portfolio/>}/>
      <Route path='/testimonials' element={<Testimonials/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
        {/* <Head/> */}
        {/* <Hero/>
        <About/>
        <Services/>
        <Portfolio/>
        <Testimonials/>
        <Team/>
        <Contact/>
        <Footer/> */}
    </>
  )
}

export default App
