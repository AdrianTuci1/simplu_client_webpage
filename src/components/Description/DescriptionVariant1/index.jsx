import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import LocationMap from '../LocationMap/LocationMap';
import { useDescriptionData } from '../../../utils/componentHelpers';
import { DESCRIPTION_CHAR_LIMIT } from '../constants';
import styles from './DescriptionVariant1.module.css';


const DescriptionVariant1 = () => {
  // Use the new homepage data system
  const { data: descriptionData, loading, error } = useDescriptionData();
  
  // Debug logging
  console.log('DescriptionVariant1: descriptionData:', descriptionData);
  console.log('DescriptionVariant1: loading:', loading);
  console.log('DescriptionVariant1: error:', error);
  
  // State for markdown content
  const [markdownContent, setMarkdownContent] = useState('');

  // Load markdown file when description path changes
  useEffect(() => {
    const descriptionPath = descriptionData?.description;
    
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
  }, [descriptionData?.description]);

  const remainingChars = DESCRIPTION_CHAR_LIMIT - markdownContent.length;

  // Show loading state
  if (loading) {
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
          <LocationMap position={descriptionData?.coordinates} />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.descriptionMap}>
        <div className={styles.description}>
          <div className={styles.servicesDescription}>
            <div className={styles.membershipCardContainer}>
              <div className={styles.businessDescription}>
                <p>Eroare la încărcarea descrierii: {error}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.map}>
          <LocationMap position={descriptionData?.coordinates} />
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
        <LocationMap position={descriptionData?.coordinates} />
      </div>
    </div>
  );
};

export default DescriptionVariant1; 