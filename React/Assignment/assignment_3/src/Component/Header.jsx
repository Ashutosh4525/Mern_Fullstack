import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../globalcss/global.css';
import { Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";
import {  NavLink } from 'react-router-dom';

function Header() {
useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const navItem = [
       { name: 'Home', path: '/home' },
       { name: 'About', path: '/about' },
       { name: 'Services', path: '/services' },
       { name: 'Portfolio', path: '/portfolio' },
       { name: 'Why-us', path: '/why-us' },
       { name: 'Team', path: '/team' },
     ];
  
  
  return (
    <Navbar expand="lg"  bg="dark" variant='dark' fixed="top" className=" m-2 "  style={{borderRadius:"30px"}}>
      <Container>
        <Navbar.Brand href="#home">Clarity</Navbar.Brand>
         <div className=' d-flex align-items-end order-lg-2 '>
          <Button className='ms-auto px-2 mx-2 rounded-pill' style={{backgroundColor:"#524dd3" , color:"white"}} href="#getStarted">Get Started</Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
       
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {navItem.map((a,i)=>(
              <NavLink  to ={a.path} key={i} className={({isActive})=>isActive? `navitems active`:`navitems`}>{a.name} </NavLink>
              
            ))}
            
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>        */}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink to href="/contact" className={({isActive})=>isActive? `navitems`:`navitems`}>Contact</NavLink>
          </Nav>
        </Navbar.Collapse>
         
      </Container>
      
    </Navbar>
  );
}

export default Header;

