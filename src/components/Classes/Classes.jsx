import React from 'react';
import useClassesStore from './classesStore';
import './styles.css';

export const ClassesVariant1 = () => {
  const classes = useClassesStore((state) => state.classes);

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
                <h3>{classItem.title}</h3>
                <p>{classItem.description}</p>
                <ul className="class-details">
                  {classItem.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 