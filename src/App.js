import { h } from 'preact';
import { Button } from './components/Button';

function App() {
  return (
    <div>
      <h1>Hello, Preact!</h1>
      <Button onClick={() => alert('Button clicked!')}>Click me</Button>
    </div>
  );
}

export default App;
