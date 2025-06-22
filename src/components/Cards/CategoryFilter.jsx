import React from 'react';
import styles from './CategoryFilter.module.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterTitle}>
        <h3>Filter by Category</h3>
      </div>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${!selectedCategory ? styles.active : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 