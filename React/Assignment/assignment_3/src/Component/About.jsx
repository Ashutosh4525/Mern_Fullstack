
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img2 from '../assets/Img2.jpg';
import img3 from '../assets/Img3.jpg';




const AboutSection = () => {
  return (
    <section id="about" className="about-section text-white" style={{backgroundColor:"#05071e",paddingTop:"100px"}}>
      <Container >
        <Row className="align-items-lg-center gy-5 px-3">
          <Col lg={6} data-aos="fade-right" data-aos-delay="100">
            <div className="content">
              <h6 className="text-primary text-uppercase fw-semibold mb-2">
                Discover Our Story
              </h6>
              <h2 className="fw-bold mb-3">
                Innovative Solutions for a Digital-First World
              </h2>
              <p className="text-white mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-primary me-2 fs-5"></i>
                  <span>Excepteur sint occaecat cupidatat non proident.</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-primary me-2 fs-5"></i>
                  <span>Nemo enim ipsam voluptatem quia voluptas sit.</span>
                </li>
                <li className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-primary me-2 fs-5"></i>
                  <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
                </li>
              </ul>

              <Button  className="rounded-pill px-4" style={{backgroundColor:"#524dd3"}}>
                Discover More
              </Button>
            </div>
          </Col>

          
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="position-relative image-composition">
              
              <div className="image-main">
                <img
                  src={img2}
                  alt="Modern office with a team working"
                  className="img-fluid rounded shadow"
                />
              </div>

             
              <div
                className="image-secondary position-absolute"
                style={{
                  bottom: "-35%",
                  right: "60%",
                  transform: "translate(-10%, -70%)",
                  zIndex: 2,
                }}
              >
                <img
                  src={img3}
                  alt="Collaborative discussion"
                  className="img-fluid rounded shadow-lg"
                  style={{ width: "70%", border: "4px solid #fff" }}
                />
              </div>

              
              <div
                className="stats-card shadow position-absolute text-center rounded p-3"
                style={{
                  top: "-10%",
                  right: "0",
                  // transform: "translate(10%, 40%)",
                  width: "150px",
                  backgroundColor:"#131428"
                }}
              >
                <div className="d-flex align-items-center ">
                <div className="stats-item align-middle">
                  <h3 className="fw-bold mb-0 " style={{color:"#524dd3", fontSize:"20px"}}>20+</h3>
                  <p className="mb-0 small text-white" style={{fontSize:"10px"}}>Years of Expertise</p>
                </div>
                <div className="stats-item align-middle">
                  <h3 className="fw-bold mb-0" style={{color:"#524dd3", fontSize:"20px"}}>500+</h3>
                  <p className="mb-0 small text-white" style={{fontSize:"10px"}}>Happy Clients</p>
                </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
