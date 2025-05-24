import { useEffect, useState } from 'react';
import { businessConfig, getComponentInfo } from '../config/businessConfig';
import {
  HeroVariant1,
  HeroVariant2,
  HeroVariant3
} from '../components/Hero';
import {
  FeaturesVariant1,
  FeaturesVariant2,
  FeaturesVariant3
} from '../components/Features';
import {
  DescriptionVariant1,
  DescriptionVariant2
} from '../components/Description';
import {
  TestimonialsVariant1,
  TestimonialsVariant2
} from '../components/Testimonials';
import {
  GalleryVariant1,
  GalleryVariant2
} from '../components/Gallery';
import {
  ContactVariant1,
  ContactVariant2
} from '../components/Contact';
import '../styles/Home.css';

const componentMap = {
  HeroVariant1,
  HeroVariant2,
  HeroVariant3,
  FeaturesVariant1,
  FeaturesVariant2,
  FeaturesVariant3,
  DescriptionVariant1,
  DescriptionVariant2,
  TestimonialsVariant1,
  TestimonialsVariant2,
  GalleryVariant1,
  GalleryVariant2,
  ContactVariant1,
  ContactVariant2,
};

const Home = () => {
  const [homeData, setHomeData] = useState({
    heroCover: '',
    heroLogo: ''
  });

  useEffect(() => {
    // Aici veți face apelul către API pentru a obține datele
    // Exemplu:
    // fetchHomeData().then(data => setHomeData(data));
    
    // Pentru test, folosim niște valori statice
    setHomeData({
      heroCover: 'https://5.imimg.com/data5/SELLER/Default/2024/2/384014748/BN/DD/EQ/199925747/gym-interior-designers.jpg',
      heroLogo: 'https://marketplace.canva.com/EAFxdcos7WU/1/0/1600w/canva-dark-blue-and-brown-illustrative-fitness-gym-logo-oqe3ybeEcQQ.jpg'
    });
  }, []);

  const renderComponent = (number, index) => {
    if (number === 0) return null;
    
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

    // Transmitem props specifice pentru HeroVariant1
    if (componentInfo.variant === 'HeroVariant1') {
      return (
        <Component 
          key={`section-${index}`}
          coverImage={homeData.heroCover}
          logoImage={homeData.heroLogo}
        />
      );
    }

    return <Component key={`section-${index}`} />;
  };

  return (
    <div className="home-layout">
      {businessConfig.homeLayout.map(renderComponent)}
    </div>
  );
};

export default Home; 