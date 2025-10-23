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
         <footer id="footer" className="footer position-relative dark-background text-light pt-5" style={{background: "#0b0c10",color: "#ddd"}}>
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 footer-about">
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
            <div className="social-links d-flex mt-4 gap-3">
              <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Dynamic Link Sections */}
          {sections.map((section, index) => (
            <div key={index} className="col-lg-2 col-md-3 footer-links">
              <h4>{section.title}</h4>
              <ul className="list-unstyled">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-decoration-none text-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container text-center mt-4 border-top border-secondary pt-3">
        <p>
          © <span>Copyright</span>{" "}
          <strong className="px-1 sitename">Clarity</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div className="credits">
          Designed by{" "}
          <a href="https://bootstrapmade.com/" className="text-decoration-none text-light fw-semibold">
            BootstrapMade
          </a>
        </div>
      </div>
    </footer>
        </>
    )

}
export default Footer;