import React from 'react';
import MedicCard from '../../../../components/Cards/MedicCard';
import { medics } from '../../../../data/apiDataClinic';
import styles from './Medics.module.css';

const Medics = () => {
  return (
    <div className={styles.medicsPage}>
      
      <div className={styles.medicsGrid}>
        {medics.medics.map((medic) => (
          <MedicCard key={medic.id} medic={medic} />
        ))}
      </div>
    </div>
  );
};

export default Medics; 