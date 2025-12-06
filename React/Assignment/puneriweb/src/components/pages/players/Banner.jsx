
export default function Banner({
  text = "KABADDI TEAM",
  Image = "https://www.puneripaltan.com/dist/img/players/players_page_banner_desktop_S12.png"
}) {
  const bannerBgTitleUrl = "https://www.puneripaltan.com/dist/img/banner-title.png";

  return (
    <section className='banner w-full h-full bg-black text-white relative overflow-hidden'>
      <div className="flex flex-col md:flex-row items-center justify-center bannerin w-full h-full p-6 md:p-12 max-w-7xl mx-auto relative z-10"> 
        <div 
          className="w-full md:w-1/3 p-0 title order-1 flex justify-center md:justify-start pt-8 md:pt-0" data-aos="fade-right"
        >
          <div className="inner-sec text-center md:text-left max-w-sm md:max-w-none">
            <div className="relative inline-block" > 
                <img 
                src={bannerBgTitleUrl} 
                className="w-48 sm:w-56 md:w-full max-w-xs mx-auto md:mx-0" 
                alt="Banner Title Background"
                />
                <h1 
                className="absolute inset-0 flex items-center justify-center 
                           text-xl sm:text-2xl md:text-5xl font-extrabold text-[#f40]
                           leading-none uppercase p-2"
                >
                {text}
                </h1>
            </div>
            
          </div>
        </div>

 
        <div 
          className="w-full md:w-1/2 p-0 banner-players order-2 flex justify-center md:justify-end h-1/30 md:h-1/2" data-aos="fade-left"
        >
          <div className="outer-sec w-full max-w-md md:max-w-2xl h-full relative">
            <div className="inner-sec">
              <img 
                src={Image}
                className="w-full max-w-full h-auto max-h-96 md:max-h-full object-contain" 
                alt="Puneri Paltan Players Banner"
                 data-aos="zoom-in"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20 pointer-events-none"></div> */}

    </section>
  );
}
