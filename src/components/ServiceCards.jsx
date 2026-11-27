import { Link } from 'react-router-dom';

const services = [
  { number: '01 / DESIGN', name: 'Architectural & Interior Design', description: 'Site analysis, architectural concepts, master planning, elevations, approvals and detailed working drawings for residential, commercial and infrastructure projects.' },
  { number: '02 / ENGINEERING', name: 'Engineering & Execution', description: 'Structural and civil engineering, technical planning, design coordination, project documentation and on-site execution support.' },
  { number: '03 / CONSTRUCTION', name: 'Construction', description: 'Complete construction delivery, including structural work, steel work, masonry, plastering, flooring and finishing with careful quality control.' },
];

export default function ServiceCards() {
  return <div className="service-grid">{services.map((service) => <article className="service-card" key={service.name}><span className="service-number">{service.number}</span><h3>{service.name}</h3><p>{service.description}</p><Link className="text-link" to="/services">Explore service <span>&#8599;</span></Link></article>)}</div>;
}
