import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import usePageTitle from '../hooks/usePageTitle';

const testimonials = [
  { quote: 'The team understood our requirements perfectly. Drawings were clear, the work was on time and the final result matched the design exactly.', name: 'Rahul Deshmukh', project: 'Villa Project' },
  { quote: 'Excellent guidance on materials and budget. Regular site updates kept us informed at every stage.', name: 'Priya Nair', project: 'Commercial Project' },
  { quote: 'From planning to handover, the process was smooth and professional. We would happily work with them again.', name: 'Amit Verma', project: 'Interior Project' },
];

export default function Clients() {
  usePageTitle('Clients | THE CENTER INFRASTRUCTURES', 'Client feedback and project collaboration at THE CENTER INFRASTRUCTURES.');
  return <main>
    <PageHero eyebrow="CLIENT EXPERIENCES" title="Built on collaboration.">Thoughtful planning, clear communication and coordinated delivery are at the heart of every client relationship.</PageHero>
    <section className="page-content testimonials"><div className="container"><div className="section-head"><div className="eyebrow">WHAT OUR CLIENTS SAY</div><h2>Good work begins with listening.</h2><p>These testimonials are dummy demonstration content.</p></div><div className="quote-grid">{testimonials.map((item) => <article className="quote-card" key={item.name}><div className="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>&ldquo;{item.quote}&rdquo;</blockquote><strong>{item.name}</strong><small>{item.project}</small></article>)}</div><div className="commitment"><div className="eyebrow">OUR COMMITMENT</div><h2 className="page-title">One coordinated team, clear communication.</h2><p className="lead">From first conversation through final handover, architectural design, engineering and execution, and construction are brought together around your requirements.</p><a className="button" href="/portfolio">Explore selected projects &rarr;</a></div></div></section>
    <CtaBand title="Let's start with your vision.">Share your project requirements and connect with our team.</CtaBand>
  </main>;
}
