 'use client';

import React from 'react';

type AboutWindowProps = {
  windowId?: string;
};

const AboutWindow: React.FC<AboutWindowProps> = (_props) => (
  <div className="p-8 text-xl leading-relaxed">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold mb-3">👤 About Me</h1>
    </div>

    <h2 className="font-extrabold text-2xl mb-3 mt-8">Bio</h2>
    <p>
      Hi! I’m Quan Doan, a software developer based in North Carolina. 
      I graduated from Duke University with a degree in Computer Science. 
      I love building with AI tools, learning new technologies, and exploring creative ways to solve problems.
    </p>

  <div className="xp-sep my-6" />

    <h2 className="font-extrabold text-2xl mb-3 mt-8">Why Windows XP?</h2>
    <p>
      My computer journey started with Windows XP. Its classic look and feel inspired 
      my love for technology and design. I chose Windows XP for my portfolio because it’s nostalgic, 
      fun, and represents my roots as a developer.
    </p>
  </div>
);

export default AboutWindow;
