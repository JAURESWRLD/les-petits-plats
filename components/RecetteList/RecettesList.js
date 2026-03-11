import RecetteCard from '../RecetteCard/RecetteCard';
import styles from './RecettesList.module.css'


export default function RecettesList({ recettes = [] }) {
  // Cas où aucun filtre ne correspond
  if (recettes.length === 0) {
    return (
      <div className={styles.noResult}>
        <p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
      </div>
    );
  }

  return (
    <section className={styles.gridContainer}>
      <div className={styles.grid}>
        {recettes.map((recette) => (
          <RecetteCard key={recette.id} recette={recette} />
        ))}
      </div>
    </section>
  );
}
