import { Link, useSearchParams, useParams } from 'react-router-dom';
import { projects, projectImage } from '../data/projects';
import usePageTitle from '../hooks/usePageTitle';

export default function ProjectDetail() {
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === (projectId || searchParams.get('project'))) || projects[0];
  usePageTitle(`${project.name} | THE CENTER INFRASTRUCTURES`, `${project.name}, ${project.category.toLowerCase()} project in ${project.location}.`);

  return <main>
    <section className="project-detail-hero" style={{ '--project-image': `url("${projectImage(project.image)}")` }}><div className="container"><div className="eyebrow">{project.category} &middot; Selected Project</div><h1>{project.name}</h1><p>{project.location}</p></div></section>
    <section className="container"><div className="project-details"><div><span>Location</span><strong>{project.location}</strong></div><div><span>Completion</span><strong>{project.year}</strong></div><div><span>Project Area</span><strong>{project.area}</strong></div><div><span>Client</span><strong>Private Client</strong></div></div><div className="gallery">{project.gallery.map((image) => <img key={image} src={projectImage(image)} alt={`${project.name} project view`} loading="lazy" />)}</div><div className="detail-copy"><div className="eyebrow">Project overview</div><p>A thoughtfully planned development combining functional design, engineering precision and quality construction, delivered with a focus on performance and long-term value.</p><p>Our integrated approach brought design, engineering and construction coordination together from early planning through execution. Clear documentation and careful collaboration helped align the project vision with practical site requirements.</p><p>Materials, detailing and project sequencing were considered to support everyday use and lasting performance. This demonstration project reflects the value of thoughtful planning and disciplined delivery.</p><div className="hero-actions detail-actions"><Link className="button" to="/portfolio">&larr; Back to Projects</Link><Link className="button primary" to="/contact">Start a Similar Project &rarr;</Link></div></div></section>
  </main>;
}
