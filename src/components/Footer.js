import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <footer className="border-top border-secondary pt-5 pb-3" style={{ backgroundColor: "#fff", color: "#000" }}>
    <Container>
      <hr style={{ borderColor: "#000" }} />
      <Row className="align-items-center text-center text-md-start">
        <Col md={6} className="small">
          © 2025 Cut The Cost Custom Jewelry. All rights reserved.
        </Col>
        <Col md={6} className="d-flex justify-content-center justify-content-md-end gap-3 small">
          <a href="/accessibility" className="footer-link">Accessibility</a>
          <span>|</span>
          <a href="/privacy" className="footer-link">Privacy</a>
          <span>|</span>
          <a href="/terms-of-use" className="footer-link">Terms of Use</a>
        </Col>
      </Row>
    </Container>

    <style jsx>{`
      .footer-link {
        color: #000;
        text-decoration: none;
      }
      .footer-link:hover {
        color: #1c7acb;
      }
    `}</style>
  </footer>
);

export default Footer;
