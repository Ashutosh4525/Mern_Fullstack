import { Container } from "react-bootstrap";
import MyCard from "./Cards";
import {Row, Col} from "react-bootstrap"

const Section=()=>{
    const data=[
       {
      id: 1,
      title: "Card1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam sed ipsa, suscipit itaque nisi omnis veritatis eum eos aliquam, accusantium rerum magnam libero ut incidunt laborum assumenda! Ad, qui facere?",
    },
    {
      id: 2,
      title: "Card 2",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus autem dignissimos! Delectus repellat quaerat mollitia quasi? Quis, natus ut accusamus ratione doloribus debitis velit? Ullam rerum est totam possimus.",
    },
    {
      id: 3,
      title: "Card 3 ",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta debitis ut saepe odit quis laudantium hic et reiciendis commodi assumenda, rem accusamus incidunt. Dicta eum consectetur itaque est blanditiis doloremque!",
    },
    {
      id: 4,
      title: "Card 4",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus autem dignissimos! Delectus repellat quaerat mollitia quasi? Quis, natus ut accusamus ratione doloribus debitis velit? Ullam rerum est totam possimus.",
    },
    {
      id: 5,
      title: "Card 5 ",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta debitis ut saepe odit quis laudantium hic et reiciendis commodi assumenda, rem accusamus incidunt. Dicta eum consectetur itaque est blanditiis doloremque!",
    },
        
    ]

    return (
        <>
        <Container>
            <Row xs={1} md={2} lg={3} className="g-3">
                {data.map((a)=>(
                    <Col key={a.id}>
                    <MyCard title={a.title} description={a.description}/>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    )
}
export default Section;