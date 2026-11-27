import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page Not Found | THE CENTER INFRASTRUCTURES');
  return <main className="page-content"><div className="container"><div className="eyebrow">404</div><h1 className="page-title">This page could not be found.</h1><Link className="button" to="/">Return home</Link></div></main>;
}
