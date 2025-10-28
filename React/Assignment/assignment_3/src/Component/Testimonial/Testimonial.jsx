import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "./Testimonial.css"; 
import imgSRC1 from "../../assets/person-1.webp";
import imgSRC2 from "../../assets/person-2.webp";
import imgSRC3 from "../../assets/person-3.webp";
import imgSRC4 from "../../assets/person-4.webp";
import imgSRC5 from "../../assets/person-5.webp";



const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const testimonials = [
    {
      img: `${imgSRC1}`,
      name: "Christopher Lee",
      role: "VP Engineering",
      stars: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.",
      company: "DevStream",
    },
    {
      img:`${imgSRC2}`,
      name: "Amanda Rodriguez",
      role: "UX Researcher",
      stars: 4,
      text: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse.",
      company: "UserFirst",
    },
    {
      img: `${imgSRC3}`,
      name: "Alexander Chen",
      role: "Frontend Engineer",
      stars: 5,
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      company: "InnovateLab",
    },
    {
      img: `${imgSRC4}`,
      name: "Jennifer Martinez",
      role: "Product Designer",
      stars: 3,
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit.",
      company: "TechCorp",
    },
    {
      img: `${imgSRC5}`,
      name: "Rachel Taylor",
      role: "Marketing Lead",
      stars: 3,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
      company: "GrowthCo",
    },
  ];

  return (
    <section id="testimonials" className="testimonials section" style={{padding:"100px 0px"}}>
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={40}
          slidesPerView={2}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            992: { slidesPerView: 2 },
          }}
          className="leadership-slider"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card" data-aos="zoom-in" data-aos-delay={100 + i * 50}>
                <div className="testimonial-header">
                  <div className="user-avatar">
                    <img src={t.img} alt={t.name} />
                  </div>
                  <div className="user-info">
                    <h3>{t.name}</h3>
                    <span className="user-role">{t.role}</span>
                    <div className="rating">
                      {[...Array(5)].map((_, j) => (
                        <i
                          key={j}
                          className={`bi ${j < t.stars ? "bi-star-fill" : "bi-star"}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="testimonial-content">
                  <div className="quote-mark">
                    <i className="bi bi-quote"></i>
                  </div>
                  <p>{t.text}</p>
                </div>

                <div className="testimonial-footer">
                  <div className="company-badge">
                    <i className="bi bi-building"></i>
                    <span>{t.company}</span>
                  </div>
                  <div className="verified-badge">
                    <i className="bi bi-patch-check-fill"></i>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Testimonials;
