import { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import CtaBand from '../components/CtaBand';
import PageHero from '../components/PageHero';
import { projects } from '../data/projects';
import usePageTitle from '../hooks/usePageTitle';

const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

export default function Portfolio() {
  const [category, setCategory] = useState('All');
  const visibleProjects = useMemo(() => category === 'All' ? projects : projects.filter((project) => project.category === category), [category]);
  usePageTitle('Portfolio | THE CENTER INFRASTRUCTURES', 'Explore residential, commercial and industrial projects from THE CENTER INFRASTRUCTURES.');

  return <main>
    <PageHero eyebrow="OUR PORTFOLIO" title="Our Selected Projects">Explore our work across residential, commercial and industrial developments.</PageHero>
    <section className="page-content"><div className="container"><div className="filters" aria-label="Filter projects">{categories.map((item) => <button className={`filter-button${category === item ? ' active' : ''}`} type="button" data-filter={item} aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="portfolio-grid">{visibleProjects.map((project) => <ProjectCard project={project} key={project.id} />)}</div><p className="content-note">Project names and details are demonstration content. Project descriptions are provided as illustrative examples.</p></div></section>
    <CtaBand title="Ready to discuss a similar project.">Architectural design, engineering and construction expertise, coordinated around your requirements.</CtaBand>
  </main>;
}
