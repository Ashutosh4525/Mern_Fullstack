
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import Heading from "../Heading/Heading";

const ContactSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section id="contact" className="contact section">
      <Container>
        {/* Section Title */}
        <Heading title="Contact" description="Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit"/>

        <Row className="align-items-center" data-aos="fade-up" data-aos-delay="100">
          {/* Contact Form */}
          <Col lg={5} xs={12} data-aos="fade-right" data-aos-delay="200">
            <div className="contact-form-card" >
              <div className="form-header">
                <div className="header-icon">
                  <i className="bi bi-chat-dots-fill"></i>
                </div>
                <h3>Let's Start a Conversation</h3>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur excepteur sint.
                </p>
              </div>

              <Form className="php-email-form" >
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Control style={{backgroundColor:"#0f1025",color:"white",borderColor:"#e8e7f7",borderRadius:"12px"}} type="text" name="name" placeholder="Your Name" />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Control style={{backgroundColor:"#0f1025",color:"#e8e7f7",borderColor:"#e8e7f7",borderRadius:"12px"}} type="email" name="email" placeholder="Email Address" />
                  </Col>
                </Row>
                <div className="mb-3">
                  <Form.Control style={{backgroundColor:"#0f1025",color:"#e8e7f7",borderColor:"#e8e7f7",borderRadius:"12px"}} type="text" name="subject" placeholder="What's this about?" />
                </div>
                <div className="mb-4">
                  <Form.Control 
                  style={{backgroundColor:"#0f1025",color:"#e8e7f7",borderColor:"#e8e7f7",borderRadius:"12px"}}
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Tell us more about your project..."
                  />
                </div>

                {/* <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div> */}

                <Button type="submit" className="submit-btn" style={{backgroundColor:"#524dd3"}}>
                  <span>Send Message</span>
                  <i className="bi bi-send-fill ms-2"></i>
                </Button>
              </Form>
            </div>
          </Col>

          {/* Contact Info */}
          <Col lg={7} xs={12} data-aos="fade-left" data-aos-delay="200">
            <div className="contact-info-area">
              <div className="info-header text-white">
                <h3>Ready to Transform Your Ideas?</h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium totam rem aperiam eaque ipsa quae
                  ab illo inventore.
                </p>
              </div>

              <div className="contact-methods" >
                {/* Email */}
                <div className="method-card" data-aos="zoom-in" data-aos-delay="250" style={{backgroundColor:"#0f1025",color:"#e8e7f7",borderColor:"#e8e7f7",borderRadius:"12px"}}>
                  <div className="card-icon">
                    <i className="bi bi-envelope-at"></i>
                  </div>
                  <div className="card-content">
                    <h5>Email Us</h5>
                    <p>hello@productdemo.com</p>
                    <span className="response-time">Response in 2-4 hours</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="method-card" data-aos="zoom-in" data-aos-delay="300" style={{backgroundColor:"#0f1025",color:"#e8e7f7",borderColor:"#e8e7f7",borderRadius:"12px"}}>
                  <div className="card-icon">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="card-content">
                    <h5>Call Us</h5>
                    <p>+1 (555) 987-6543</p>
                    <span className="response-time">Available 9AM - 6PM EST</span>
                  </div>
                </div>

                {/* Office */}
                <div className="method-card" data-aos="zoom-in" data-aos-delay="350" style={{backgroundColor:"#0f1025",color:"#e8e7f7",borderColor:"#e8e7f7",borderRadius:"12px"}}>
                  <div className="card-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="card-content">
                    <h5>Visit Our Office</h5>
                    <p>4821 Broadway Street, New York, NY 10013</p>
                    <span className="response-time">Open Monday - Friday</span>
                  </div>
                </div>
              </div>

            <div className="method-card" data-aos="zoom-in" data-aos-delay="350" style={{backgroundColor:"#0f1025"}}>
              {/* <div className="additional-info" data-aos="fade-up" data-aos-delay="400"> */}
                
                <div className="info-stats">
                  <div className="stat-item">
                    <div className="stat-number">24h</div>
                    <div className="stat-label">Average Response</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Client Satisfaction</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">150+</div>
                    <div className="stat-label">Projects Delivered</div>
                  </div>
                </div>
                </div>

                <div className="social-connect">
                  <h6>Connect With Us</h6>
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="bi bi-linkedin"></i></a>
                    <a href="#" className="social-link"><i className="bi bi-twitter-x"></i></a>
                    <a href="#" className="social-link"><i className="bi bi-github"></i></a>
                    <a href="#" className="social-link"><i className="bi bi-discord"></i></a>
                  </div>
                </div>
              {/* </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
