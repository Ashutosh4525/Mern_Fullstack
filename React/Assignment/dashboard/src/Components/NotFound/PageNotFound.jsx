import { Link } from "react-router-dom";

const PageNotFound=()=>{

    return(
        <>
        <section style={{padding:"100px 0px"}}>
        <h2>404</h2>
        <p>Page Not Found</p>
        <div className="text-center" >
        <Link to="/home"><button> Go to Home page</button></Link>
        </div>
        </section>
        </>
    )
}
export default PageNotFound;