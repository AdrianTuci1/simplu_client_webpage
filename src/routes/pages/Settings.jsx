import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: 'ro',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      showProfile: true,
      showActivity: true,
      showReviews: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setClientInfo(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (type) => {
    setClientInfo(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: !prev.privacy[type]
      }
    }));
  };

  return (
    <div className="settings-page">
      <h1>Setări Cont</h1>
      <div className="settings-content">
        <section className="settings-section">
          <h2>Informații Personale</h2>
          <div className="form-group">
            <label>Prenume:</label>
            <input
              type="text"
              name="firstName"
              value={clientInfo.firstName}
              onChange={handleInputChange}
              placeholder="Introduceți prenumele"
            />
          </div>
          <div className="form-group">
            <label>Nume:</label>
            <input
              type="text"
              name="lastName"
              value={clientInfo.lastName}
              onChange={handleInputChange}
              placeholder="Introduceți numele"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={clientInfo.email}
              onChange={handleInputChange}
              placeholder="Introduceți adresa de email"
            />
          </div>
          <div className="form-group">
            <label>Telefon:</label>
            <input
              type="tel"
              name="phone"
              value={clientInfo.phone}
              onChange={handleInputChange}
              placeholder="Introduceți numărul de telefon"
            />
          </div>
        </section>

        <section className="settings-section">
          <h2>Preferințe</h2>
          <div className="form-group">
            <label>Limbă:</label>
            <select
              name="language"
              value={clientInfo.language}
              onChange={handleInputChange}
            >
              <option value="ro">Română</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h2>Notificări</h2>
          <div className="preferences-grid">
            <div className="preference-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={clientInfo.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                Notificări Email
              </label>
            </div>
            <div className="preference-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={clientInfo.notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                />
                Notificări SMS
              </label>
            </div>
            <div className="preference-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={clientInfo.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                Notificări Push
              </label>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>Confidențialitate</h2>
          <div className="preferences-grid">
            <div className="preference-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={clientInfo.privacy.showProfile}
                  onChange={() => handlePrivacyChange('showProfile')}
                />
                Afișează profilul meu
              </label>
            </div>
            <div className="preference-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={clientInfo.privacy.showActivity}
                  onChange={() => handlePrivacyChange('showActivity')}
                />
                Afișează activitatea mea
              </label>
            </div>
            <div className="preference-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={clientInfo.privacy.showReviews}
                  onChange={() => handlePrivacyChange('showReviews')}
                />
                Afișează recenziile mele
              </label>
            </div>
          </div>
        </section>

        <div className="settings-actions">
          <button className="save-button">Salvează Modificările</button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 