import React from "react";

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
  ];

  return (
    <>
    <div className="w-full flex justify-center text-center align-middle" data-aos="fade-up">
        <h2 className="text-[#f40] text-9xl font-extrabold fade-up">Partners</h2>
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
    </div>
    </>
  );
}
