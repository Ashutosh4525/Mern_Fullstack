
import { Link } from "react-router-dom"

const Button=({children="Click Here",to="/"})=>{
    return(
        <>
        <Link to={to}><button>{children}</button></Link>
        </>
    )
}
export default Button;