import ContactSection from '../components/ContactSection';
import usePageTitle from '../hooks/usePageTitle';

export default function Contact() {
  usePageTitle('Contact Us | THE CENTER INFRASTRUCTURES', 'Contact THE CENTER INFRASTRUCTURES about your project.');
  return <main><ContactSection /></main>;
}
