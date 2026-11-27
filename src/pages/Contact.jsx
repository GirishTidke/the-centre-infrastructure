import ContactSection from '../components/ContactSection';
import usePageTitle from '../hooks/usePageTitle';

export default function Contact() {
  usePageTitle('Contact Us | THE CENTER INFRA', 'Contact THE CENTER INFRA about your project.');
  return <main><ContactSection /></main>;
}
