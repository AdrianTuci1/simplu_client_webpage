import React from 'react';
import MedicCard from '../../../../components/Cards/MedicCard';
import { medics } from '../../../../data/apiDataClinic';
import styles from './Medics.module.css';

const Medics = () => {
  return (
    <div className={styles.medicsPage}>
      <div className={styles.medicsHeader}>
        <h1>Our Medical Team</h1>
        <p>Meet our experienced healthcare professionals dedicated to your well-being</p>
      </div>
      
      <div className={styles.medicsGrid}>
        {medics.medics.map((medic) => (
          <MedicCard key={medic.id} medic={medic} />
        ))}
      </div>
    </div>
  );
};

export default Medics; 