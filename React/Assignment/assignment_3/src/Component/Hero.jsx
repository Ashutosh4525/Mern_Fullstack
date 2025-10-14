import { Container, Row, Col, Button, Image } from "react-bootstrap";
import imgSrc from '../assets/Img1.jpg'

function Hero() {


  return (
    <section
      id="hero"
      className="d-flex align-items-center py-6"
      style={{
        background: "#05071e",
        padding: "120px 0px",
        color: "white",
        Height: "100vh",
      }}
    >
      <Container>
        <Row className="align-items-lg-center">
          <Col lg={6} className="hero-content">
            <h1 className="hero-title fw-bold mb-3">
              Transform Your Digital Presence
            </h1>
            <p className="hero-text mb-4 text-light">
              We create innovative digital solutions that drive growth and
              elevate your brand. From web development to digital marketing,
              we're your partners in digital transformation.
            </p>

            <div className="hero-buttons mb-4">
              <Button variant="primary" className="me-3 px-4 py-2 rounded-pill" style={{ backgroundColor: "#524dd3", border: "none" }} >
                Get Started
              </Button>
              <Button variant="outline-light" className="px-4 py-2 rounded-pill border-2">
                Our Work
              </Button>
            </div>

           
            <div className="hero-stats d-flex flex-wrap gap-4">
              <div className="stat-item">
                <span className="stat-number d-block fs-2 fw-bold" style={{ color: "#524dd3", border: "none" }}>
                  150+
                </span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number d-block fs-2 fw-bold" style={{ color: "#524dd3", border: "none" }}>
                  95%
                </span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number d-block fs-2 fw-bold " style={{ color: "#524dd3", border: "none" }}>
                  24
                </span>
                <span className="stat-label">Team Members</span>
              </div>
            </div>
          </Col>

          
          <Col lg={6} className="text-center mt-4 mt-lg-0" >
            <div className="hero-image">
              <Image src={imgSrc} alt="Digital Agency Hero" fluid rounded/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
