import React from 'react';
import './FooterVariant1.css';
import { useFooterData } from '../../utils/componentHelpers';

const FooterVariant1 = () => {
  // Use the new homepage data system
  const { data: footer, loading, error } = useFooterData();

  if (loading) {
    return (
      <footer className="footer footer-variant-1">
        <div className="main-frame">
          <div className="content-container">
            <div className="content">
              <div className="loading-message">Se încarcă footer-ul...</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="footer footer-variant-1">
        <div className="main-frame">
          <div className="content-container">
            <div className="content">
              <div className="error-message">Eroare la încărcarea footer-ului: {error}</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footer) {
    return (
      <footer className="footer footer-variant-1">
        <div className="main-frame">
          <div className="content-container">
            <div className="content">
              <div className="no-data-message">Nu sunt date disponibile pentru footer.</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer footer-variant-1">
      <div className="main-frame">
        <div className="content-container">
          <div className="content">
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: {footer.email}</p>
              <p>Phone: {footer.phone}</p>
              <p>Address: {footer.address}</p>
            </div>
            <div className="footer-section">
              <h3>Program</h3>
              <p>Luni - Vineri: 09:00 - 18:00</p>
              <p>Sâmbătă: 09:00 - 14:00</p>
              <p>Duminică: Închis</p>
            </div>
            <div className="footer-section">
              <h3>Social Media</h3>
              <div className="social-links">
                {footer.socialMedia && footer.socialMedia.map((social, index) => (
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