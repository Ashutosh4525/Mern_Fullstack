import { Container } from "react-bootstrap";
import Button from "./Button/Button1";
import Heading from "./Heading/Heading"
import "../globalcss/global.css"

const PageNotFound=()=>{

    return(
        <>
        <section style={{background:" #05071e",padding:"100px 0px",color:"white",}}>
        <Heading title="404" description="Page Not Found"/>
        <Container className="text-center" >
        <Button to="/" > Go to Home page</Button>
        </Container>
        </section>
        </>
    )
}
export default PageNotFound;