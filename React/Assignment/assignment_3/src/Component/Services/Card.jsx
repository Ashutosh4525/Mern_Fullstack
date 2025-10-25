import { Container, Button,Card, CardLink } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight,FaExclamation } from "react-icons/fa6";


const Cards=({icon,title,description,display})=>{
    return (
        <>
   <Container>
        <Card className="d-flex align-items-center text-center py-6" style={{ backgroundColor:"#131428", color:"white", boxShadow:"0 10px 30px rgba(0, 0, 0, 0.05)", borderRadius:"20px"}}>
            <div style={{backgroundColor:"#524dd3", borderRadius:"10px", marginTop:"20px", padding:"15px"}}>
            {icon ? icon:<FaExclamation/>}
            </div>
        
        <Card.Body>
            <Card.Title>{title ? title:"Card Title"}</Card.Title>
            <Card.Text>{description ? description : "Some quick example text to build on the card title and make up the bulk of the card's content."}</Card.Text>
            <CardLink style={{color:"#524dd3"}}>Learn More <FaArrowRight /></CardLink>
        </Card.Body>
        </Card>
        </Container>
        </>
    )
}

export default Cards;