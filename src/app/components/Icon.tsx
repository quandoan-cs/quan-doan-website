"use client";

import React from 'react';

type IconProps = {
  name: string; // base name without extension, located in /images/icons
  size?: number;
  alt?: string;
  className?: string;
};

export default function Icon({ name, size = 20, alt = '', className = '' }: IconProps) {
  // Try multiple locations: primary icons folder, then start-menu folder.
  const candidates = [
    `/images/icons/${name}.svg`,
    `/images/start-menu/${name}.svg`,
    `/images/icons/${name}.png`,
    `/images/start-menu/${name}.png`,
  ];

  // Provide @2x srcset entries (browser will ignore missing files, onError will handle next candidate)
  const srcSet = `/images/icons/${name}@2x.png 2x, /images/start-menu/${name}@2x.png 2x`;

  // We'll cycle through candidates on error
  const idxRef = React.useRef(0);
  const [src, setSrc] = React.useState(() => candidates[0]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget as HTMLImageElement;
    idxRef.current += 1;
    if (idxRef.current < candidates.length) {
      setSrc(candidates[idxRef.current]);
    } else {
      // nothing left; keep current src so browser shows broken image icon, but avoid infinite loop
    }
  };

  return (
    <img
      src={src}
      srcSet={srcSet}
      width={size}
      height={size}
      alt={alt || name}
      className={className}
      onError={handleError}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
}
