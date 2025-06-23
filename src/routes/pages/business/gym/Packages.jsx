import React from 'react';
import usePackagesStore from '../../../../store/packages/packagesStore';
import styles from './Packages.module.css';
import PackageCard from '../../../../components/Packages/PackageCard';

const Packages = () => {
  const packages = usePackagesStore(state => state.getAllPackages());

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