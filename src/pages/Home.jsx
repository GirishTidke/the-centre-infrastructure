import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';
import CtaBand from '../components/CtaBand';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ServiceCards from '../components/ServiceCards';
import { projects } from '../data/projects';
import usePageTitle from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle('THE CENTER INFRA | Building Beyond Boundaries', 'THE CENTER INFRA brings architectural design, engineering and execution, and construction together in Nagpur, Maharashtra.');
  return <main>
    <Hero />
    <section className="section" id="about"><div className="container intro-grid"><div className="intro-copy"><div className="eyebrow">ABOUT US</div><h2>Building Infrastructure. Creating Possibilities.</h2><p className="lead">THE CENTER INFRA is an integrated architectural design, engineering and construction company focused on delivering reliable, efficient and future-ready projects.</p><p>Every successful project begins with a clear vision, thoughtful planning and strong execution. Our approach combines design expertise, engineering knowledge and construction capabilities to manage projects from initial concept to final handover.</p><p>With a focus on quality workmanship, transparent coordination and professional project management, we aim to create infrastructure that delivers lasting value.</p><div className="stats"><div className="stat"><strong>100+</strong><span>Projects Delivered</span></div><div className="stat"><strong>10+</strong><span>Years of Experience</span></div><div className="stat"><strong>50+</strong><span>Satisfied Clients</span></div></div><Link className="text-link" to="/about">Our company &amp; team <span>&#8599;</span></Link></div><div className="intro-photo"><img src="/wp-content/themes/urban-architects/assets/projects/priyadarshi.jpg" alt="Residential architecture project" loading="lazy" /><div className="photo-note">Architectural design, engineering and construction&mdash;coordinated from the start.</div></div></div></section>
    <section className="section services-section" id="services"><div className="container"><div className="section-head"><div className="eyebrow">OUR SERVICES</div><h2>Three Disciplines. One Coordinated Team.</h2><p>Architectural and interior design, redevelopment and renovation, and construction&mdash;the essential capabilities your project needs.</p></div><ServiceCards /></div></section>
    <section className="statement"><div className="container"><div className="eyebrow">THE CENTER INFRA</div><h2>Building Beyond Boundaries.</h2><p>Architectural &amp; Interior Design &middot; Redevelopment &amp; Renovation &middot; Construction</p></div></section>
    <section className="section" id="portfolio"><div className="container"><div className="section-head"><div className="eyebrow">OUR PORTFOLIO</div><h2>Selected Projects</h2><p>Explore our work across residential, commercial and industrial developments.</p></div><div className="portfolio-grid">{projects.map((project) => <ProjectCard project={project} key={project.id} />)}</div><p className="content-note">Project names and details are demonstration content.</p></div></section>
    <CtaBand title="Have a project in mind?">Talk with our team about architectural and interior design, redevelopment and renovation, and construction.</CtaBand>
    <ContactSection />
  </main>;
}
