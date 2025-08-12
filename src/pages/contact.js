// pages/contact.js
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Container, Row, Col, Card, CardBody, Button,
  Form, FormGroup, Input, Label, Alert, Spinner,
} from "reactstrap";
import MainNavBar from "../components/MainNavBar";
import Footer from "../components/Footer";

const HUBSPOT_PORTAL_ID = "243400623";
const HUBSPOT_FORM_ID = "797c76ae-ca8a-47a3-82dd-d530a6e0c313";
const RECAPTCHA_SITE_KEY = "6LeQUZ8rAAAAAGSsXvs6u2QdeamqIiofil95StUo";

export default function Contact() {
  const [fields, setFields] = useState({
    firstname: "", lastname: "", email: "", phone: "",
    company: "",
    subject: "Custom Jewelry Inquiry",
    message: "",
    // JEWELRY BRIEF (local-only; appended into message for HubSpot)
    pieceType: "Engagement Ring",
    budget: "",
    timeline: "",
    diamondPref: "Natural Only (EGL/GIA Certified)",
    ringSize: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!recaptchaToken) { setError("Please complete the captcha."); return; }
    setSubmitting(true);

    // Build a single HubSpot-safe message that includes the brief
    const composedMessage = [
      fields.message?.trim(),
      "",
      "—— Project Brief ——",
      `Piece Type: ${fields.pieceType || "N/A"}`,
      `Budget: ${fields.budget || "N/A"}`,
      `Timeline: ${fields.timeline || "N/A"}`,
      `Diamond Preference: ${fields.diamondPref || "N/A"}`,
      `Ring Size (if applicable): ${fields.ringSize || "N/A"}`,
      "Source: Cut the High Cost Custom Jewelry",
    ].join("\n");

    const payloadFields = [
      { name: "firstname", value: fields.firstname },
      { name: "lastname", value: fields.lastname },
      { name: "email", value: fields.email },
      { name: "phone", value: fields.phone },
      { name: "company", value: fields.company },
      { name: "subject", value: fields.subject },
      { name: "message", value: composedMessage },
    ];

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
    const payload = {
      fields: payloadFields,
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "Cut the High Cost – Custom Jewelry Contact",
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
        setSubmitted(true);
        setFields({
          firstname: "", lastname: "", email: "", phone: "",
          company: "", subject: "Custom Jewelry Inquiry", message: "",
          pieceType: "Engagement Ring", budget: "", timeline: "",
          diamondPref: "Natural Only (EGL/GIA Certified)", ringSize: "",
        });
        setRecaptchaToken(null);
      } else {
        const msg = body.errors?.[0]?.message || JSON.stringify(body);
        setError(msg);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <MainNavBar />

      {/* HERO: Cut the High Cost – Custom Jewelry */}
      <div
        style={{
          background: `linear-gradient(rgba(14,16,18,.55),rgba(14,16,18,.55)), url('/images/hero_custom_jewelry.jpg') center/cover no-repeat`,
          minHeight: 720, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Container>
          <h1 className="text-white fw-bold mb-3" style={{ fontSize: "2.5rem", textAlign: "center" }}>
            Cut the High Cost of Custom Jewelry
          </h1>
          <p className="text-white mb-0 text-center" style={{ maxWidth: 820, margin: "0 auto", fontSize: 18 }}>
            Natural diamonds only. EGL &amp; GIA certified. Designed around your budget—without compromising brilliance.
          </p>
        </Container>
      </div>

      {/* FORM */}
      <Container className="my-5">
        <Row className="gy-4 justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <CardBody>
                <h3 className="fw-bold mb-2" style={{ color: "#0f7a65" }}>
                  Start Your Custom Piece
                </h3>
                <p style={{ fontSize: 16 }}>
                  Tell us about your dream design and budget. A specialist will reply with options and next steps.
                </p>

                {submitted ? (
                  <Alert color="success">
                    Thank you! Your request was received. A jewelry specialist will contact you shortly.
                  </Alert>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firstname">First Name</Label>
                          <Input name="firstname" id="firstname" value={fields.firstname} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="lastname">Last Name</Label>
                          <Input name="lastname" id="lastname" value={fields.lastname} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input type="email" name="email" id="email" value={fields.email} onChange={handleChange} required />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="phone">Phone</Label>
                          <Input name="phone" id="phone" value={fields.phone} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="pieceType">Piece Type</Label>
                      <Input type="select" name="pieceType" id="pieceType" value={fields.pieceType} onChange={handleChange}>
                        <option>Engagement Ring</option>
                        <option>Pendant</option>
                        <option>Gold Chain</option>
                        <option>Bracelet</option>
                        <option>Earrings</option>
                        <option>Custom (Describe Below)</option>
                      </Input>
                    </FormGroup>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="budget">Budget (USD)</Label>
                          <Input name="budget" id="budget" placeholder="e.g., $3,000 – $5,000" value={fields.budget} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="timeline">Timeline</Label>
                          <Input name="timeline" id="timeline" placeholder="e.g., 4–6 weeks" value={fields.timeline} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="diamondPref">Diamond Preference</Label>
                          <Input type="select" name="diamondPref" id="diamondPref" value={fields.diamondPref} onChange={handleChange}>
                            <option>Natural Only (EGL/GIA Certified)</option>
                            <option>Natural (GIA Certified)</option>
                            <option>Natural (EGL Certified)</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="ringSize">Ring Size (if applicable)</Label>
                          <Input name="ringSize" id="ringSize" placeholder="e.g., 6.5" value={fields.ringSize} onChange={handleChange} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label for="message">Design Notes</Label>
                      <Input
                        type="textarea"
                        name="message"
                        id="message"
                        rows={4}
                        placeholder="Tell us about the style, metal, shape, carat goals, or upload links to inspiration."
                        value={fields.message}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>


                    {error && <Alert color="danger">{error}</Alert>}

                    <Button color="primary" disabled={submitting || !recaptchaToken}>
                      {submitting ? <Spinner size="sm" /> : "Get My Custom Quote"}
                    </Button>
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
