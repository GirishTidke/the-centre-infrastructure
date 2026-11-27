import { Link } from 'react-router-dom';
import { projectImage } from '../data/projects';

export default function ProjectCard({ project }) {
  return (
    <Link className="project-card" data-category={project.category} to={`/projects?project=${project.id}`}>
      <img src={projectImage(project.image)} alt={`${project.name} project`} loading="lazy" />
      <div className="project-info"><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.name}</h3><p>{project.location} &middot; {project.area}</p></div>
    </Link>
  );
}
