import { FaFacebookF,FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import classes from './footer.module.css'

export default function Footer(){
    return(
        <>
        <div className="bg-black text-white flex justify-between items-center flex-wrap px-3">
        <div className="col-md-4 col-xs-12 col-sm-12 foot-left">
            <h6>Copyright © 2025 Puneri Paltan</h6>
        </div>
        <div className={`flex flex-wrap gap-2 justify-center items-center ${classes.links}`} >
				<a className={classes.link_icons} href="https://www.facebook.com/puneripaltan/" target="_blank"><i><FaFacebookF/></i></a>
				<a className={classes.link_icons} href="https://twitter.com/PuneriPaltan?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i><FaTwitter /></i></a>
				<a className={classes.link_icons} href="https://instagram.com/puneripaltanofficial?utm_source=ig_profile_share&amp;igshid=m2wsuxrbs1f8" target="_blank"><i><FaInstagram /></i></a>
				<a className={classes.link_icons} href="https://www.youtube.com/c/PuneriPaltan" target="_blank"><i><FaYoutube /></i></a>
		</div>
        <div className="flex flex-wrap items-center foot-right">
						<div className={classes.footTxt}>
							<p className={classes.footTxt1}>Managed</p>
							<p className={classes.footTxt2}>By</p>
						</div>
						<img  src="https://www.puneripaltan.com/dist/img/dl_logo.png" className={classes.footImg}/>
						
		</div>
        </div>
        </>
    )
}