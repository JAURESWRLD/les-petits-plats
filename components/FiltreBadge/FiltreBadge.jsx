import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './filtreBadge.module.css';

export default function FiltreBadge({ label, onRemove }) {
  return (
    <div className={styles.badge}>
      {/* On capitalise la première lettre pour l'esthétique */}
      <span className={styles.label}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
      
      <button 
        className={styles.closeBtn} 
        onClick={onRemove} 
        aria-label={`Supprimer le filtre ${label}`}
      >
        <FontAwesomeIcon icon={faXmark} className={styles.icon} />
      </button>
    </div>
  );
}
