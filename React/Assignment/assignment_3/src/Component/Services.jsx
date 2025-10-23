import { Container, Row, Col, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoColorPalette } from "react-icons/io5";
import Cards from "./Services/Card";
import { BsLayoutTextWindowReverse,BsMegaphone } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { CiMobile2 } from "react-icons/ci";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";


function Services(){
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);
    const data=[
        {
        id:1,
        icon:<IoColorPalette size={40} />,
        title: "t1",
        description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
        },
        {
        id:2,    
        icon:<BsLayoutTextWindowReverse size={40} />,
        title:"t2",
        description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
        },
        {
        id:3,    
        icon:<FaCode size={40} />,
        title:"t3",
        description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
        },
         {
        id:4,    
        icon:<CiMobile2  size={40} />,
        title:"t4",
        description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
        },
         {
        id:5,    
        icon:<BsMegaphone  size={40} />,
        title:"t5",
        description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
        },
    ]
    return (
        <>
    <section id="services" style={{
        background: "#05071e",
        padding: "120px 0px",
        color: "white",
        Height: "100vh",
      }}>
       
        <Container >
             <Container className="m-2 text-center ">
               <h1>Services</h1>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur vel</p>
             </Container>
                
        
            <Row xs={1} md={2} lg={3} className="g-3 d-flex justify-center align-items-center" >
            {data.map((a)=>(
                <Col xs={12} key={a.id}>
                    <Cards icon={a.icon} title={a.title} description={a.description}/>         
                </Col>
            ))}
            </Row>

            <Card className="d-flex align-items-center text-center p-5 mt-5" style={{ backgroundColor:"#131428", color:"white", boxShadow:"0 10px 30px rgba(0, 0, 0, 0.05)",borderRadius:"20px"}}>
                <h2>Ready to Transform Your Digital Presence?</h2>
                <p>Let's discuss your project and create something amazing together</p>
            {/* <div style={{backgroundColor:"#524dd3", borderRadius:"10px", marginTop:"20px", padding:"15px"}}>
            </div> */}
            <Button  className="rounded-pill px-4" style={{backgroundColor:"#524dd3"}}>
               Get Started Today
            </Button>
            </Card>
        
        </Container>
        {/* <Container>
        <Card className="d-flex align-items-center text-center py-6" style={{ width: '18rem', backgroundColor:"#131428", color:"white", boxShadow:"0 10px 30px rgba(0, 0, 0, 0.05)"}}>
            <div style={{backgroundColor:"#524dd3", borderRadius:"10px", marginTop:"20px", padding:"15px"}}>
            <IoColorPalette size={40} />
            </div>
        
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
        </Container> */}

        </section>
        </>
    )
}

export default Services;