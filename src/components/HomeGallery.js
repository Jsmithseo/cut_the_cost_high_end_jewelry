// src/components/HomeGallery.jsx

import React, { useState } from "react";
import { Container, Row, Col, Modal, ModalBody } from "reactstrap";

const images = Array.from({ length: 20 }, (_, index) => `/images/gallery/image${index + 1}.jpg`);

const HomeGallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = (image) => {
    setSelectedImage(image);
    setModalOpen(!modalOpen);
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Gallery</h2>
          <p className="text-muted">Snapshots of growth, training, and mental wins at ABC Mental Toughness</p>
        </div>
        <Row>
          {images.map((src, index) => (
            <Col xs="12" sm="12" md="3" className="mb-4" key={index}>
              <center>
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                style={{ width: "300px", height: "200px", objectFit: "cover", cursor: "pointer" }}
                className="rounded shadow-sm"
                onClick={() => toggleModal(src)}
              />
              </center>

            </Col>
          ))}
        </Row>

        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered size="lg">
          <ModalBody className="text-center">
            <img src={selectedImage} alt="Enlarged" className="img-fluid rounded" />
          </ModalBody>
        </Modal>
      </Container>
    </section>
  );
};

export default HomeGallery;
