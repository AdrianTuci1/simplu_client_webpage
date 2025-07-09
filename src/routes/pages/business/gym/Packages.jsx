import React from 'react';
import { usePackages } from '../../../../hooks';
import styles from './Packages.module.css';
import PackageCard from '../../../../components/Packages/PackageCard';

const Packages = () => {
  const { data: packages, loading, error } = usePackages({ locationId: 1 });

  // Handle loading state
  if (loading) {
    return (
      <div className={styles.packagesPage}>
        <div className={styles.loading}>Se încarcă pachetele...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={styles.packagesPage}>
        <div className={styles.error}>
          <p>Eroare la încărcarea datelor: {error}</p>
          <button onClick={() => window.location.reload()}>Încearcă din nou</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.packagesPage}>
      <div className={styles.packagesGrid}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default Packages; 