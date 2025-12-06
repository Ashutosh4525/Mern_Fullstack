export default function Partners() {
  const partnersData = [
    {
      href: "https://www.forcemotors.com/",
      imgSrc: "https://www.puneripaltan.com/dist/img/force_motors.png",
      alt: "Force Motors",
      label: "Principal Partner",
    },
    {
      href: "https://www.stihl.com/default.aspx",
      imgSrc: "https://www.puneripaltan.com/dist/img/stihl-logo.png",
      alt: "Stihl Logo",
      label: "Associate-Partner",
    },
    {
      href: "https://navitassolar.in/",
      imgSrc: "https://www.puneripaltan.com/dist/img/navitas_sponsor.webp",
      alt: "Navitas Solar",
      label: "Associate-Partner",
    },
    {
      href: "https://parasbuildtech.com/",
      imgSrc: "https://www.puneripaltan.com/dist/img/paras.webp",
      alt: "Paras Buildtech",
      label: "Co-Partner",
    },
    {
      href: "https://betteralt.in/",
      imgSrc: "https://www.puneripaltan.com/dist/img/better.webp",
      alt: "Bellteralt Logo",
      label: "Wellness Partner",
    },
    {
      href: "https://shivnaresh.in/",
      imgSrc: "https://www.puneripaltan.com/dist/img/shivnaresh-logo.webp",
      alt: "Shivnaresh Logo",
      label: "Kit Partner",
    },
  ];

  return (
    <>
    <div className="relative" style={{paddingBottom:"30px"}}>
     <div className="flex justify-center items-center ">
        <div
          className="absolute -top-30 md:-top-25 md:flex md:flex-column md:m-20 bg-orange-500 p-3 md:p-10 gap-15 md:px-20 clip-mobile md:clip-desktop"
          style={{
            padding:"15px 20px",
             clipPath: "polygon( 2% 0, 100% 0, 98% 100%, 0% 100%)" 
          }}
        >
          <h2 className="text-xl md:py-2 text-center md:text-left text-white font-bold mb-3 md:mb-0"
           style={{padding:"10px"}}>
            SUBSCRIBE TO OUR NEWSLETTER
          </h2>
          <input
            type="email"
            className="bg-white p-3 ml-2 w-50 md:w-90 clip-email-mobile md:clip-desktop"
            placeholder="Enter your email-id"
          style={{ clipPath: "polygon( 2% 0, 100% 0, 98% 100%, 0% 100%)" , padding:"10px"}}
          />
          <button
            className="text-white px-5 py-3 md:py-0 md:px-8"
          style={{ clipPath: "polygon( 15% 0, 100% 0, 85% 100%, 0% 100%)",
            padding:"10px",
            backgroundImage:"linear-gradient(to right, #df3100 0, #ff7500 75%, white 100%, #ff7500 75%, #df3100 100%)"
           }}
          >
            Go
          </button>
        </div>
      </div>
    </div>
    <div className="w-full flex justify-center text-center align-middle" data-aos="fade-up"
    style={{marginTop:"20px"}}>
        <h2 className="text-[#f40] text-6xl md:text-9xl font-extrabold fade-up">Partners</h2>
    </div>
    <div className="flex flex-col items-center py-12 bg-white">
      <a href={partnersData[0].href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center mb-8">
        <img src={partnersData[0].imgSrc} alt={partnersData[0].alt} className="h-16 md:h-30 object-contain mb-3" />
        <span className="text-lg tracking-wide">{partnersData[0].label}</span>
      </a>
      <div className="flex flex-row justify-center space-x-12 mb-8">
        {partnersData.slice(1, 3).map(({ href, imgSrc, alt, label }, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
            <img src={imgSrc} alt={alt} className="h-12 md:h-36 object-contain mb-2" />
            <span className="text-base">{label}</span>
          </a>
        ))}
      </div>
      <a href={partnersData[3].href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center mb-8">
        <img src={partnersData[3].imgSrc} alt={partnersData[3].alt} className="h-10 md:h-34 object-contain mb-2" />
        <span className="text-base">{partnersData[3].label}</span>
      </a>
      <a href={partnersData[4].href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <img src={partnersData[4].imgSrc} alt={partnersData[4].alt} className="h-8 md:h-30 object-contain mb-2" />
        <span className="text-lg font-bold">{partnersData[4].label}</span>
      </a>
      <a href={partnersData[5].href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <img src={partnersData[5].imgSrc} alt={partnersData[5].alt} className="h-8 md:h-30 object-contain mb-2" />
        <span className="text-lg font-bold">{partnersData[5].label}</span>
      </a>
    </div>
    </>
  );
}
