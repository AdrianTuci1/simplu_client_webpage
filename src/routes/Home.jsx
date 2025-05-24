import { businessConfig } from '../config/businessConfig';
import { COMPONENT_CODES } from '../config/componentCodes';
import '../styles/Home.css';

const Home = () => {
  const renderComponent = (code, index) => {
    if (code === 0) return null;
    
    const Component = COMPONENT_CODES[code];
    if (!Component) {
      console.warn(`Component not found for code: ${code}`);
      return null;
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