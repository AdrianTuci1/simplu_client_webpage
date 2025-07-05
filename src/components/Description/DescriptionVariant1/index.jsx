import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import LocationMap from '../LocationMap/LocationMap';
import { useDescription, useCoordinates } from '../../../hooks/useSimplifiedData';
import { DESCRIPTION_CHAR_LIMIT } from '../constants';
import styles from './DescriptionVariant1.module.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaGlobe } from 'react-icons/fa';

const DescriptionVariant1 = () => {
  // Use the simplified data hooks
  const { data: descriptionPath, loading: descriptionLoading, error: descriptionError } = useDescription({ 
    locationId: 1 
  });
  const { data: coordinates, loading: coordinatesLoading, error: coordinatesError } = useCoordinates({ 
    locationId: 1 
  });
  
  // State for markdown content
  const [markdownContent, setMarkdownContent] = useState('');

  // Load markdown file when description path changes
  useEffect(() => {
    if (descriptionPath) {
      console.log('DescriptionVariant1: descriptionPath:', descriptionPath);
      
      if (descriptionPath && (descriptionPath.startsWith('./') || descriptionPath.startsWith('http://') || descriptionPath.startsWith('https://'))) {
        // Convert relative path to absolute path for public directory
        let absolutePath = descriptionPath;
        if (descriptionPath.startsWith('./')) {
          // Remove the './' and make it absolute from the root
          absolutePath = '/' + descriptionPath.substring(2);
        }
        
        console.log('DescriptionVariant1: Loading markdown from:', absolutePath);
        
        // Load markdown file from path or URL
        fetch(absolutePath)
          .then(response => {
            console.log('DescriptionVariant1: Fetch response status:', response.status);
            if (!response.ok) {
              throw new Error(`Failed to load markdown file: ${response.status}`);
            }
            return response.text();
          })
          .then(text => {
            console.log('DescriptionVariant1: Markdown loaded successfully:', text.substring(0, 100) + '...');
            setMarkdownContent(text);
          })
          .catch(error => {
            console.error('DescriptionVariant1: Error loading markdown file:', error);
            setMarkdownContent('Descrierea nu a putut fi încărcată.');
          });
      } else {
        // Fallback to description text
        console.log('DescriptionVariant1: Using description text directly');
        setMarkdownContent(descriptionPath || '');
      }
    } else {
      console.log('DescriptionVariant1: No description data available');
      setMarkdownContent('Nu există descriere disponibilă.');
    }
  }, [descriptionPath]);

  const remainingChars = DESCRIPTION_CHAR_LIMIT - markdownContent.length;

  // Show loading state
  if (descriptionLoading || coordinatesLoading) {
    return (
      <div className={styles.descriptionMap}>
        <div className={styles.description}>
          <div className={styles.servicesDescription}>
            <div className={styles.membershipCardContainer}>
              <div className={styles.businessDescription}>
                <p>Se încarcă descrierea...</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.map}>
          <LocationMap position={coordinates} />
        </div>
      </div>
    );
  }

  // Show error state
  if (descriptionError || coordinatesError) {
    return (
      <div className={styles.descriptionMap}>
        <div className={styles.description}>
          <div className={styles.servicesDescription}>
            <div className={styles.membershipCardContainer}>
              <div className={styles.businessDescription}>
                <p>Eroare la încărcarea descrierii: {descriptionError || coordinatesError}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.map}>
          <LocationMap position={coordinates} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.descriptionMap}>
      <div className={styles.description}>
        <div className={styles.servicesDescription}>
          <div className={styles.membershipCardContainer}>
            <div className={styles.businessDescription}>
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
              <div className={styles.charCount}>
                {remainingChars} caractere rămase
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <LocationMap position={coordinates} />
      </div>
    </div>
  );
};

export default DescriptionVariant1; 