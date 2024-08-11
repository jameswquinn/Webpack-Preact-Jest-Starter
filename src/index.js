import { h, render } from 'preact';
import App from './App';
import './styles.css';

render(<App />, document.body);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
