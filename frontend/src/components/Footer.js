import React from "react";
import { Col, Row, Container } from "react-bootstrap";
const Footer = () => {
  return (
    <footer style={{ background: "#4e5d6c" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <strong style={{ fontSize: "18px" }}>Connect with us</strong>
          </Col>
          <Col className="text-center py-3">
            <a href="https://wa.me/%2B917503704704?text=hii%20Platinum%20Gallery%2C%0AI%20want%20to%20know%20more%20about%20your%20products">
              {" "}
              <i class="fab fa-whatsapp"></i>
            </a>
          </Col>
          <Col className="text-center py-3">
            <a
              href="https://www.instagram.com/platinumgalary/"
              target="-_blank"
            >
              {" "}
              <i class="fab fa-instagram"></i>
            </a>
          </Col>
          <Col className="text-center py-3">
            <a href="mailto:pankaj.ppaa.pankaj@gmail.com">
              {" "}
              <i class="fas fa-envelope"></i>
            </a>
          </Col>
        </Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </footer>
  );
};

export default Footer;
