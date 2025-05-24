import React from 'react';

const GalleryVariant2 = () => {
  return (
    <section className="gallery gallery-variant-2">
      <div className="container">
        <h2>Gallery Variant 2</h2>
        <div className="gallery-masonry">
          <div className="gallery-item">
            <img src="/placeholder1.jpg" alt="Gallery item 1" />
            <div className="gallery-caption">Beautiful view 1</div>
          </div>
          <div className="gallery-item">
            <img src="/placeholder2.jpg" alt="Gallery item 2" />
            <div className="gallery-caption">Amazing moment 2</div>
          </div>
          <div className="gallery-item">
            <img src="/placeholder3.jpg" alt="Gallery item 3" />
            <div className="gallery-caption">Special event 3</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryVariant2; 