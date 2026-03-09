'use client';
import Dropdown from '../Dropdown/Dropdown';
import FiltreBadge from '../FiltreBadge/FiltreBadge';
import styles from './Filtres.module.css';

export default function Filtres({ 
  recipesCount = 0, 
  ingredients = [], 
  appareils = [], 
  ustensiles = [],
  selectedTags = [],
  tagCategories = {},
  onSelectTag,
  onRemoveTag
}) {

  // affiche les badges sélectionnés pour une catégorie donnée
  const renderColumnBadges = (categoryName) => {
    return selectedTags
      .filter(tag => tagCategories[tag] === categoryName)
      .map(tag => (
        <FiltreBadge 
          key={tag} 
          label={tag} 
          onRemove={() => onRemoveTag(tag)} 
        />
      ));
  };

  return (
    <section className={styles.filtresSection} aria-label="Zone de filtrage">
      <div className={styles.mainGrid}>
        
        {/* COLONNE INGRÉDIENTS */}
        <div className={styles.column}>
          <Dropdown titre="Ingrédients" options={ingredients} onSelect={(opt) => onSelectTag(opt, 'ingredients')} />
          <div className={styles.badgeArea}>
            {renderColumnBadges('ingredients')}
          </div>
        </div>

        {/* COLONNE APPAREILS */}
        <div className={styles.column}>
          <Dropdown titre="Appareils" options={appareils} onSelect={(opt) => onSelectTag(opt, 'appliances')} />
          <div className={styles.badgeArea}>
            {renderColumnBadges('appliances')}
          </div>
        </div>

        {/* COLONNE USTENSILES */}
        <div className={styles.column}>
          <Dropdown titre="Ustensiles" options={ustensiles} onSelect={(opt) => onSelectTag(opt, 'ustensils')} />
          <div className={styles.badgeArea}>
            {renderColumnBadges('ustensils')}
          </div>
        </div>

        <div className={styles.counterWrapper}>
          <p className={styles.counter}>
            {recipesCount} {recipesCount > 1 ? 'recettes' : 'recette'}
          </p>
        </div>

      </div>
    </section>
  );
}
