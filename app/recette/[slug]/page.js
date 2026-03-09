import { notFound } from 'next/navigation';
import recipesData from '@/data/recipes.json';
import Image from 'next/image';
import styles from './page.module.css';
import Head from 'next/head';
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
                    <h2 className={styles.subTitle}>Appareil</h2>
                    <p className={styles.description}>{recette.appliance}</p>
                  </section>
                  <section className={styles.ustensilsSection}>
                    <h2 className={styles.subTitle}>Ustensiles</h2>
                    <p className={styles.description}>{recette.ustensils.join(', ')}</p>
                  </section>

                  {/* Colonne de droite : Instructions */}
                  <section className={styles.recipeSection}>
                    <h2 className={styles.subTitle}>Recette</h2>
                    <div className={styles.description}>
                        <div className={styles.instructionList}>
                            {recette.description.split('. ').map((etape, index) => {
                            if (!etape.trim()) return null;

                            // On découpe l'étape en sous-parties via les virgules
                            const sousEtapes = etape.split(', ');

                            return (
                                <div key={index} className={styles.instructionItem}>
                                {/* Le numéro de l'étape principale (1. 2. 3.) */}
                                <span className={styles.stepNumber}>{index + 1}.</span>
                                
                                <div className={styles.stepContent}>
                                    {sousEtapes.map((sousEtape, subIndex) => (
                                    <p key={subIndex} className={styles.subStepText}>
                                        {/* On remet la majuscule au début de chaque ligne si besoin */}
                                        {sousEtape.charAt(0).toUpperCase() + sousEtape.slice(1)}
                                        {/* On rajoute le point final uniquement sur la toute dernière sous-étape */}
                                        {subIndex === sousEtapes.length - 1 ? '.' : ''}
                                    </p>
                                    ))}
                                </div>
                                </div>
                            );
                            })}
                        </div>
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
