import './player.css'
export default function Banner({text}) {
  return (
    <>
    <section className='banner w-full'>
    <div className="flex flex-wrap items-center justify-center overflow-hidden py-8 md:py-16 bannerin w-full"> 
      <div 
        className="w-full md:w-1/3 md:ml-[16.666667%] p-0 title"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="outer-sec flex justify-center">
          <div className="inner-sec text-center md:text-left">
            <img 
              src="https://www.puneripaltan.com/dist/img/banner-title.png" 
              className="w-full max-w-sm mx-auto md:mx-0" 
              alt="Banner Title Background"
              data-aos="zoom-in"
              data-aos-delay="300"
            />
            
            <h1 
              className=" md:text-6xl font-extrabold text-gray-800 mt-4 pl"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              {text}
            </h1>
          </div>
        </div>
      </div>

      <div 
        className="w-full md:w-1/2 p-0 mt-8 md:mt-0 banner-players flex justify-center"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="outer-sec translate-x-3">
          <div className="inner-sec">
            <img 
              src="https://www.puneripaltan.com/dist/img/players/players_page_banner_desktop_S12.png" 
              className="w-full h-auto max-w-2xl" 
              alt="Puneri Paltan Players Banner"
              data-aos="zoom-in"
              data-aos-delay="800"
            />
          </div>
        </div>
      </div>
    </div>
    </section>
    </>
  )}