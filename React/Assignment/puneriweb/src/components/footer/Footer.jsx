

export default function Footer(){
    return(
        <>
        <div className="bg-black text-white flex justify-between items-center flex-wrap">
        <div className="col-md-4 col-xs-12 col-sm-12 foot-left">
            <h6>Copyright © 2025 Puneri Paltan</h6>
        </div>
        <div className="col-md-4 col-xs-12 col-sm-12 social-div">
				<a href="https://www.facebook.com/puneripaltan/" target="_blank"><i className="fab fa-facebook-f"></i></a>
				<a href="https://twitter.com/PuneriPaltan?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><i className="fab fa-twitter"></i></a>
				<a href="https://instagram.com/puneripaltanofficial?utm_source=ig_profile_share&amp;igshid=m2wsuxrbs1f8" target="_blank"><i className="fab fa-instagram"></i></a>
				<a href="https://www.youtube.com/c/PuneriPaltan" target="_blank"><i className="fab fa-youtube"></i></a>
		</div>
        <div className="foot-right ting-unit-wrap">
						<div className="made-by-text">
							<p>Managed</p>
							<p>By</p>
						</div>
						<img src="https://www.puneripaltan.com/dist/img/dl_logo.png" className="img-responsive" style={{width:"120px !important"}}/>
						
		</div>
        </div>
        </>
    )
}