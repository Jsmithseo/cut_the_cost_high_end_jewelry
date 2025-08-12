import React, { useState } from "react";
import MainNavBar from '../components/MainNavBar';
import Footer from "../components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import Gallery from "../components/Gallery"
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
  Spinner}from "reactstrap";

// Animated number component
function AnimatedNumber({ to, duration = 1500, decimals = 0, prefix = "", suffix = "" }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    let end = to;
    let range = end - start;
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = start + range * progress;
      setCount(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    }
    requestAnimationFrame(step);
  }, [to, duration]);
  return (
    <span>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

// ToggleCard component with background color
function ToggleCard({ title, color, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className="border-0 shadow h-100"
      style={{
        backgroundColor: color,
        color: "#fff",
      }}
    >
      <CardBody>
        <h4 className="fw-bold mb-3" style={{ color: "#fff" }}>{title}</h4>
        <div className={`toggle-content ${isOpen ? "open" : "collapsed"}`}>
          {children}
        </div>
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
        .toggle-content.collapsed {
          max-height: 140px;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .toggle-content.open {
          max-height: 2000px;
          transition: max-height 0.4s ease;
        }
      `}</style>
    </Card>
  );
}

export default function Home() {
   // HubSpot form IDs
   const HUBSPOT_PORTAL_ID = "243400623"
   const HUBSPOT_FORM_ID = "1712ae97-5882-46c9-a06e-8a3daed3511b"
   const RECAPTCHA_SITE_KEY = "6LeQUZ8rAAAAAGSsXvs6u2QdeamqIiofil95StUo"
 
   // Newsletter state
   const [newsletter, setNewsletter] = useState({ firstName: "", lastName: "", email: "" });
   const [nlStatus, setNlStatus] = useState({ submitting: false, success: false, error: "" });
   const [recaptchaToken, setRecaptchaToken] = useState(null);
 
   const handleNlChange = (e) => {
     setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
   };
 
   const handleNlSubmit = async (e) => {
    e.preventDefault();
    // require captcha
    if (!recaptchaToken) {
      setNlStatus({ submitting: false, success: false, error: "Please complete the captcha." });
      return;
    }
    setNlStatus({ submitting: true, success: false, error: "" });
  
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
    const payload = {
      fields: [
        { name: "email",     value: newsletter.email     },
        { name: "firstname", value: newsletter.firstName },
        { name: "lastname",  value: newsletter.lastName  },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        recaptchaToken
      },
      // omit legalConsentOptions for now if you’re not using GDPR fields
    };
  
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const body = await res.json();                  // ← read the response
      console.error("HubSpot response:", body);       // ← log it
  
      if (res.ok) {
        setNlStatus({ submitting: false, success: true, error: "" });
        setNewsletter({ firstName: "", lastName: "", email: "" });
        setRecaptchaToken(null);
      } else {
        // show the HubSpot error message
        setNlStatus({ submitting: false, success: false, error: body?.errors?.[0]?.message || "Bad Request" });
      }
    } catch (err) {
      console.error(err);
      setNlStatus({ submitting: false, success: false, error: err.message });
    }
  };
  
 
  return (
    <>
      <MainNavBar />

      {/* HERO SECTION */}
      <section className="hero">

      </section>

      {/* WELCOME / MISSION SECTION */}
      <section className="welcome-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={12}>
              <h1 className="fw-bold mb-3" style={{ fontSize: "2.3rem", letterSpacing: 1, Color: "#000" }}>
              Luxury You Can Trust. Diamonds You Can Believe In.
              </h1>
              <p style={{ fontSize: "1.2rem", lineHeight: 1.7, Color: "black" }}>
              At Cut The Cost High End Jewelry, every piece is crafted with precision, passion, and the promise of authenticity. We work exclusively with natural diamonds, never lab-created, so you can cherish the timeless beauty and rarity of the real thing.
                <br /><br />
                Our stones are EGL and GIA certified, ensuring they meet the highest standards for quality, brilliance, and value. From the initial sketch to the final polish, your custom jewelry is designed to be as unique as your story — a piece that’s truly one of a kind.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Gallery/>

      <Footer />

      <style jsx global>{`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #fff; line-height: 1.6; }
  a { text-decoration: none; color: inherit; }

  /* HERO SECTION */
  .hero {
    max-height: 700px;
    width: 100%;
    aspect-ratio: 1 / 2;       /* 4:3 aspect ratio */
    display: flex;
    align-items: center;
    justify-content: flex-end; /* or center, as you prefer */
    background-image: url('/images/hero_image_home.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #e9f6fa;
    overflow: hidden;           /* ensure no overflow */
  }
  
  .hero-content {
    background: rgba(255,255,255,0.85);
    padding: 8px 32px;
    border-radius: 10px;
    max-width: 470px;
    margin-left: 6vw;
    box-shadow: 0 6px 32px rgba(0,0,0,0.08);
    text-align: left;
  }
  .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #203354; /* Dark color for hero heading */
  }
  .hero-content p {
    font-size: 1.25rem;
    margin-bottom: 32px;
    color: #222; /* Dark color for hero paragraph */
  }
  .hero-content .btn {
    background: #1d7acb;
    color: #fff;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    transition: background 0.2s;
    border: none;
  }
  .hero-content .btn:hover {
    background: #005b7a;
  }


  .py-5 {
    padding-top: 0rem !important;
}


  section { padding: 60px 40px; }

  /* RESEARCH SECTION */
  .research-section {
    max-width: 1240px;
    margin: 0 auto;
    padding: 60px 20px 80px 20px;
    text-align: center;
  }
  .research-title {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .research-desc {
    font-size: 1.15rem;
    color: #fff; /* White text for research description */
    max-width: 760px;
    margin: 0 auto 60px auto;
    line-height: 1.7;
  }
  .research-cards {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .research-card {
    border-radius: 8px;
    flex: 1 1 320px;
    max-width: 350px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 1px 10px rgba(0,0,0,0.07);
  }
  .stat-top {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 2.7rem;
    font-weight: 600;
    padding-left: 32px;
  }
  .stat-bottom {
    display: flex;
    align-items: flex-end;
  }
  .stat-green-bottom {
    background: #14c9d6;
    color: #fff;
  }
  .stat-blue-bottom {
    background: #14c9d6;
    color: #fff;
  }
  .stat-green2-bottom {
    background: #14c9d6;
    color: #fff;
  }
  .stat-label {
    display: block;
    font-size: 1.04rem;
    font-weight: 600;
    text-align: left;
    padding: 20px 0 20px 20px;
    max-width: 180px;
  }
`}</style>
    </>
  );
}
