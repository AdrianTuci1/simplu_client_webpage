import { Link } from 'react-router-dom';
import './PageError.css';

const PageError = ({ message }) => {
  return (
    <div className="page-error">
      <div className="error-content">
        <h1>Page Not Available</h1>
        <p>{message}</p>
        <Link to="/" className="back-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageError; 