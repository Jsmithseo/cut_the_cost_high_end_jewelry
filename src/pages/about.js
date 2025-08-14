// pages/about.js
import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Container, Row, Col, Card, CardBody, Badge
} from "reactstrap";
import MainNavBar from "../components/MainNavBar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Cut the High Cost – Custom Jewelry</title>
        <meta
          name="description"
          content="Natural diamond custom jewelry with EGL and GIA certified stones. High-end craftsmanship at a fair cost, made accessible to everyone."
        />
      </Head>

      <MainNavBar />

      {/* HERO */}
      <section className="hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="9">
              <h1 className="hero-title">High-End Craftsmanship, Fair Pricing</h1>
              <p className="hero-sub">
                We started Cut the High Cost to make luxury jewelry accessible to everyone —
                using only <strong>natural diamonds</strong>, <strong>EGL &amp; GIA certified</strong>,
                and a transparent process that puts you first.
              </p>
              {/* <div className="certs">
                <Badge color="light" className="cert-badge">EGL Certified</Badge>
                <Badge color="light" className="cert-badge">GIA Certified</Badge>
                <Badge color="light" className="cert-badge">Natural Diamonds Only</Badge>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>

      {/* OUR STORY */}
      <section className="pad">
        <Container>
          <Row className="gy-4">
            <Col>
              <h2 className="section-title">Why We Started</h2>
              <p className="leadish">
                Luxury shouldn’t come with a markup you can’t explain. After years of seeing
                customers overpay for branding and overhead, we built a studio that focuses on
                what truly matters: the quality of the stone and the integrity of the craft.
              </p>
              <p>
                By partnering directly with trusted suppliers and master jewelers, we remove
                unnecessary middlemen and pass the savings to you — without compromising beauty,
                durability, or ethics. Every design is tailored to your budget, style, and story.
              </p>
              <ul className="checklist">
                <li>Natural diamonds only — never lab-created</li>
                <li>EGL &amp; GIA certifications for authenticity</li>
                <li>Transparent pricing &amp; made-to-order craftsmanship</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VALUE PROPS */}
      <section className="bg section-slim">
        <Container>
          <Row className="g-3">
            <Col md="4">
              <Card className="h-100 card-lite">
                <CardBody>
                  <h5 className="card-title">Natural &amp; Certified</h5>
                  <p className="mb-0">
                    Only natural diamonds, each independently graded by EGL or GIA
                    for cut, color, clarity, and carat — so you know exactly what you’re getting.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="h-100 card-lite">
                <CardBody>
                  <h5 className="card-title">Fair, Transparent Pricing</h5>
                  <p className="mb-0">
                    Direct sourcing + lean operations = more of your budget goes into the
                    diamond and craftsmanship — not markups.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="h-100 card-lite">
                <CardBody>
                  <h5 className="card-title">Designed Around You</h5>
                  <p className="mb-0">
                    From sketches to 3D renders to final polish, we shape each piece around
                    your style, timeline, and budget.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

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

      {/* CTA */}
      <section className="cta">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg="8">
              <h3 className="mb-2 text-white">Ready to Cut the High Cost?</h3>
              <p className="text-white-50 mb-3">
                Start your custom piece today. We’ll design around your budget using
                natural, EGL &amp; GIA certified diamonds.
              </p>
              <Link href="/contact" className="cta-btn">Get My Custom Quote</Link>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />

      <style jsx>{`
        .hero {
          background: #000;
          min-height: 300px;
          display: flex;
          align-items: center;
          color: #fff;
          text-align: center;
        }
        .hero-title { font-size: 2.25rem; font-weight: 800; letter-spacing: .01em; margin-bottom: .5rem; }
        .hero-sub { font-size: 1.05rem; }
        .certs { margin-top: 12px; }
        .cert-badge { border: 1px solid #e5e7eb; margin: 0 6px; background: #fff; color: #0a0c0e; }

        .pad { padding: 48px 0; }
        .section-slim { padding: 36px 0; }
        .bg { background: #fafbfc; }

        .section-title { font-weight: 700; margin-bottom: .5rem; letter-spacing: .01em; }
        .leadish { font-size: 1.05rem; }
        .checklist { margin: 12px 0 0 0; padding-left: 18px; }
        .checklist li { margin-bottom: 6px; }

        .card-lite { border: 1px solid #eef1f4; border-radius: 14px; }
        .card-title { font-weight: 700; }

        .step-card { border: 1px solid #eef1f4; border-radius: 14px; transition: transform 160ms ease, box-shadow 160ms ease; }
        .step-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,.06); }
        .step-badge {
          width: 40px; height: 40px; margin: 0 auto 10px; border-radius: 999px;
          display: grid; place-items: center; background: #0f7a65; color: #fff; font-weight: 700;
        }

        .cta { background: #000; padding: 44px 0; margin-top: 12px; }
        .cta-btn { display: inline-block; padding: 10px 16px; background: #fff; color: #0f7a65; border-radius: 10px;
          text-decoration: none; font-weight: 700; box-shadow: 0 4px 14px rgba(0,0,0,.12); }
        .cta-btn:hover { opacity: .9; }
      `}</style>
    </>
  );
}
