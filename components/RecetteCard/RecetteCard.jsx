import Image from 'next/image';
import styles from './recetteCard.module.css';
import Link from 'next/link';

export default function RecetteCard({ recette }) {
  return (
    <Link href={`/recette/${recette.slug}`}>
      <article className={styles.card}>
        {/* Image avec Badge Temps */}
        <div className={styles.imageContainer}>
          <Image 
            src={`/image/recettes/${recette.image}`} 
            alt={recette.name}
            fill
            className={styles.image}
          />
          <span className={styles.timeBadge}>{recette.time}min</span>
        </div>

        {/* Contenu Texte */}
        <div className={styles.content}>
          <h3 className={styles.title}>{recette.name}</h3>
          
          <div className={styles.section}>
            <h4 className={styles.subTitle}>Recette</h4>
            <p className={styles.description}>{recette.description}</p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subTitle}>Ingrédients</h4>
            <div className={styles.ingredientsGrid}>
              {recette.ingredients.map((ing, index) => (
                <div key={index} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>{ing.ingredient}</span>
                  {ing.quantity && (
                    <span className={styles.ingredientQuantity}>
                      {ing.quantity} {ing.unit || ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
