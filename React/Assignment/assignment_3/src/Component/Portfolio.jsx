import { Container, Row, Col, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";
import '../globalcss/global.css'


function Portfolio(){
 useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);

      return(
        <>
        <section id="portfolio" style={{backgroundColor: "#05071e",color:"white",paddingBottom:"100px"}}>
        <Container>
          <Container className=" text-center ">
              <h1>Portfolio</h1>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
           </Container>
           {/* <Container className=" text-center">
            <Col>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>All Project</Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>Web Design</Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>Mobile App</Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>Branding </Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>UI/UX</Button>
            </Col>
           </Container> */}
           <Container className="text-center mb-4" data-aos="fade-up" data-aos-delay="100">
          <ul className="list-inline portfolio-filters">
          <li className="list-inline-item filter-active">All Projects</li>
          <li className="list-inline-item">Web Design</li>
          <li className="list-inline-item">Mobile Apps</li>
          <li className="list-inline-item">Branding</li>
          <li className="list-inline-item">UI/UX</li>
          </ul>
          </Container>

          {/* <Container className="text-center mt-5" data-aos="fade-up" data-aos-delay="300">
        <h4>Ready to start your next project?</h4>
        <p>Let's work together to bring your digital vision to life</p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" className="rounded-pill px-4">
            Start a Project
          </Button>
          <Button variant="outline-primary" className="rounded-pill px-4">
            View All Work
          </Button>
        </div>
      </Container> */}

      <Container>
           <Card className="d-flex align-items-center text-center p-5 mt-5" data-aos="fade-up" data-aos-delay="300" style={{ backgroundColor:"#131428", color:"white", boxShadow:"0 10px 30px rgba(0, 0, 0, 0.05)",borderRadius:"20px"}}>
                <h2>Ready to Transform Your Digital Presence?</h2>
                <p>Let's discuss your project and create something amazing together</p>
           <div className="hero-buttons mb-4">
              <Button variant="primary" className="me-3 px-4 py-2 " style={{ backgroundColor: "#524dd3", border: "none" }} >
                Get Started
              </Button>
              <Button variant="outline-light" className="px-4 py-2 border-2" style={{borderColor:"#524dd3",color:"#524dd3"}}>
                Our Work
              </Button>
            </div>
            </Card>
      </Container>
          </Container>
         </section>
  </>
      )
}

export default Portfolio;