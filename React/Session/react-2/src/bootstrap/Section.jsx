import { Container } from "react-bootstrap";
import MyCard from "./Cards";
import {Row, Col} from "react-bootstrap"

const Section=()=>{
    const data=[
        {
            id:1,
            title:"Card 1",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, sequi! Eligendi blanditiis rem iusto tempore, obcaecati nisi minima nostrum repudiandae molestiae explicabo et quisquam perferendis quod, non tempora, asperiores repellendus!"
        }
        
    ]

    return (
        <>
        <Container>
            <Row xs={1} md={2} lg={3} className="g-3">
                {data.map((a)=>(
                    <MyCard title={a.title} description={a.description}/>
                ))}

            </Row>
        </Container>
        </>
    )
}