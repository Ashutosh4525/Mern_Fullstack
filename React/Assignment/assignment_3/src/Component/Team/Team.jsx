import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Team.css";

import person1 from "../../assets/person-f-3.webp";
import person2 from "../../assets/person-m-4.webp";
import person3 from "../../assets/person-5.webp";
import person4 from "../../assets/person-m-6.webp";

function Team() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const teamMembers = [
    { img: person1, name: "Sarah Chen", role: "Creative Director", social: ["linkedin", "twitter"] },
    { img: person2, name: "Marcus Johnson", role: "Tech Lead", social: ["linkedin", "github"] },
    { img: person3, name: "Emma Rodriguez", role: "Product Manager", social: ["instagram", "dribbble"] },
    { img: person4, name: "David Kim", role: "UX Architect", social: ["linkedin", "behance"] },
  ];

  const leaders = [
    {
      img: person2,
      name: "Robert Martinez",
      position: "Chief Technology Officer",
      desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
      social: ["envelope", "github"],
    },
    {
      img: person3,
      name: "Lisa Thompson",
      position: "Head of Operations",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      social: ["envelope", "twitter"],
    },
    {
      img: person4,
      name: "Alex Garcia",
      position: "VP of Marketing",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      social: ["envelope", "instagram"],
    },
    {
      img: person1,
      name: "Jennifer Walsh",
      position: "Chief Executive Officer",
      desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id.",
      social: ["envelope", "linkedin"],
    },
  ];

  return (
    <section id="team" className="team section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>Team</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        {/* --- Team Intro + Members --- */}
        <Row data-aos="fade-up" data-aos-delay="100" className="g-4">
          <Col lg={6} data-aos="fade-right" data-aos-delay="150">
            <div className="team-intro">
              <div className="intro-content">
                <h3>Meet Our Exceptional Team</h3>
                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae sint
                  et molestiae non recusandae.
                </p>
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Team Members</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Departments</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">15+</span>
                    <span className="stat-label">Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div
                  className="member-blob"
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={250 + index * 100}
                >
                  <div className="blob-inner">
                    <img src={member.img} alt={member.name} />
                    <div className="member-overlay">
                      <h5>{member.name}</h5>
                      <span>{member.role}</span>
                      <div className="social-icons">
                        {member.social.map((icon, i) => (
                          <a href="#" key={i}>
                            <i className={`bi bi-${icon}`}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* --- Leadership Carousel --- */}
        <Row className="mt-5" data-aos="fade-up" data-aos-delay="200">
          <Col>
            <div className="team-carousel-wrapper">
              <h4 className="carousel-title">Leadership Team</h4>
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500 }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
              >
                {leaders.map((leader, index) => (
                  <SwiperSlide key={index}>
                    <div className="leader-card">
                      <div className="leader-image">
                        <img src={leader.img} alt={leader.name} />
                      </div>
                      <div className="leader-info">
                        <h5>{leader.name}</h5>
                        <span className="position">{leader.position}</span>
                        <p>{leader.desc}</p>
                        <div className="leader-contact">
                          {leader.social.map((icon, i) => (
                            <a href="#" className="contact-btn" key={i}>
                              <i className={`bi bi-${icon}`}></i>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>

        {/* --- CTA --- */}
        <Row className="mt-5">
          <Col lg={{ span: 8, offset: 2 }}>
            <div className="join-team-cta" data-aos="fade-up" data-aos-delay="300">
              <div className="cta-icon">
                <i className="bi bi-rocket-takeoff"></i>
              </div>
              <div className="cta-content">
                <h4>Ready to Join Our Mission?</h4>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores.
                </p>
                <div className="cta-actions">
                  <Button className="btn-primary">View Open Roles</Button>
                  <Button className="btn-outline">Learn Our Culture</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Team;
