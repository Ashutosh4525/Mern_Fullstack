import { Container, Row, Col, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoColorPalette } from "react-icons/io5";
import Card from "./Services/Card";


function Services(){
    // const data=[
    //     {
    //     id:1,
    //     icon:<IoColorPalette size={40} />,
    //     title:,
    //     description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
    //     },
    //     {
    //     id:2,    
    //     icon:<IoColorPalette size={40} />,
    //     title:,
    //     description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
    //     },
    //     {
    //     id:3,    
    //     icon:<IoColorPalette size={40} />,
    //     title:,
    //     description:"Donec vel sapien augue integer urna vel turpis cursus porta aliquam ligula eget ultricies."
    //     },
    // ]
    return (
        <>
    <section id="services" style={{
        background: "#05071e",
        padding: "120px 0px",
        color: "white",
        Height: "100vh",
      }}>
        <Container className="m-2 ">
            <Row className="text-center">
                <Col>
                <h1>Services</h1>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur vel</p>
                </Col>
            </Row>

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