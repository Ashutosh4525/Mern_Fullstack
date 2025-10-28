import { Container, Row, Col, Button,Card,Modal,Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect,useState } from "react";
import '../globalcss/global.css'
import img1 from '../assets/img1.webp'
import img2 from '../assets/img2.webp'
import img3 from '../assets/img3.webp'
import Heading from "./Heading/Heading";




function Portfolio(){
   const [show, setShow] = useState(false);
   const [selectedItem, setSelectedItem] = useState(null);

 useEffect(() => {
        AOS.init({ duration: 1000, once: true });
      }, []);

       const portfolioItems = [
    {
      id: 1,
      category: "Web Design",
      filter: "filter-web",
      img: img1,
      title: "Digital Innovation Platform",
      rating: 4.8,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      tech: ["React", "Node.js", "AWS"],
    },
    {
      id: 2,
      category: "Mobile App",
      filter: "filter-mobile",
      img: img2,
      title: "Smart Productivity App",
      rating: 4.9,
      description:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
      tech: ["Flutter", "Firebase", "AI"],
    },
    {
      id: 3,
      category: "Branding",
      filter: "filter-branding",
      img:img3,
      title: "Modern Brand Identity",
      rating: 5.0,
      description:
        "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id.",
      tech: ["Illustrator", "Figma", "Brand"],
    },
  ];

  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedItem(null);
  };
      return(
        <>
        <section id="portfolio" style={{backgroundColor: "#05071e",color:"white",padding:"100px 0px"}}>
        <Container>
          {/* <Container className=" text-center ">
              <h1>Portfolio</h1>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
           </Container> */}

           <Heading title="Portfolio" description="Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit"/>
           <Container className=" text-center" data-aos="fade-up" data-aos-delay="100" style={{marginBottom:"20px"}}>
            <Col>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>All Project</Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>Web Design</Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>Mobile App</Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>Branding </Button>
            <Button className="mx-3 btnPort" style={{backgroundColor:"#131428",borderColor:"white",borderRadius:"20px"}}>UI/UX</Button>
            </Col>
           </Container>
           {/* <Container className="text-center mb-4" data-aos="fade-up" data-aos-delay="100">
          <ul className="list-inline portfolio-filters">
          <li className="list-inline-item filter-active">All Projects</li>
          <li className="list-inline-item">Web Design</li>
          <li className="list-inline-item">Mobile Apps</li>
          <li className="list-inline-item">Branding</li>
          <li className="list-inline-item">UI/UX</li>
          </ul>
          </Container> */}

      <Container data-aos="fade-up" data-aos-delay="200">
        <Row className="gy-4">
          {portfolioItems.map((item) => (
            <Col key={item.id} lg={4} md={6} className={`portfolio-item ${item.filter}`}>
              <div className="portfolio-wrapper">
                <div className="portfolio-image position-relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid rounded"
                  />
                  <div className="portfolio-hover d-flex align-items-center justify-content-center">
                    <div className="portfolio-actions">
                      <a
                        // href={item.img}
                        className="action-btn me-2"
                        title="Preview"
                        // onClick={() => setShow(true)}
                        onClick={() => handleShow(item)}
                      >
                        <i className="bi bi-eye" style={{backgroundColor:"#131428", padding:"10px",borderRadius:"10px",color:"white",fontSize:"25px"}}></i>
                      </a>
                      <a href="#" className="action-btn" title="View Details">
                        <i className="bi bi-arrow-up-right" style={{backgroundColor:"#131428", padding:"10px",borderRadius:"10px",color:"white",fontSize:"25px"}}></i>
                      </a>
                    </div>
                  </div>
      
                </div>
                <div className="portfolio-content p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold" style={{color:"#524dd3",background: "linear-gradient(135deg, color-mix(in srgb #524dd3, transparent 90%), color-mix(in srgb,#524dd3, transparent 85%))",padding:"10px",borderRadius:"20px"}}>{item.category}</span>
                    <div className="rate">
                      <i className="bi bi-star-fill text-warning"></i>
                      <span > {item.rating}</span>
                    </div>
                  </div>
                  <h5>{item.title}</h5>
                  <p className="text-white small">{item.description}</p>
                  <div className="portfolio-tech mt-2">
                    {item.tech.map((tech, i) => (
                      <span key={i} className="badge bg-dark text-light me-2 p-3">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Image src={item.img} alt="Preview" fluid />
        </Modal.Body>
      </Modal> */}

{selectedItem && (
       <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
                <Modal.Header closeButton>
                  <Modal.Title>{selectedItem.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                  <Image src={selectedItem.img} alt="Preview" fluid />
                </Modal.Body>
              </Modal>
)}
      </Container>

      <Container>
           <Card className="d-flex align-items-center text-center p-5 mt-5" data-aos="fade-up" data-aos-delay="300" style={{ backgroundColor:"#131428", color:"white", boxShadow:"0 10px 30px rgba(0, 0, 0, 0.05)",borderRadius:"20px"}}>
                <h2>Ready to Transform Your Digital Presence?</h2>
                <p>Let's discuss your project and create something amazing together</p>
           <div className="hero-buttons mb-4">
              <Button variant="primary" className="me-3 px-4 py-2 " style={{ backgroundColor: "#524dd3", border: "none" }} >
                Get Started
              </Button>
              <Button variant="outline-light" className="px-4 py-2 border-2" style={{borderColor:"#524dd3",color:"#524dd3"}}>
                Our Work
              </Button>
            </div>
            </Card>
      </Container>
          </Container>

          
         </section>
  </>
      )
}

export default Portfolio;