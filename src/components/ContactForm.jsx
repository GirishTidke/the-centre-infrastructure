import { useState } from 'react';

const emptyErrors = { name: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [errors, setErrors] = useState(emptyErrors);
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = { ...emptyErrors };
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name) next.name = 'Please complete this field.';
    if (!email) next.email = 'Please complete this field.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (!phone) next.phone = 'Please complete this field.';
    else if (!/^[+\d][\d\s().-]{7,}$/.test(phone)) next.phone = 'Enter a valid phone number.';
    if (!message) next.message = 'Please complete this field.';

    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      setSent(false);
      return;
    }
    event.currentTarget.reset();
    setSent(true);
  }

  const fields = [
    { name: 'name', label: 'Your name', id: 'contact-name', autoComplete: 'name' },
    { name: 'email', label: 'Email address', id: 'contact-email', type: 'email', autoComplete: 'email' },
    { name: 'phone', label: 'Phone number', id: 'contact-phone', type: 'tel', autoComplete: 'tel', full: true },
  ];

  return (
    <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
      {fields.map(({ name, label, id, type = 'text', autoComplete, full }) => (
        <div className={`field${full ? ' full' : ''}`} key={name}>
          <label htmlFor={id}>{label}</label>
          <input id={id} name={name} type={type} autoComplete={autoComplete} required aria-invalid={Boolean(errors[name])} />
          <span className="field-error">{errors[name]}</span>
        </div>
      ))}
      <div className="field full">
        <label htmlFor="contact-message">Project details</label>
        <textarea id="contact-message" name="message" required aria-invalid={Boolean(errors.message)} />
        <span className="field-error">{errors.message}</span>
      </div>
      <button className="button primary" type="submit">Send enquiry <span>&#8599;</span></button>
      <div className={`form-status${sent ? ' show' : ''}`} role="status" aria-live="polite">Thanks for your enquiry. Our team will be in touch.</div>
    </form>
  );
}
