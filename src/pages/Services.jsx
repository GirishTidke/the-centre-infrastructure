import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import usePageTitle from '../hooks/usePageTitle';

const services = [
  { number: '01', title: 'ARCHITECTURAL & INTERIOR DESIGN', heading: 'Start with a clear, considered plan.', image: 'priyadarshi.jpg', alt: 'Architecture and planning project', description: 'Site analysis, architectural concepts, master planning, elevations, approvals and detailed working drawings for residential, commercial and infrastructure projects. Our planning work connects design intent with engineering and construction requirements.', items: ['Site analysis & feasibility', 'Architectural concepts', 'Master plans & elevations', 'Approvals & working drawings'], enquiry: 'Enquire about architectural and interior design' },
  { number: '02', title: 'ENGINEERING & EXECUTION', heading: 'Engineering coordinated through execution.', image: 'krishanu.jpg', alt: 'Design and engineering project', description: 'Structural and civil engineering, technical planning, design coordination, project documentation and execution support. We coordinate design and site teams to carry approved plans through construction.', items: ['Structural design coordination', 'Civil engineering solutions', 'Technical planning', 'Project documentation & execution support'], enquiry: 'Enquire about engineering' },
  { number: '03', title: 'CONSTRUCTION', heading: 'Disciplined delivery, quality workmanship.', image: 'balaji-papanna.jpg', alt: 'Construction project', description: 'Complete construction execution, including structural work, steel work, masonry, plastering, flooring and finishing with strict quality control. Design, engineering and construction are coordinated to carry the approved project intent through to handover.', items: ['Structural & steel work', 'Masonry & plastering', 'Flooring & finishes', 'Site coordination & quality control'], enquiry: 'Enquire about construction' },
];

export default function Services() {
  usePageTitle('Services | THE CENTER INFRA', 'Architectural design, engineering and execution, and construction services from THE CENTER INFRA.');
  return <main>
    <PageHero eyebrow="OUR CAPABILITIES" title="Design. Engineering. Construction.">Three connected services, aligned around your project from design through construction.</PageHero>
    <section className="page-content"><div className="container">{services.map((service) => <article className="service-detail" key={service.number}><div><div className="eyebrow">{service.number} &middot; {service.title}</div><h2>{service.heading}</h2><p>{service.description}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><a className="text-link" href="/contact">{service.enquiry} <span>&#8599;</span></a></div><img src={`/wp-content/themes/urban-architects/assets/projects/${service.image}`} alt={service.alt} loading="lazy" /></article>)}</div></section>
    <CtaBand title="Bring your project into focus.">Connect with our team for professional guidance and a consultation.</CtaBand>
  </main>;
}
