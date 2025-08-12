// components/ShopPopular.jsx
import Link from "next/link";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useRef, useEffect } from "react";

export default function ShopPopular() {
  // Mix of images & videos
  const items = [
    { title: "Lookbook", href: "/lookbook", type: "video", videoSrc: "/images/movie1.mp4", poster: "images/movie1_image.png" },
    { title: "Pendants", href: "/pendants", imgSrc: "/images/popular/pendants.jpg" },
    { title: "Gold Chains", href: "/gold-chains", imgSrc: "/images/popular/gold-chains.jpg" },
    { title: "Earrings", href: "/earrings", imgSrc: "/images/popular/earrings.jpg" },
    { title: "Necklaces", href: "/necklaces", imgSrc: "/images/popular/necklaces.jpg" },
    { title: "Rings", href: "/rings", imgSrc: "/images/popular/rings.jpg" },
    { title: "Bracelets", href: "/bracelets", imgSrc: "/images/popular/bracelets.jpg" },
    { title: "Watches", href: "/watches", imgSrc: "/images/popular/watches.jpg" },
    { title: "Accessories", href: "/accessories", imgSrc: "/images/popular/accessories.jpg" },
    { title: "Custom", href: "/custom", imgSrc: "/images/popular/custom.jpg" },
  ];

  return (
    <section className="shop-popular">
      <Container>
        {/* Header */}
        <div className="header">
          <h3>Shop Popular</h3>
          <Link href="/shop" className="cta">
            <span>Shop Popular</span> <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Grid */}
        <Row className="popular-row">
          {items.map((item) => (
            <Col key={item.href} xs="6" sm="4" md="3" className="popular-col">
              <Link href={item.href} className="tile" aria-label={item.title}>
                <Card className="tile-card">
                  <div className="media-wrap">
                    {item.type === "video" ? (
                      <VideoFill src={item.videoSrc} poster={item.poster} />
                    ) : (
                      <img src={item.imgSrc} alt={item.title} className="media" loading="lazy" />
                    )}
                  </div>
                  <CardBody className="label">{item.title}</CardBody>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Styles */}
      <style jsx>{`
        .shop-popular { padding: 28px 0 16px; }

        .header {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; margin-bottom: 18px;
        }
        .header h3 {
          margin: 0; font-size: 1rem; font-weight: 600;
          letter-spacing: 0.02em; color: #111;
        }
        .cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.95rem; color: #0b6ea8; text-decoration: none;
          transition: opacity 140ms ease;
        }
        .cta:hover { opacity: 0.75; }

        .popular-row { row-gap: 18px; }

        /* 5 per row on large screens */
        @media (min-width: 1200px) {
          .popular-col { flex: 0 0 20%; max-width: 20%; }
        }

        .tile { display: block; text-decoration: none; color: inherit; }
        .tile-card {
          border: 0; border-radius: 12px; overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,.06);
          transition: transform 160ms ease, box-shadow 160ms ease;
          background: #fff;
        }
        .tile-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,.08);
        }

        /* Square media container */
        .media-wrap {
          position: relative; width: 100%; padding-top: 100%;
          overflow: hidden; background: #0f1115;
        }
        .media, .video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .label {
          text-align: center; padding: 10px 8px 12px;
          font-size: 0.95rem; font-weight: 500;
        }
      `}</style>
    </section>
  );
}

/** Video tile that fills the square, autoplays muted, loops, and pauses when off-screen */
function VideoFill({ src, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ensure autoplay works on iOS
    el.muted = true;
    const play = () => el.play().catch(() => {});
    const pause = () => el.pause();

    // Pause when not in view
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : pause()),
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="video"
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
    />
  );
}
