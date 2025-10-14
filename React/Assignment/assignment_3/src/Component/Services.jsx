import { Container, Row, Col, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Services(){
    return (
        <>

        <Container className="m-2 ">
            <Row className="text-center">
                <Col>
                <h1>Services</h1>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur vel</p>
                </Col>
            </Row>

        </Container>
        <Container>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
        </Container>
        </>
    )
}

export default Services;