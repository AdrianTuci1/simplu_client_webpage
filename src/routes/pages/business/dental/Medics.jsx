import React, { useState, useEffect } from 'react';
import { getMedics } from '../../../../api';
import MedicCard from '../../../../components/Cards/MedicCard';
import styles from './Medics.module.css';

const Medics = () => {
  const [medicsData, setMedicsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          tenantId: import.meta.env.VITE_TENANT_ID || 'demo-tenant',
          locationId: 1 // Default location, can be made configurable
        };
        
        const data = await getMedics(params);
        setMedicsData(data);
      } catch (err) {
        console.error('Error fetching medics data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedics();
  }, []);

  if (loading) {
    return (
      <div className={styles.medicsPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>Loading medics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.medicsPage}>
        <div className={styles.errorContainer}>
          <h2>Error loading medics</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.medicsPage}>
      <div className={styles.medicsGrid}>
        {medicsData?.medics?.map((medic) => (
          <MedicCard key={medic.id} medic={medic} />
        ))}
      </div>
    </div>
  );
};

export default Medics; 