import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../globalcss/global.css';

function Head() {

  const navItem = [
       { name: 'Home', path: '#home' },
       { name: 'About', path: '#about' },
       { name: 'Portfolio', path: '#portfolio' },
       { name: 'Team', path: '#team' },
     ];
  
  
  return (
    <Navbar expand="lg"  bg="dark" variant='dark' fixed="top" className=" m-2 "  style={{borderRadius:"30px"}}>
      <Container>
        <Navbar.Brand href="#home">Clarity</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {navItem.map((a,i)=>(
              <li className='navitems'><Nav.Link  href={a.path} key={i} >{a.name}</Nav.Link></li>
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
            <li className='navitems'><Nav.Link href="#contact">Contact</Nav.Link></li>
          </Nav>
        </Navbar.Collapse>
        <Nav className='ms-auto px-2 mx-2 rounded-pill text-white' fixed="top" style={{backgroundColor:"#524dd3" , color:"white"}}>
        <Nav.Link href="#getStarted">Get Started</Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default Head;

