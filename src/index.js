import { h, render } from 'preact';
import App from './App';

// Remove this line if you don't have a styles.css file
// import './styles.css';

render(<App />, document.body);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
