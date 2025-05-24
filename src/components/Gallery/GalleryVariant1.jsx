import React from 'react';

const GalleryVariant1 = () => {
  return (
    <section className="gallery gallery-variant-1">
      <div className="container">
        <h2>Gallery Variant 1</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="/placeholder1.jpg" alt="Gallery item 1" />
          </div>
          <div className="gallery-item">
            <img src="/placeholder2.jpg" alt="Gallery item 2" />
          </div>
          <div className="gallery-item">
            <img src="/placeholder3.jpg" alt="Gallery item 3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryVariant1; 