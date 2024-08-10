import { h } from 'preact';

function Image({ src, alt, className }) {
  return (
    <picture>
      <source type="image/webp" srcSet={src.srcSet} sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px" />
      <img 
        src={src.fallbackSrc} 
        srcSet={src.fallbackSrcSet}
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
        alt={alt}
        className={className}
        style={src.isTransparent ? { backgroundColor: 'transparent' } : {}}
      />
    </picture>
  );
}

export default Image;
