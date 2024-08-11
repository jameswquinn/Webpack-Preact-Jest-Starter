import { h } from 'preact';
import Image from './components/Image';
import exampleImage from '../public/example.png';

function MyComponent() {
  return (
    <div>
      <h1>My Component</h1>
      <Image src={exampleImage} alt="Example" />
    </div>
  );
}

export default MyComponent;
