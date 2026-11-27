import { Link, NavLink } from 'react-router-dom';

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Clients', '/clients'],
];

export default function Navbar({ open, onNavigate }) {
  return <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Main navigation">
    {links.map(([label, to]) => <NavLink key={to} end={to === '/'} to={to} onClick={onNavigate}>{label}</NavLink>)}
    <Link className="nav-cta" to="/contact" onClick={onNavigate}>Contact Us</Link>
  </nav>;
}
