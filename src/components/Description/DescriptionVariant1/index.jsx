import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import LocationMap from '../LocationMap/LocationMap';
import useDescriptionStore from '../../../store/descriptionStore';
import { DESCRIPTION_CHAR_LIMIT } from '../../../constants';
import styles from './DescriptionVariant1.module.css';

const DescriptionVariant1 = () => {
  const { description, location, setDescription } = useDescriptionStore();
  const remainingChars = DESCRIPTION_CHAR_LIMIT - description.length;

  useEffect(() => {
    // Load description from markdown file
    fetch('/description.md')
      .then(response => response.text())
      .then(text => setDescription(text))
      .catch(error => console.error('Error loading description:', error));
  }, [setDescription]);

  return (
    <div className={styles.descriptionMap}>
      <div className={styles.description}>
        <div className={styles.servicesDescription}>
          <div className={styles.membershipCardContainer}>
            <div className={styles.businessDescription}>
              <ReactMarkdown>{description}</ReactMarkdown>
              <div className={styles.charCount}>
                {remainingChars} caractere rămase
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <LocationMap position={location} />
      </div>
    </div>
  );
};

export default DescriptionVariant1; 