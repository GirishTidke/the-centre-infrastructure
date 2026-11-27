import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-symbol" aria-hidden="true" />
              <span className="brand-wordmark">THE CENTER INFRASTRUCTURES</span>
            </div>
            <p className="footer-sub">Architectural Design, Engineering &amp; Execution, and Construction.</p>
          </div>
          <div className="footer-col"><h4>Company</h4><Link to="/about">About Us</Link><Link to="/portfolio">Portfolio</Link><Link to="/clients">Clients</Link></div>
          <div className="footer-col"><h4>Services</h4><Link to="/services">Architectural Design</Link><Link to="/services">Engineering &amp; Execution</Link><Link to="/services">Construction</Link></div>
          <div className="footer-col"><h4>Connect</h4><div className="socials"><a href="tel:+918055223358">Instagram</a><a href="tel:+918055223358">LinkedIn</a><a href="tel:+918055223358">WhatsApp</a></div></div>
        </div>
        <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} THE CENTER INFRASTRUCTURES. All rights reserved.</span><span>Quality &middot; Precision &middot; Long-term value</span></div>
      </div>
    </footer>
  );
}
