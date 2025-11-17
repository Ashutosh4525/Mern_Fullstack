import img1 from "../../assets/banner-title.png";

export default function Hero(){
    return(
        <>
        <div className="hero">  
            <div className="col-md-12 col-xs-12 col-sm-12 no-padd">
                <img src={img1} alt="banner title" className="hero-img"/>
                <h1>fixtures &amp; schedule</h1>
            </div>

        </div>
        </>
    )
}