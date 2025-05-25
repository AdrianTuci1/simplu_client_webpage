import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './GalleryVariant1.css';

const GalleryVariant1 = () => {
  const images = [
    {
      id: 1,
      src: 'https://img.qunomedical.com/images.ctfassets.net/kfkw517g6gvn/4I49n9FXlZGuDQY3b8SxHt/4ab5b0e4b8df6a43cd35616b2313c466/580A0044.jpg?w=1700&q=75&func=fit&force_format=webp&org_if_sml=1',
      alt: 'Imagine 1'
    },
    {
      id: 2,
      src: 'https://localdentalclinics.com.au/blogs/1678785522.png',
      alt: 'Imagine 2'
    },
    {
      id: 3,
      src: 'https://hddentalclinic.ro/wp-content/uploads/2023/04/HD-Dental-Clinic-Cabinet-Dentar-Bucuresti-6.jpg',
      alt: 'Imagine 3'
    },
    {
      id: 4,
      src: '/images/gallery/image4.jpg',
      alt: 'Imagine 4'
    },
    {
      id: 5,
      src: '/images/gallery/image5.jpg',
      alt: 'Imagine 5'
    }
  ];

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="section-title">Galerie</h2>
        <div className="gallery-container">
          <Swiper
            grabCursor={true}
            slidesPerView={1.2}
            spaceBetween={20}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="gallery-swiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className="gallery-slide">
                <div className="image-container">
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GalleryVariant1; 