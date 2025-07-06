import React from 'react';
import { useClassesData } from '../../utils/componentHelpers';
import './styles.css';

export const ClassesVariant1 = () => {
  // Use the new homepage data system
  const { data: classes, loading, error } = useClassesData();

  if (loading) {
    return (
      <section className="classes-section">
        <div className="container">
          <div className="loading-message">Se încarcă clasele...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="classes-section">
        <div className="container">
          <div className="error-message">Eroare la încărcarea claselor: {error}</div>
        </div>
      </section>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <section className="classes-section">
        <div className="container">
          <div className="no-classes-message">Nu sunt clase disponibile momentan.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="classes-section">
      <div className="container">
        <div className="classes-grid">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <div 
                className="class-image" 
                style={{ backgroundImage: `url(${classItem.image})` }}
              ></div>
              <div className="class-content">
                <h3>{classItem.name}</h3>
                <p>{classItem.description}</p>
                {classItem.details && (
                  <ul className="class-details">
                    {classItem.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 