import { h } from 'preact';

function Image({ src, alt, className }) {
  return (
    <img 
      srcSet={src.srcSet}
      src={src.src}
      sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
      alt={alt}
      className={className}
    />
  );
}

export default Image;
