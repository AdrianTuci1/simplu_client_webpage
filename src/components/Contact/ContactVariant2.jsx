import React from 'react';

const ContactVariant2 = () => {
  return (
    <section className="contact contact-variant-2">
      <div className="container">
        <h2>Contact Variant 2</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Email Us</h3>
            <p>contact@example.com</p>
          </div>
          <div className="contact-card">
            <h3>Call Us</h3>
            <p>+1 234 567 890</p>
          </div>
          <div className="contact-card">
            <h3>Visit Us</h3>
            <p>123 Main Street</p>
            <p>City, Country</p>
          </div>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactVariant2; 