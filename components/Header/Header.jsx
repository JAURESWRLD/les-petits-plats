'use client'; // Obligatoire pour utiliser usePathname
import Image from 'next/image';
import styles from './Header.module.css'; 
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header({ onSearch }) {
  const pathname = usePathname();
  
  // Logique : si on est sur une route qui commence par /recette, on est en "small"
  const isRecipePage = pathname.startsWith('/recette');
  const headerClass = isRecipePage ? styles.headerSmall : styles.headerLarge;
  return (
    <header className={headerClass}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <Link href="/" aria-label="Accueil - Les Petits Plats">
          <Image 
            src="/logo.png" 
            alt="Les Petits Plats" 
            width={200} 
            height={30} 
            priority 
          />
        </Link>
      </div>
      { !isRecipePage && (
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses
          </h1>
        {/* Search Bar Container */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Rechercher une recette, un ingrédient..."
              className={styles.searchInput}
              onChange={(e) => onSearch(e.target.value)} 
            />
            <button className={styles.searchButton} aria-label="Rechercher">
              {/* Magnifying Glass Icon */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>          
        </div>
      )}

    </header>
  );
}
