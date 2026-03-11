import { notFound } from 'next/navigation';
import recipesData from '@/data/recipes.json';
import Image from 'next/image';
import styles from './page.module.css';
import Header from '@/components/Header/Header';

export default async function RecettePage({ params }) {
  const { slug } = await params;

  const recette = recipesData.find((r) => r.slug === slug);

  if (!recette) {
    notFound();
  }

  return (
    <>
      <Header />
        <div className={styles.mainWrapper}>
          
          <main className={styles.container}>
            <div className={styles.cardDetail}>
              {/* Section Image avec ton chemin spécifique */}
              <div className={styles.heroImage}>
                <Image 
                  src={`/image/recettes/${recette.image}`} 
                  alt={recette.name} 
                  fill 
                  className={styles.image}
                  priority
                />
              </div>

              <div className={styles.content}>
                <h1 className={styles.title}>{recette.name}</h1>

                <div className={styles.grid}>
                    <section>
                        <h2 className={styles.subTitle}>Temps de préparation</h2>
                        <span className={styles.timeBadge}>{recette.time} min</span>
                    </section>
                  {/* Colonne de gauche : Ingrédients */}
                  <section className={styles.ingredientsSection}>
                    <h2 className={styles.subTitle}>Ingrédients</h2>
                    <div className={styles.ingredientsList}>
                      {recette.ingredients.map((ing, index) => (
                        <div key={index} className={styles.ingredientItem}>
                          <span className={styles.ingName}>{ing.ingredient}</span>
                          <span className={styles.ingQty}>
                            {ing.quantity} {ing.unit || ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className={styles.applianceSection}>
                    <h2 className={styles.subTitle}>Appareil nécessaire</h2>
                    <p className={styles.description}>{recette.appliance}</p>
                  </section>
                  <section className={styles.ustensilsSection}>
                    <h2 className={styles.subTitle}>Ustensiles nécessaires</h2>
                    <p className={styles.description}>{recette.ustensils.join(', ')}</p>
                  </section>

                  {/* Instructions */}
                  <section className={styles.recipeSection}>
                    <h2 className={styles.subTitle}>Recette</h2>

                    <div className={styles.instructionList}>
                      {recette.description.split('.').map((etape, index) => {
                        const phrase = etape.trim();
                        if (!phrase) return null;

                        const sousEtapes = phrase
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);

                        return (
                          <div key={index} className={styles.instructionItem}>
                            
                            {/* Titre de l'étape */}
                            <h3 className={styles.stepTitle}>
                              {index + 1}. Étape {index + 1} :
                            </h3>

                            {/* Liste des actions */}
                            <ul className={styles.stepList}>
                              {sousEtapes.map((sousEtape, subIndex) => (
                                <li key={subIndex}>
                                  {sousEtape.charAt(0).toUpperCase() + sousEtape.slice(1)}
                                </li>
                              ))}
                            </ul>

                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
  );
}
