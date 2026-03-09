// app/not-found.js
import Link from 'next/link';
import Header from '@/components/Header/Header';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      {/* On réutilise le Header en mode 'small' (juste le logo) */}
      <Header variant="small" />

      <main className={styles.main}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Oups ! Page introuvable</h2>
        <p className={styles.description}>
          La recette ou la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link href="/" className={styles.homeBtn}>
          Retourner à l'accueil
        </Link>
      </main>
    </div>
  );
}
