import img1 from "../../../assets/homepage-mobile-banner-s12.webp";
import classes from './hero.module.css'
export default function Hero(){
    return(
        <>
        <div className="hero">  
            <div className="col-md-12 col-xs-12 col-sm-12 no-padd">
                <img src={img1} alt="banner title" className="hero-img"/>
            </div>
        </div>
        <section className={classes.description}>
            <div className={classes.scroll} >
                <h2>scroll</h2>
                <div className={classes.line}></div>     
            </div>
            <p className={classes.despara}>Puneri Paltan is currently one of the top performing teams in the Pro Kabaddi League. With a mix of unstoppable energy, honed-out skills and steely nerves, here's a force that consistently looks forward to perform better, challenge its opponents and make a difference.</p>
        </section>
        </>
    )
}