import React from 'react';
import './Description.css';
import DescriptionVariant1 from './DescriptionVariant1';


export { DescriptionVariant1 };

export const DescriptionVariant2 = () => {
  return (
    <section className="description-section variant2">
      <div className="container">
        <div className="description-grid">
          <div className="description-image">
            <img src="https://via.placeholder.com/600x400" alt="Description" />
          </div>
          <div className="description-content">
            <h2>Despre Noi</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 