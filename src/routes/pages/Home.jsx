import { useEffect } from 'react';
import { businessConfig, getComponentInfo } from '../../config/businessConfig';
import {
  HeroVariant1,
  HeroVariant2,
  HeroVariant3
} from '../../components/Hero';
import {
  FeaturesVariant1,
  FeaturesVariant2,
  FeaturesVariant3
} from '../../components/Features';
import {
  TestimonialsVariant1,
  TestimonialsVariant2
} from '../../components/Testimonials';
import {
  GalleryVariant1,
  GalleryVariant2
} from '../../components/Gallery';
import {
  ContactVariant1,
  ContactVariant2
} from '../../components/Contact';
import '../../styles/Home.css';

// Hero Variants
const HeroVariant1 = () => <div>Hero Variant 1</div>;
const HeroVariant2 = () => <div>Hero Variant 2</div>;
const HeroVariant3 = () => <div>Hero Variant 3</div>;

// Features Variants
const FeaturesVariant1 = () => <div>Features Variant 1</div>;
const FeaturesVariant2 = () => <div>Features Variant 2</div>;
const FeaturesVariant3 = () => <div>Features Variant 3</div>;

// Testimonials Variants
const TestimonialsVariant1 = () => <div>Testimonials Variant 1</div>;
const TestimonialsVariant2 = () => <div>Testimonials Variant 2</div>;

// Gallery Variants
const GalleryVariant1 = () => <div>Gallery Variant 1</div>;
const GalleryVariant2 = () => <div>Gallery Variant 2</div>;

// Contact Variants
const ContactVariant1 = () => <div>Contact Variant 1</div>;
const ContactVariant2 = () => <div>Contact Variant 2</div>;

const componentMap = {
  HeroVariant1,
  HeroVariant2,
  HeroVariant3,
  FeaturesVariant1,
  FeaturesVariant2,
  FeaturesVariant3,
  TestimonialsVariant1,
  TestimonialsVariant2,
  GalleryVariant1,
  GalleryVariant2,
  ContactVariant1,
  ContactVariant2,
};

const Home = () => {
  return (
    <div className="home-layout">
      {businessConfig.homeLayout.map((number, index) => {
        if (number === 0) return null; // Skip disabled components
        
        const componentInfo = getComponentInfo(number);
        if (!componentInfo || !componentInfo.variant) {
          console.warn(`Invalid component number: ${number}`);
          return null;
        }

        const Component = componentMap[componentInfo.variant];
        if (!Component) {
          console.warn(`Component variant not found: ${componentInfo.variant}`);
          return null;
        }

        return <Component key={`section-${index}`} />;
      })}
    </div>
  );
};

export default Home; 