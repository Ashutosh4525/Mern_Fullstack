import { Container, Row, Col, Button,Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";
import '../globalcss/global.css'


function Footer(){

    const sections = [
    {
      title: "Useful Links",
      links: ["Home", "About us", "Services", "Terms of service", "Privacy policy"],
    },
    {
      title: "Our Services",
      links: ["Web Design", "Web Development", "Product Management", "Marketing", "Graphic Design"],
    },
    {
      title: "Resources",
      links: ["Blog", "Documentation", "API Reference", "Community", "Support"],
    },
    {
      title: "Company",
      links: ["Careers", "Partners", "Contact", "FAQs", "Feedback"],
    },
  ];
    return(
        <>
        <footer className="footer bg-dark text-light pt-5 pb-3 position-relative">
      <Container className="footer-top">
        <Row className="gy-4">
          
          <Col lg={4} md={6} className="footer-about">
            <a href="/" className="logo d-flex align-items-center text-decoration-none mb-3">
              <span className="fs-3 fw-bold text-white">Clarity</span>
            </a>

            <div className="footer-contact">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+1 5589 55488 55</span>
              </p>
              <p>
                <strong>Email:</strong> <span>info@example.com</span>
              </p>
            </div>

            <div className="social-links d-flex flex-wrap gap-3 mt-4">
              <a href="#"><i className="social-circle bi bi-twitter-x text-white"></i></a>
              <a href="#"><i className="social-circle bi bi-facebook text-white"></i></a>
              <a href="#"><i className="social-circle bi bi-instagram text-white"></i></a>
              <a href="#"><i className="social-circle bi bi-linkedin text-white"></i></a>
            </div>
          </Col>

         
          {sections.map((section, index) => (
            <Col key={index} lg={2} md={3} className="footer-links">
              <h4 className="text-white mb-3">{section.title}</h4>
              <ul className="list-unstyled">
                {section.links.map((link, i) => (
                  <li key={i} className="mb-2">
                    <a href="#" className="text-decoration-none text-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>

      
      <Container className="text-center border-top border-secondary pt-3 mt-4">
        <p className="mb-1">
          © <span>Copyright</span>{" "}
          <strong className="px-1">Clarity</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <p className="small mb-0">
          Designed by{" "}
          <a href="https://bootstrapmade.com/" className="text-decoration-none text-light fw-semibold">
            BootstrapMade
          </a>
        </p>
      </Container>
    </footer>
        </>
    )

}
export default Footer;