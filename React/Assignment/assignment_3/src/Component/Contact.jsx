import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { 
  EnvelopeAt, Telephone, GeoAlt, SendFill, ChatDotsFill, 
  Linkedin, TwitterX, Github, Discord 
} from "react-bootstrap-icons";
import Heading from "./Heading/Heading";

const Contact = () => {
  return (
    <section id="contact" className="contact section py-5" style={{backgroundColor: "#05071e",color:"white"}}>
      {/* <Container className="text-center mb-5">
        <h2>Contact</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </Container> */}

      <Heading title="Contact" description="Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit"/>

      <Container>
        <Row className="align-items-center">
          {/* Left Form Section */}
          <Col lg={5} >
            <Card className=" p-4 border-0" style={{backgroundColor:"#131428",color:"white"}}>
              <div className="text-center mb-3">
                <ChatDotsFill size={40} className="mb-2" />
                <h3>Let's Start a Conversation</h3>
                <p className="text-muted">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <Form >
                <Row>
                  <Col md={6} className="mb-3" style={{background:"#131428"}}>
                    <Form.Control type="text" placeholder="Your Name" required />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Control type="email" placeholder="Email Address" required />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="What's this about?" required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control as="textarea" rows={4} placeholder="Tell us more about your project..." required />
                </Form.Group>

                <Button type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2">
                  <span>Send Message</span> <SendFill />
                </Button>
              </Form>
            </Card>
          </Col>

          
          <Col lg={7} className="mt-4 mt-lg-0">
            <div>
              <h3>Ready to Transform Your Ideas?</h3>
              <p className="text-muted">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>

              {/* <Row className="gy-3 my-4">
                <Col md={4}>
                  <Card className="text-center border-0 shadow-sm p-3">
                    <EnvelopeAt size={30} className="text-primary mb-2" />
                    <h6>Email Us</h6>
                    <p className="mb-1">hello@productdemo.com</p>
                    <small className="text-muted">Response in 2–4 hours</small>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-center border-0 shadow-sm p-3">
                    <Telephone size={30} className="text-primary mb-2" />
                    <h6>Call Us</h6>
                    <p className="mb-1">+1 (555) 987-6543</p>
                    <small className="text-muted">Available 9AM–6PM EST</small>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="text-center border-0 shadow-sm p-3">
                    <GeoAlt size={30} className="text-primary mb-2" />
                    <h6>Visit Our Office</h6>
                    <p className="mb-1">4821 Broadway Street, NY</p>
                    <small className="text-muted">Mon–Fri</small>
                  </Card>
                </Col>
              </Row>

              <Row className="text-center">
                <Col md={4}>
                  <h4 className="text-primary mb-0">24h</h4>
                  <p className="text-muted">Avg. Response</p>
                </Col>
                <Col md={4}>
                  <h4 className="text-primary mb-0">98%</h4>
                  <p className="text-muted">Client Satisfaction</p>
                </Col>
                <Col md={4}>
                  <h4 className="text-primary mb-0">150+</h4>
                  <p className="text-muted">Projects Delivered</p>
                </Col>
              </Row> */}

              
              <div className="text-center mt-4">
                <h6>Connect With Us</h6>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  {[
                    { icon: <Linkedin />, link: "#" },
                    { icon: <TwitterX />, link: "#" },
                    { icon: <Github />, link: "#" },
                    { icon: <Discord />, link: "#" },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                      style={{
                        width: "40px",
                        height: "40px",
                        textDecoration: "none",
                        transition: "0.3s",
                      }}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
