import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './ReviewsVariant1.css';

const ReviewsVariant1 = () => {
  const reviews = [
    {
      id: 1,
      name: "Maria Popescu",
      text: "Servicii excelente! Echipa este foarte profesionistă și am primit exact ce am dorit.",
      rating: 5
    },
    {
      id: 2,
      name: "Ion Ionescu",
      text: "Recomand cu încredere! Calitatea serviciilor este remarcabilă.",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Dumitrescu",
      text: "O experiență plăcută de la început până la sfârșit. Mulțumesc!",
      rating: 5
    },
    {
      id: 4,
      name: "George Popa",
      text: "Profesioniști în tot ce fac. Sunt foarte mulțumit de rezultate.",
      rating: 5
    },
    {
      id: 5,
      name: "Elena Marin",
      text: "Atitudine prietenoasă și servicii de calitate. Voi reveni cu siguranță!",
      rating: 5
    }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="section-title">Ce spun clienții noștri</h2>
        <Swiper
          grabCursor={true}
          slidesPerView={'auto'}
          spaceBetween={20}
          loop={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="review-slide">
              <div className="review-card">
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="review-text">{review.text}</p>
                <p className="reviewer-name">{review.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewsVariant1; 