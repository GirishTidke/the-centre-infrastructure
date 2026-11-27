import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BackToTop from './BackToTop';
import Footer from './Footer';
import Header from './Header';

export default function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    const scrollToRoute = () => {
      const anchor = location.hash ? document.getElementById(location.hash.slice(1)) : null;
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo(0, 0);
    };
    const timer = window.setTimeout(scrollToRoute, 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stats = [...document.querySelectorAll('.stat strong')];
    const countUp = (element) => {
      const raw = element.dataset.statFinal || element.textContent;
      const match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      const total = Number(match[1]);
      const suffix = match[2];
      if (reduceMotion || !('IntersectionObserver' in window)) {
        element.textContent = `${total}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = 1050;
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(total * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    if (reduceMotion || !('IntersectionObserver' in window)) {
      stats.forEach(countUp);
      return undefined;
    }
    stats.forEach((element) => { element.dataset.statFinal = element.textContent; });
    const targets = document.querySelectorAll('.section-head,.intro-copy,.service-card,.project-card,.quote-card,.cta-wrap,.contact-grid,.service-detail,.team-card,.mission-card');
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    targets.forEach((element, index) => {
      element.classList.add('reveal-item');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
      revealObserver.observe(element);
    });
    const statsObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    }), { threshold: 0.45 });
    stats.forEach((element) => statsObserver.observe(element));
    return () => { revealObserver.disconnect(); statsObserver.disconnect(); };
  }, [location.pathname, location.search]);

  return <><Header /><Outlet /><Footer /><BackToTop /></>;
}
