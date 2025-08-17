import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function TopNav() {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true); // <— controls the thin top bar

  // Edit your menu here
  const items = [
    { label: "Home", href: "/" },
    { label: "Start Your Design", href: "/contact" },
    { label: "About", href: "/about" }
  ];

  return (
    <header className="nav-wrap">
      {/* ===== Top Support Bar ===== */}
      {showTopbar && (
        <div className="topbar" role="region" aria-label="Support hotline">
          <span>
            <strong>CALL</strong>{" "}
            <a href="tel:510-328-0122" aria-label="Call 510-328-0122">
            +1 (510) 328-0122
            </a>{" "}
            FOR LIVE SUPPORT
          </span>

          {/* dismiss button (mobile-friendly) */}
          <button
            className="topbar-close"
            onClick={() => setShowTopbar(false)}
            aria-label="Close support bar"
          >
            ×
          </button>
        </div>
      )}

      {/* Logo row */}
      <div className="logo-row">
        <Link href="/" className="logo-link" aria-label="Home">
          <img src="/images/logo.png" alt="Brand Logo" className="logo" />
        </Link>

        {/* Social Icons (desktop only; hidden on mobile) */}
        <div className="social-icons">
          <a
            href="https://www.instagram.com/cut_the_cost_high_end_jewelry/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/cutthecost.highendjewelry/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menu row */}
      <nav className={`menu ${open ? "open" : ""}`} aria-label="Primary">
        <ul>
          {items.map((item) => {
            const isActive = item.variant === "active" || pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "link",
                    isActive ? "is-active" : "",
                    item.variant === "sale" ? "is-sale" : "",
                    item.variant === "bold" ? "is-bold" : ""
                  ]
                    .join(" ")
                    .trim()}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Social icons INSIDE the mobile menu (hidden on desktop) */}
          <li className="mobile-social-icons">
            <a
              href="https://www.instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        :root {
          --text: #111;
          --muted: #666;
          --brand-blue: #2b86b8;
          --bg: #fff;
          --shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
          --gap: 26px;
        }

        .nav-wrap {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--bg);
          box-shadow: var(--shadow);
        }

        /* ===== Topbar styles ===== */
        .topbar {
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 48px; /* room for close button */
          color: #fff;
          font-size: 12.5px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          /* glossy, angled dark-blue gradient like screenshot */
          background: linear-gradient(
            110deg,
            #0f1a24 0%,
            #1d2a38 30%,
            #2a3b4f 60%,
            #0e1821 100%
          );
          border-bottom: 2px solid rgba(255, 255, 255, 0.6); /* thin white line */
        }
        .topbar a {
          color: #fff;
          text-decoration: none;
        }
        .topbar a:hover {
          text-decoration: underline;
        }
        .topbar-close {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          height: 24px;
          width: 24px;
          border: 0;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          line-height: 1;
          font-size: 18px;
          cursor: pointer;
        }
        @media (max-width: 640px) {
          .topbar {
            font-size: 11px;
            padding: 0 40px;
          }
          .topbar-close {
            right: 6px;
          }
        }

        /* Logo row */
        .logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 16px 10px;
          position: relative;
        }
        .logo {
          height: 200px;
          width: auto;
          object-fit: contain;
        }
        .logo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Desktop social icons (top-right) */
        .social-icons {
          position: absolute;
          right: 60px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 12px;
        }
        .social-icons a {
          color: var(--text);
          font-size: 1.2rem;
          transition: opacity 0.2s ease;
        }
        .social-icons a:hover {
          opacity: 0.7;
        }

        /* Hamburger */
        .hamburger {
          position: absolute;
          right: 12px;
          top: 16px;
          display: none;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 8px;
          background: #000;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 6px;
          padding: 8px;
        }
        .hamburger span {
          display: block;
          width: 28px;
          height: 6px;
          background: #fff;
          border-radius: 10px;
        }

        /* Menu row */
        .menu {
          width: 100%;
        }
        .menu ul {
          list-style: none;
          margin: 0;
          padding: 8px 16px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
        }
        .link {
          font-size: 0.98rem;
          letter-spacing: 0.02em;
          color: var(--text);
          text-decoration: none;
          padding: 6px 4px;
          transition: color 140ms ease, opacity 140ms ease;
        }
        .link:hover {
          opacity: 0.7;
        }
        .is-active {
          font-weight: 600;
        }
        .is-sale {
          color: var(--brand-blue);
          font-weight: 600;
        }
        .is-bold {
          font-weight: 700;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .hamburger {
            display: inline-flex;
          }
          .social-icons {
            display: none;
          }
          .menu {
            display: none;
            border-top: 1px solid #f1f5f9;
          }
          .menu.open {
            display: block;
          }
          .menu ul {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 10px 16px 16px;
          }
          .mobile-social-icons {
            display: flex;
            gap: 14px;
            justify-content: center;
            padding-top: 6px;
          }
          .mobile-social-icons a {
            color: var(--text);
            font-size: 1.4rem;
            transition: opacity 0.2s ease;
          }
          .mobile-social-icons a:hover {
            opacity: 0.7;
          }
        }

        /* Hide the mobile menu social row on desktop */
        @media (min-width: 769px) {
          .mobile-social-icons {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
