
import { Link } from "react-router-dom"

const Button=({children="Click Here",to="/"})=>{
    return(
        <>
        <Link to={to}><button style={{backgroundColor:"#524dd3" , color:"white",borderRadius:"20px",padding:"5px 10px",border:"none"}}>{children}</button></Link>
        </>
    )
}
export default Button;