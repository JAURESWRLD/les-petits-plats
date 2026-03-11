import styles from './Footer.module.css';

export default function Footer({ onSearch, is404 }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <p className={styles.text}>
         Copyright © {currentYear} - Les Petits Plats
        </p>
      </div>
    </footer>
  );
}
