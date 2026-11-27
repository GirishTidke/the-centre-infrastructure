import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" aria-label="THE CENTER INFRA">
          <span className="brand-symbol" aria-hidden="true" />
          <span className="brand-wordmark" aria-hidden="true">THE CENTER INFRA</span>
        </Link>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          &#9776;
        </button>
        <Navbar open={open} onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}
