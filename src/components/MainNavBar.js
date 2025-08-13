import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function TopNav() {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  // Edit your menu here
  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <header className="nav-wrap">
      {/* Logo row */}
      <div className="logo-row">
        <Link href="/" className="logo-link" aria-label="Home">
          <img src="/images/logo.png" alt="Brand Logo" className="logo" />
        </Link>

        {/* Social Icons (desktop only; hidden on mobile) */}
        <div className="social-icons">
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
                  ].join(" ").trim()}
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

        /* Hamburger: black button w/ rounded white lines */
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
        .is-active { font-weight: 600; }
        .is-sale { color: var(--brand-blue); font-weight: 600; }
        .is-bold { font-weight: 700; }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .hamburger { display: inline-flex; }

          /* Hide top-right social on mobile */
          .social-icons { display: none; }

          .menu {
            display: none;
            border-top: 1px solid #f1f5f9;
          }
          .menu.open { display: block; }
          .menu ul {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 10px 16px 16px;
          }

          /* Show social icons INSIDE the mobile menu */
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
          .mobile-social-icons a:hover { opacity: 0.7; }
        }

        /* Hide the mobile menu social row on desktop */
        @media (min-width: 769px) {
          .mobile-social-icons { display: none; }
        }
      `}</style>
    </header>
  );
}
