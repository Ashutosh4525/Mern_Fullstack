import { Container, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Card=({icon,title,description})=>{
    return (
        <>
   <Container>
        <Card className="d-flex align-items-center text-center py-6" style={{ width: '18rem', backgroundColor:"#131428", color:"white", boxShadow:"0 10px 30px rgba(0, 0, 0, 0.05)"}}>
            <div style={{backgroundColor:"#524dd3", borderRadius:"10px", marginTop:"20px", padding:"15px"}}>
            {icon}
            </div>
        
        <Card.Body>
            <Card.Title>{title ? title:"Card Title"}</Card.Title>
            <Card.Text>{description ? description : "Some quick example text to build on the card title and make up the bulk of the card's content."}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
        </Container>
        </>
    )
}

export default Card;