import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head"><div className="eyebrow">GET IN TOUCH</div><h2>Let&rsquo;s discuss your project.</h2></div>
        <div className="contact-grid">
          <div>
            <div className="contact-detail"><span>Address</span><p>S. No. F-31, Sai Regency, Ravinagar Square, Ram Nagar, Nagpur, Maharashtra 440033</p></div>
            <div className="contact-detail"><span>Phone</span><a href="tel:+918055223358">+91 80552 23358</a></div>
            <div className="contact-detail"><span>WhatsApp</span><a href="https://wa.me/918055223358">Chat with our team</a></div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
