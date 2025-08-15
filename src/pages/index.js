// pages/index.js
import React, { useState, useEffect } from "react";
import MainNavBar from "../components/MainNavBar";
import Footer from "../components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import Gallery from "../components/Gallery";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap";

// Animated number component (if you need it later)
function AnimatedNumber({ to, duration = 1500, decimals = 0, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = 0;
    const end = to;
    const range = end - start;
    let startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const value = start + range * progress;
      setCount(value);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    }
    requestAnimationFrame(step);
  }, [to, duration]);

  return <span>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}</span>;
}

// Expandable card (kept in case you use it below)
function ToggleCard({ title, color, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="border-0 shadow h-100" style={{ backgroundColor: color, color: "#fff" }}>
      <CardBody>
        <h4 className="fw-bold mb-3" style={{ color: "#fff" }}>{title}</h4>
        <div className={`toggle-content ${isOpen ? "open" : "collapsed"}`}>{children}</div>
        <Button
          color="link"
          className="p-0 mt-2 fw-bold"
          style={{ color: "#fff", textDecoration: "underline" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Show Less ▲" : "Read More ▼"}
        </Button>
      </CardBody>
      <style jsx>{`
        .toggle-content.collapsed { max-height: 140px; overflow: hidden; transition: max-height 0.3s ease; }
        .toggle-content.open { max-height: 2000px; transition: max-height 0.4s ease; }
      `}</style>
    </Card>
  );
}

export default function Home() {
  // HubSpot Newsletter form config
  const HUBSPOT_PORTAL_ID = "243400623";
  const HUBSPOT_FORM_ID = "1712ae97-5882-46c9-a06e-8a3daed3511b";
  const RECAPTCHA_SITE_KEY = "6LeQUZ8rAAAAAGSsXvs6u2QdeamqIiofil95StUo";

  const [newsletter, setNewsletter] = useState({ firstName: "", lastName: "", email: "" });
  const [nlStatus, setNlStatus] = useState({ submitting: false, success: false, error: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleNlChange = (e) => setNewsletter({ ...newsletter, [e.target.name]: e.target.value });

  const handleNlSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setNlStatus({ submitting: false, success: false, error: "Please complete the captcha." });
      return;
    }
    setNlStatus({ submitting: true, success: false, error: "" });

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
    const payload = {
      fields: [
        { name: "email", value: newsletter.email },
        { name: "firstname", value: newsletter.firstName },
        { name: "lastname", value: newsletter.lastName },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "Home",
        recaptchaToken,
      },
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      console.error("HubSpot response:", body);

      if (res.ok) {
        setNlStatus({ submitting: false, success: true, error: "" });
        setNewsletter({ firstName: "", lastName: "", email: "" });
        setRecaptchaToken(null);
      } else {
        setNlStatus({
          submitting: false,
          success: false,
          error: body?.errors?.[0]?.message || "Submission error",
        });
      }
    } catch (err) {
      console.error(err);
      setNlStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <>
      <MainNavBar />

      {/* HERO (mobile-optimized background images) */}
      <section className="hero">
        {/* Optional overlayed content; keep/remove as needed */}

      </section>

      {/* WELCOME / MISSION */}
      <section className="welcome-section">
  <Container>
    <Row className="justify-content-center">
      <Col lg={10}>
        <h2 className="fw-bold mb-3" style={{ fontSize: "2rem", letterSpacing: ".5px" }}>
          Luxury You Can Trust. Diamonds You Can Believe In.
        </h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#111" }}>
          At Cut The Cost High End Jewelry, every piece is crafted with precision, passion, and the promise of authenticity.
          We work exclusively with natural diamonds—never lab-created—so you can cherish the timeless beauty and rarity of the real thing.
          <br /><br />
          Our stones are EGL and GIA certified, ensuring they meet the highest standards for quality, brilliance, and value.
          From the initial sketch to the final polish, your custom jewelry is designed to be as unique as your story — a
          piece that’s truly one of a kind.
        </p>
        <div style={{ marginTop: "20px", padding: "14px", background: "#f8f8f8", borderRadius: "8px" }}>
          <strong>Flexible Financing Available: </strong>  
          We’ve partnered with <a href="https://www.affirm.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1d7acb", fontWeight: "bold" }}>Affirm</a> so you can pay over time.  
          Get the jewelry you love today and spread payments out over manageable monthly installments.
        </div>
      </Col>
    </Row>
  </Container>
</section>

      {/* GALLERY (your component) */}
      <Gallery />


            {/* PROCESS */}
      <section className="pad">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="8">
              <h2 className="section-title">Our Process</h2>
              <p className="mb-4">
                Simple, guided, and collaborative — so you can enjoy the journey as much as the result.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {[
              { step: "1", title: "Consult", desc: "Share your vision, budget, and timeline with a jewelry specialist." },
              { step: "2", title: "Design", desc: "We develop sketches/3D renders and source certified natural diamonds." },
              { step: "3", title: "Craft", desc: "Master jewelers hand-set stones and finish your piece to perfection." },
              { step: "4", title: "Deliver", desc: "You receive your certified, custom piece — ready to wear and cherish." },
            ].map((s) => (
              <Col key={s.step} md="3" sm="6">
                <Card className="h-100 step-card">
                  <CardBody className="text-center">
                    <div className="step-badge">{s.step}</div>
                    <h6 className="mb-2">{s.title}</h6>
                    <p className="mb-0 small">{s.desc}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <div className="text-center mt-4">
  <Button
    href="/contact"
    color="dark"
    size="lg"
    style={{
      backgroundColor: "#000",
      color: "#fff",
      padding: "12px 28px",
      borderRadius: "8px",
      fontWeight: "bold",
      textTransform: "uppercase",
    }}
  >
    Start Your Design
    
  </Button>
</div>
<br/>
<br/>

      <Footer />

      {/* STYLES */}
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0a0c0e; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }

        /* HERO: mobile-optimized via art direction swap */
        .hero {
          position: relative;
          width: 100%;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/images/hero_image_home.jpg'); /* desktop/wide */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #050503;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.25));
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          background: rgba(255,255,255,0.9);
          padding: 14px 20px;
          border-radius: 12px;
          max-width: 520px;
          margin: 0 20px;
          box-shadow: 0 6px 32px rgba(0,0,0,0.08);
          text-align: left;
        }
        .hero-content h1 {
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 10px;
          color: #203354;
        }
        .hero-content p {
          font-size: 1.05rem;
          margin: 0 0 14px;
          color: #222;
        }
        .hero-content .btn {
          background: #1d7acb;
          color: #fff;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          border: none;
          display: inline-block;
        }
        .hero-content .btn:hover { opacity: .9; }

        /* Mobile crop + tighter layout */
        @media (max-width: 768px) {
          .hero {
            min-height: 60vh;
            background-image: url('/images/hero_image_home_mobile.jpg'); /* add this file */
            background-position: 40% center; /* adjust to keep subject visible */
          }
          .hero-content {
            width: 100%;
            max-width: 100%;
            margin: 0 14px;
            padding: 10px 14px;
          }
          .hero-content h1 {
            font-size: 1.6rem;
            line-height: 1.2;
          }
          .hero-content p {
            font-size: 0.98rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 1200px) {
          .hero { min-height: 78vh; }
          .hero-content h1 { font-size: 2.2rem; }
        }

        /* Sections */
        section { padding: 56px 20px; }
        .welcome-section { background: #fff; }
        .newsletter { background: #fafbfc; }
        .hero {
          width: 100%;
          min-height: 400px; /* fallback height */
          background-image: url('/images/hero_image_home.jpg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain; /* show full image */
          background-color: #050503;
        }
        
        /* Optional: increase height for larger screens */
        @media (min-width: 768px) {
          .hero {
            min-height: 700px;
            background-size: cover; /* fill space on desktop */
          }
        }

      `}</style>
    </>
  );
}
