
export default function PaltanWorld() {

  return (
    <section id="fixture" className="w-full relative overflow-hidden">
      <div id="puneri-world" className="relative w-full flex justify-center">
        <div className="w-full relative">

         
          <img
            src="https://www.puneripaltan.com/dist/img/paltan-world-homepage_s12.png"
            alt="Puneri Paltan Kabaddi"
            className="hidden md:block w-full object-cover"
            data-aos="fade-down"
          />

          
          <img
            src="https://www.puneripaltan.com/dist/img/paltan-world-banner-mobile_s12.png"
            alt="Paltan World Mobile Banner"
            className="block md:hidden w-full object-cover"
            data-aos="fade-down"
          />

          
          <img
            src="https://www.puneripaltan.com/dist/img/puneri-world-right-dust.png"
            className="hidden md:block absolute top-0 right-0 w-1/3"
            alt="Dust Right"
            data-aos="zoom-in"
            data-aos-delay="300"
          />

          
          <img
            src="https://www.puneripaltan.com/dist/img/puneri-world-middle-dust.png"
            className="hidden md:block absolute top-1/3 left-1/2 w-1/4 -translate-x-1/2"
            alt="Dust Middle"
            data-aos="zoom-in"
            data-aos-delay="400"
          />

         
          <img
            src="https://www.puneripaltan.com/dist/img/puneri-world-left-dust.png"
            className="hidden md:block absolute top-0 left-0 w-1/3"
            alt="Dust Left"
            data-aos="zoom-in"
            data-aos-delay="500"
          />

         
          <div className="absolute inset-0 flex flex-col items-center justify-center text-end transform-none lg:translate-x-60 lg:translate-y-10">
            <h2
              className="text-5xl md:text-8xl font-extrabold text-orange-600 drop-shadow-lg"
              data-aos="fade-down"
            >
              PALTAN
            </h2>

            <h2
              className="text-5xl md:text-8xl font-extrabold text-white drop-shadow-lg -mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              WORLD
            </h2>

            <a href="https://www.puneripaltan.com/puneri-world">
              <button
              style={{padding:"10px 25px", transform:'skew(-20deg)'}}
                className="mt-6 px-8 py-3 text-lg font-semibold bg-orange-600 text-white shadow-md
                hover:bg-orange-700 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                Enter
              </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
