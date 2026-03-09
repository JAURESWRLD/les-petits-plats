'use client';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './dropdown.module.css';

export default function Dropdown({ titre, options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // État pour la recherche interne
  const dropdownRef = useRef(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filtrer la liste d'options selon la saisie de l'utilisateur
  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {/* Bouton principal du Dropdown */}
      <button 
        className={`${styles.button} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{titre}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} 
        />
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div className={styles.menuWrapper}>
          {/* Barre de recherche interne au Dropdown */}
          <div className={styles.searchBox}>
            <input 
              type="text" 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <FontAwesomeIcon 
              icon={searchTerm ? faXmark : faMagnifyingGlass} 
              className={styles.searchIcon}
              onClick={() => setSearchTerm('')} 
            />
          </div>

          {/* Liste des tags disponibles */}
          <ul className={styles.list}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, i) => (
                <li 
                  key={i} 
                  className={styles.item}
                  onClick={() => {
                    onSelect(opt); // Action : envoie le tag vers page.js
                    setIsOpen(false);
                    setSearchTerm(''); // Reset la recherche locale
                  }}
                >
                  {capitalize(opt)}
                </li>
              ))
            ) : (
              <li className={styles.noResult}>Aucun résultat</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
