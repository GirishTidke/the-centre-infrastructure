import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import usePageTitle from '../hooks/usePageTitle';

const team = [
  { name: 'Baba Meshram', role: 'Principal Architect' },
  { name: 'Coming soon', role: 'Interior Designer' },
  { name: 'Coming soon', role: 'Site Engineer' },
  { name: 'Coming soon', role: '3D Visualizer' },
];

export default function About() {
  usePageTitle('About Us | THE CENTER INFRA', 'Meet the people behind THE CENTER INFRA and learn about our integrated approach to design, engineering and construction.');
  return <main>
    <PageHero eyebrow="ABOUT THE COMPANY" title="The People Behind Every Project">Our multidisciplinary team brings together design thinking, engineering expertise and construction experience to deliver projects with confidence.</PageHero>
    <section className="page-content"><div className="container">
      <div className="story-grid"><div><div className="eyebrow">OUR STORY</div><h2 className="page-title">An integrated approach to building what lasts.</h2><p className="lead">THE CENTER INFRA brings planning, design, engineering and construction together to help turn clear ideas into dependable places and infrastructure.</p><p>Every successful project begins with a shared vision, thoughtful planning and strong execution. We coordinate each stage&mdash;from early concepts and technical documentation to site delivery and final handover&mdash;with a focus on clear communication, quality workmanship and long-term value.</p><p>Our work is shaped by close collaboration among clients, designers, engineers and construction teams. This integrated approach helps keep project goals, technical decisions and on-site execution aligned.</p></div><img src="/wp-content/themes/urban-architects/assets/projects/nandhi-hills-township.jpg" alt="Built environment project" loading="lazy" /></div>
      <div className="mission-grid"><article className="mission-card"><div className="eyebrow">OUR MISSION</div><h3>Deliver with care and clarity.</h3><p>Bring design, engineering and construction expertise together to deliver reliable, efficient projects with quality and transparent coordination.</p></article><article className="mission-card"><div className="eyebrow">OUR VISION</div><h3>Build for lasting value.</h3><p>Create future-ready infrastructure and spaces that serve people well through considered planning, sound engineering and responsible execution.</p></article></div>
      <div className="stats about-stats"><div className="stat"><strong>100+</strong><span>Projects Delivered</span></div><div className="stat"><strong>10+</strong><span>Years of Experience</span></div><div className="stat"><strong>50+</strong><span>Satisfied Clients</span></div></div><p className="content-note">Demonstration statistics only.</p>
      <div className="section-head"><div className="eyebrow">OUR TEAM</div><h2>People who bring plans to life.</h2><p>Our team brings together expertise across architecture, interiors, site engineering and visualization.</p></div><div className="team-grid">{team.map(({ name, role }) => <article className="team-card" key={role}><div className="team-photo-placeholder" role="img" aria-label="Portrait coming soon"><span>Portrait coming soon</span></div><h3>{name}</h3><p>{role}</p></article>)}</div>
    </div></section>
    <CtaBand title="Let's shape your next project.">Architectural design, engineering and construction, coordinated around your project vision.</CtaBand>
  </main>;
}
