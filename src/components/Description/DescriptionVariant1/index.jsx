import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import LocationMap from '../LocationMap/LocationMap';
import { useDescriptionStoreFromCentralized } from '../../../store';
import { useCurrentBusinessData } from '../../../hooks/index.js';
import { DESCRIPTION_CHAR_LIMIT } from '../../../constants';
import styles from './DescriptionVariant1.module.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaGlobe } from 'react-icons/fa';

const DescriptionVariant1 = () => {
  // Use the description-specific store hook
  const { 
    description, 
    location, 
    ui, 
    loadDescriptionData, 
    setLoading, 
    setError 
  } = useDescriptionStoreFromCentralized();

  // Use the hook for data fetching
  const { data, loading, error } = useCurrentBusinessData();
  
  // State for markdown content
  const [markdownContent, setMarkdownContent] = useState('');

  // Load markdown file when data changes
  useEffect(() => {
    if (data && data.homeData && data.homeData.locationData) {
      const markdownPath = data.homeData.locationData.description;
      
      if (markdownPath && (markdownPath.startsWith('./') || markdownPath.startsWith('http://') || markdownPath.startsWith('https://'))) {
        // Load markdown file from path or URL
        fetch(markdownPath)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to load markdown file: ${response.status}`);
            }
            return response.text();
          })
          .then(text => setMarkdownContent(text))
          .catch(error => {
            console.error('Error loading markdown file:', error);
            setMarkdownContent(description || '');
          });
      } else {
        // Fallback to description text
        setMarkdownContent(description || '');
      }
    } else {
      setMarkdownContent(description || '');
    }
  }, [data, description]);

  const remainingChars = DESCRIPTION_CHAR_LIMIT - markdownContent.length;

  // Load business data when component mounts
  useEffect(() => {
    loadDescriptionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle loading state
  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  // Handle error state
  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error, setError]);

  // Show loading state
  if (ui.isLoading) {
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
          <LocationMap position={location} />
        </div>
      </div>
    );
  }

  // Show error state
  if (ui.error) {
    return (
      <div className={styles.descriptionMap}>
        <div className={styles.description}>
          <div className={styles.servicesDescription}>
            <div className={styles.membershipCardContainer}>
              <div className={styles.businessDescription}>
                <p>Eroare la încărcarea descrierii: {ui.error}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.map}>
          <LocationMap position={location} />
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
        <LocationMap position={location} />
      </div>
    </div>
  );
};

export default DescriptionVariant1; 