import React from 'react';
import './FooterVariant1.css';
import useFooterStore from '../../store/footerStore';

const FooterVariant1 = () => {
  const { contact, program, socialMedia } = useFooterStore();

  return (
    <footer className="footer footer-variant-1">
      <div className="main-frame">
        <div className="content-container">
          <div className="content">
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <p>Address: {contact.address}</p>
            </div>
            <div className="footer-section">
              <h3>Program</h3>
              <p>Luni - Vineri: {program.weekdays}</p>
              <p>Sâmbătă: {program.saturday}</p>
              <p>Duminică: {program.sunday}</p>
            </div>
            <div className="footer-section">
              <h3>Social Media</h3>
              <div className="social-links">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="powered-by">
            <p>Powered by <span className="simplu-text">Simplu</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterVariant1; 