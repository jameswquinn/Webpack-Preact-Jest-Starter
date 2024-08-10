import { h } from 'preact';
import styles from './Button.css';

export function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
