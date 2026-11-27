import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import About from './pages/About';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';

function LegacyProjectRedirect() {
  const { pathname } = useLocation();
  return <Navigate to={pathname.endsWith('/index.html') ? '/' : '/portfolio'} replace />;
}

export default function App() {
  return <BrowserRouter><Routes><Route element={<SiteLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="services" element={<Services />} />
    <Route path="portfolio" element={<Portfolio />} />
    <Route path="clients" element={<Clients />} />
    <Route path="contact" element={<Contact />} />
    <Route path="contact/index.html" element={<Navigate to="/contact" replace />} />
    <Route path="projects" element={<ProjectDetail />} />
    <Route path="projects/:projectId" element={<ProjectDetail />} />
    <Route path="project/*" element={<LegacyProjectRedirect />} />
    <Route path="indexb12c.html" element={<Navigate to="/about" replace />} />
    <Route path="index26d5.html" element={<Navigate to="/projects" replace />} />
    <Route path="wp-json/index.html" element={<Navigate to="/about" replace />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></BrowserRouter>;
}
