import { Link } from 'react-router-dom';

export default function CtaBand({ title, children, link = '/contact', action = 'Contact Us' }) {
  return <section className="cta-band"><div className="container cta-wrap"><div><div className="eyebrow">BUILDING BEYOND BOUNDARIES</div><h2>{title}</h2><p>{children}</p></div><Link className="button" to={link}>{action} &rarr;</Link></div></section>;
}
