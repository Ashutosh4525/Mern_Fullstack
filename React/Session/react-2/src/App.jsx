// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import GlobalCss from './global/GlobalCss'
// import Scoped from './scope/Scoped'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
// import MyAccordion from './bootstrap/Accordion'
import MyAccordion from './bootstrap/Accordion';
import MyCard from './bootstrap/Cards';
import Section from './bootstrap/Section'



function App() {
  

  return (
    <>
     {/* <GlobalCss/>
     <Scoped/> */}
    
      {/* <MyAccordion/> */}
      <Container>
        {/* <MyAccordion/> */}
        <Section/>
      </Container>
      
      
      

    
    </>
  )
}

export default App
