// components/TopNav.jsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
          {/* Replace with your brand mark */}
          <img
            src="/images/logo.png"
            alt="Brand Logo"
            className="logo"
            width={168}      
            height={42}
            priority
          />
        </Link>
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
            const isActive =
              item.variant === "active" || pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "link",
                    isActive ? "is-active" : "",
                    item.variant === "sale" ? "is-sale" : "",
                    item.variant === "bold" ? "is-bold" : "",
                  ].join(" ").trim()}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <style jsx>{`
        :root {
          --text: #111;
          --muted: #666;
          --brand-blue: #2b86b8; /* tasteful cobalt */
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
          height: 42px; /* tune as needed to mimic the screenshot */
          width: auto;
          object-fit: contain;
        }
        .logo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Hamburger (mobile only) */
        .hamburger {
          position: absolute;
          right: 12px;
          top: 16px;
          display: none;
          width: 36px;
          height: 36px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .hamburger span {
          display: block;
          width: 18px;
          height: 2px;
          background: #111;
          margin: 3px auto;
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
          gap: var(--gap);
          gap: 40px; /* increased from var(--gap) to 40px for more space */

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
          font-weight: 600; /* bold like "Engagement" in screenshot */
        }
        .is-sale {
          color: var(--brand-blue); /* blue like SALE in screenshot */
          font-weight: 600;
        }
        .is-bold {
          font-weight: 700; /* like "We Buy Jewelry" */
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hamburger {
            display: inline-flex;
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
          .link {
            font-size: 1rem;
          }
        }
      `}</style>
    </header>
  );
}
