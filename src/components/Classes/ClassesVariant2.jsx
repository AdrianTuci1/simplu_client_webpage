import React from 'react';
import useClassesStore from './classesStore';
import './styles.css';

export const ClassesVariant2 = () => {
  const classes = useClassesStore((state) => state.classes);

  return (
    <section className="classes-section">
      <div className="container">
        <h2 className="section-title">Clasele Noastre</h2>
        
        <div className="classes-list">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-row">
              <div 
                className="class-image-square" 
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