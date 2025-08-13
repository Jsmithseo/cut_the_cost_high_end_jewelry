// components/ShopPopular.jsx
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Container, Row, Col, Card, CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from "reactstrap";

export default function ShopPopular() {
  const items = [
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie1.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie2.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie3.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie4.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie5.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie6.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie7.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie8.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie9.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie10.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie11.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie12.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie13.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie14.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie15.mp4", poster: "/images/movie1_image.png" },
    { title: "", href: "/lookbook", type: "video", videoSrc: "/images/movie16.mp4", poster: "/images/movie1_image.png" },
  ];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openModal = useCallback((item) => {
    setActive(item);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
    setActive(null);
  }, []);

  return (
    <section className="shop-popular">
      <Container>
        {/* Header */}
        <div className="header">
          <h2>Featured Items</h2>
        </div>

        {/* Grid */}
        <Row className="popular-row">
          {items.map((item, idx) => (
            <Col key={`${item.href}-${idx}`} xs="6" sm="4" md="3" className="popular-col">
              {/* Make the entire tile open a modal */}
              <button
                type="button"
                className="tile-btn"
                aria-label={`Open preview for ${item.title}`}
                onClick={() => openModal(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(item);
                  }
                }}
              >
                <Card className="tile-card">
                  <div className="media-wrap">
                    {item.type === "video" ? (
                      <VideoBackground src={item.videoSrc} poster={item.poster} />
                    ) : (
                      <img src={item.imgSrc} alt={item.title} className="media" loading="lazy" />
                    )}
                  </div>
                  <CardBody className="label">{item.title}</CardBody>
                </Card>
              </button>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal (plays full video with controls) */}
      <Modal isOpen={open} toggle={closeModal} centered size="lg">
        <ModalHeader toggle={closeModal}>{active?.title}</ModalHeader>
        <ModalBody>
          {active && (
            <div className="modal-media">
              {active.type === "video" ? (
                <video
                  key={active.videoSrc}
                  src={active.videoSrc}
                  poster={active.poster}
                  controls
                  playsInline
                  autoPlay
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#000", borderRadius: 12 }}
                />
              ) : (
                <img
                  src={active.imgSrc}
                  alt={active.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
                />
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button color="secondary" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>

      {/* Styles */}
      <style jsx>{`
        .shop-popular { padding: 28px 0 16px; }

        .header {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; margin-bottom: 18px;
        }
        .header h3 { margin: 0; font-size: 1rem; font-weight: 600; letter-spacing: .02em; color: #111; }
        .cta { display: inline-flex; align-items: center; gap: 6px; font-size: .95rem; color: #0b6ea8; text-decoration: none; }
        .cta:hover { opacity: .75; }

        .popular-row { row-gap: 18px; }

        /* 5 per row on large screens */
        @media (min-width: 1200px) {
          .popular-col { flex: 0 0 20%; max-width: 20%; }
        }

        /* Clickable tile button */
        .tile-btn {
          display: block;
          width: 100%;
          padding: 0;
          background: transparent;
          border: 0;
          text-align: inherit;
          cursor: pointer;
        }
        .tile-btn:focus-visible { outline: 2px solid #0b6ea8; outline-offset: 3px; border-radius: 14px; }

        .tile-card {
          border: 0; border-radius: 12px; overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,.06);
          transition: transform 160ms ease, box-shadow 160ms ease;
          background: #fff;
        }
        .tile-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,.08); }

        /* Uniform tile size (square by default) */
        .media-wrap {
          position: relative;
          width: 100%;
          padding-top: 100%;     /* 1:1 square; change to 125% for 4:5 or 56.25% for 16:9 */
          overflow: hidden;
          background: #000;
        }
        .media {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .label { text-align: center; padding: 10px 8px 12px; font-size: .95rem; font-weight: 500; }

        /* Modal media box (16:9 for cinematic preview) */
        .modal-media {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          overflow: hidden;
          border-radius: 12px;
          background: #000;
        }
      `}</style>
    </section>
  );
}

/** Background-style video inside tile */
function VideoBackground({ src, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Autoplay on mobile
    el.muted = true;
    const play = () => el.play().catch(() => {});
    const pause = () => el.pause();

    // Play in view, pause out of view
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : pause()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="video-bg"
      src={src}
      poster={poster}
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      controls={false}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
