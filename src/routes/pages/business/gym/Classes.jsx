import React from 'react';
import styles from './Classes.module.css';

const Classes = () => {
  // Datele claselor pentru o săptămână
  const weeklyClasses = [
    {
      id: 1,
      title: 'Zumba Fitness',
      price: '25 RON',
      date: 'Luni, 15 Ianuarie',
      time: '18:00 - 19:00',
      image: 'https://www.guardian.in/cdn/shop/articles/benefits-of-zumba.jpg?v=1712652853&width=2048',
      instructor: 'Maria Popescu'
    },
    {
      id: 2,
      title: 'Înot pentru Începători',
      price: '30 RON',
      date: 'Marți, 16 Ianuarie',
      time: '19:00 - 20:00',
      image: 'https://www.metroymcas.org/clientuploads/Blog/Hero_Images/Swimlessons.jpeg',
      instructor: 'Alexandru Ionescu'
    },
    {
      id: 3,
      title: 'Yoga pentru Relaxare',
      price: '20 RON',
      date: 'Miercuri, 17 Ianuarie',
      time: '17:30 - 18:30',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
      instructor: 'Elena Dumitrescu'
    },
    {
      id: 4,
      title: 'Pilates Core',
      price: '28 RON',
      date: 'Joi, 18 Ianuarie',
      time: '18:30 - 19:30',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      instructor: 'Cristina Munteanu'
    },
    {
      id: 5,
      title: 'Spinning Cardio',
      price: '35 RON',
      date: 'Vineri, 19 Ianuarie',
      time: '19:00 - 20:00',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      instructor: 'Mihai Vasilescu'
    },
    {
      id: 6,
      title: 'Kickboxing',
      price: '40 RON',
      date: 'Sâmbătă, 20 Ianuarie',
      time: '10:00 - 11:00',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
      instructor: 'Andrei Popa'
    },
    {
      id: 7,
      title: 'Stretching & Flexibilitate',
      price: '22 RON',
      date: 'Duminică, 21 Ianuarie',
      time: '11:00 - 12:00',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      instructor: 'Laura Stanciu'
    }
  ];

  const handleParticipate = (classId) => {
    console.log(`Participare la clasa cu ID: ${classId}`);
    // Aici se poate adăuga logica pentru înscrierea la clasă
    alert(`Te-ai înscris la clasa cu ID: ${classId}`);
  };

  return (
    <section className={styles.weeklyClassesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Clasele Săptămânii</h2>
        <div className={styles.weeklyClassesList}>
          {weeklyClasses.map((classItem) => (
            <div key={classItem.id} className={styles.weeklyClassCard}>
              <div className={styles.classImageContainer}>
                <img 
                  src={classItem.image} 
                  alt={classItem.title}
                  className={styles.classImage}
                />
              </div>
              <div className={styles.classInfo}>
                <div className={styles.classHeader}>
                  <h3 className={styles.classTitle}>{classItem.title}</h3>
                  <span className={styles.classPrice}>{classItem.price}</span>
                </div>
                <div className={styles.classDetails}>
                  <div className={styles.classDateTime}>
                    <span className={styles.classDate}>{classItem.date}</span>
                    <span className={styles.classTime}>{classItem.time}</span>
                  </div>
                  <div className={styles.classInstructor}>
                    <span>Instructor: {classItem.instructor}</span>
                  </div>
                </div>
                <button 
                  className={styles.participateBtn}
                  onClick={() => handleParticipate(classItem.id)}
                >
                  Participa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes; 