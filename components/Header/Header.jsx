'use client'
import Image from 'next/image'
import styles from './Header.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header({ onSearch, is404 }) {

  const pathname = usePathname()
  const isRecipePage = pathname.startsWith('/recette');
  
  // Définition de la classe du header
  let headerClass = styles.headerLarge;

  if (is404) {
    headerClass = styles.headerNotFound;   // priorité 404
  } else if (isRecipePage) {
    headerClass = styles.headerSmall;
  }

  return (
    <header className={headerClass}>
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

      {is404 && <h1 className={styles.errorTitle}>404 :(</h1>}
      {is404 && <h1 className={styles.errorSubTitle}>La page que vous demandez est introuvable.</h1>}


      {!isRecipePage && !is404 && (
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses
          </h1>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Rechercher une recette..."
              className={styles.searchInput}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      )}

    </header>
  )
}