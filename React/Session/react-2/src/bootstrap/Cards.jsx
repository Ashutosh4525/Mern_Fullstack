import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imgSrc from '../assets/travel.jpg'

function MyCard({title, description}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{title ? title:"Card Title"}</Card.Title>
        <Card.Text>
         {description ? description : "Some quick example text to build on the card title and make up the bulk of the card's content."}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;