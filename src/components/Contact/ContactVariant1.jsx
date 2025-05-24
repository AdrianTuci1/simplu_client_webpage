import React from 'react';

const ContactVariant1 = () => {
  return (
    <section className="contact contact-variant-1">
      <div className="container">
        <h2>Contact Variant 1</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Email: contact@example.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Main Street, City, Country</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactVariant1; 