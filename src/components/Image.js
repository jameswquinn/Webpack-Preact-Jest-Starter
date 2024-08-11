import { h } from 'preact';

function Image({ src, alt, className }) {
  return (
    <img 
      srcSet={`${src.srcSet}`}
      src={src.fallbackSrc}
      alt={alt}
      className={className}
    />
  );
}

export default Image;
