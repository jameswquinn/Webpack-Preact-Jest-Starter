import { h } from 'preact';
import Image from './components/Image';
import exampleImage from '../assets/example.png';

function App() {
  return (
    <div>
      <h1>Hello, Preact!</h1>
      <Image src={exampleImage} alt="Example" />
    </div>
  );
}

export default App;
