 'use client';

import React from 'react';

type AboutWindowProps = {
  windowId?: string;
};

const AboutWindow: React.FC<AboutWindowProps> = (_props) => (
  <div className="p-8 text-xl leading-relaxed">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold mb-3">About Me</h1>
    </div>

    <h2 className="font-extrabold text-2xl mb-3 mt-8">Bio</h2>
    <p>
      Hi! I’m Quan, an IT professional based in North Carolina. 
      I graduated from Duke University with a degree in Computer Science. 
      I enjoy building with AI tools, learning new technologies, and exploring creative ways to solve problems through automation.
    </p>
    

    <h2 className="font-extrabold text-2xl mb-3 mt-8">Why Windows XP?</h2>
    <p> 
      Nostalgia and where it all started. 
      I grew up playing on the family computer running Windows XP, spending many hours on <i>Super Mario Bros.</i>, <i>Road Rash</i>, and <i>Feeding Frenzy</i> (both 1 and 2!). 
      Those early experiences sparked my curiosity for technology and computers, a world I still enjoy exploring today.
    </p>
  </div>
);

export default AboutWindow;
