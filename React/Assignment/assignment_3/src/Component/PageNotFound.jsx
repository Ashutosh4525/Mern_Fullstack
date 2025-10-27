import { Container } from "react-bootstrap";
import Button from "./Button/Button1";
import Heading from "./Heading/Heading"

const PageNotFound=()=>{

    return(
        <>
        <Heading title="404" description="Page Not Found"/>
        <Container>
        <Button to="/"> Go to Home page</Button>
        </Container>
        </>
    )
}
export default PageNotFound;