 'use client';

import React from 'react';

type ContactWindowProps = {
  windowId?: string;
};

const ContactWindow: React.FC<ContactWindowProps> = (_props) => (
  <div className="p-6 space-y-8 text-lg">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold mb-2">📧 Contact</h1>
    </div>
    <section>
      <h2 className="font-bold text-base mb-1">Contact Info</h2>
      <ul className="space-y-2">
        <li><b>Email:</b> <a href="mailto:quanadoan@gmail.com" className="underline text-blue-700">quanadoan@gmail.com</a></li>
      </ul>
    </section>
    <section>
      <h2 className="font-bold text-base mb-1 mt-4">Links</h2>
      <ul className="space-y-2">
        <li><a href="https://www.linkedin.com/in/quanadoan/" target="_blank" className="underline text-blue-700">LinkedIn</a></li>
        <li><a href="https://github.com/quandoan-cs" target="_blank" className="underline text-blue-700">GitHub</a></li>
        <li><a href="https://gitlab.oit.duke.edu/qad" target="_blank" className="underline text-blue-700">GitLab</a></li>
      </ul>
    </section>
  </div>
);

export default ContactWindow;

