"use client";

import React, { useState, useEffect } from 'react';

type ResumeWindowProps = {
  windowId?: string;
};

const ResumeWindow: React.FC<ResumeWindowProps> = (_props) => {
  const [cols, setCols] = useState<number>(1);

  useEffect(() => {
    const update = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
      setCols(w >= 1000 ? 2 : (w >= 700 ? 2 : 1));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="p-3 xp-resume-root" style={{ maxHeight: 'calc(100vh - 80px)', overflow: 'auto', fontSize: 12 }}>
      <div className="text-center mb-2">
        <h1 className="font-extrabold mb-1" style={{ fontSize: 18, margin: 0 }}>Quan Doan</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols === 2 ? '1fr 1fr' : '1fr', gap: 16 }}>
        <div>
          {/* Left column: Experience (first) */}
          <section>
            <h2 className="font-extrabold mb-1" style={{ fontSize: 14 }}>Experience</h2>

            <div style={{ marginBottom: 6 }}>
              <b>IT Administrator — GCM Medical & OEM, Inc.</b><br />
              <small>May 2025 – Present, Wilmington, NC</small>
              <ul className="list-none ml-0" style={{ marginTop: 6, paddingLeft: 0 }}>
                <li style={{ marginBottom: 4 }}>Manage <b>IT operations</b> for 350+ users across multiple sites.</li>
                <li style={{ marginBottom: 4 }}>Built automation app using Python, SQL, JavaScript to cut lookup time by <b>75%</b>.</li>
                <li style={{ marginBottom: 4 }}>Deploy/maintain hardware/software/networking and provide support.</li>
              </ul>
            </div>

            <div style={{ marginBottom: 6 }}>
              <b>Software Engineer Intern — Duke Code+ Program</b><br />
              <small>May 2022 – Aug 2022, Durham, NC</small>
              <ul className="list-none ml-0" style={{ marginTop: 6, paddingLeft: 0 }}>
                <li style={{ marginBottom: 4 }}>Developed <b>NLP algorithm</b> to improve processing of 4,500+ grant proposals for Duke OR&I.</li>
                <li style={{ marginBottom: 4 }}>Optimized workflows, reducing parsing time by <b>93%</b>.</li>
                <li style={{ marginBottom: 4 }}>Packaged algorithm into <b>web app</b> for document matching and summary.</li>
              </ul>
            </div>
          </section>
        </div>

        <div style={{ borderLeft: cols === 2 ? '1px solid #c8c8c8' : 'none', paddingLeft: cols === 2 ? 16 : 0 }}>
          {/* Right column: Education + Skills + Leadership */}
          <section>
            <h2 className="font-extrabold mb-1" style={{ fontSize: 14 }}>Education</h2>
            <p style={{ marginBottom: 6 }}>
              <b>B.A. in Computer Science — Duke University</b><br />
              <small>Aug 2020 – May 2024, Durham, NC</small>
            </p>
            <p style={{ marginBottom: 8 }}>
              <b>Relevant Coursework:</b> Algorithms, Data Structures, Computer Systems, Database Systems, Discrete Math, Regression Analysis, Multivariable Calculus
            </p>
          </section>

          <section>
            <h2 className="font-extrabold mb-1" style={{ fontSize: 14 }}>Skills</h2>
            <p style={{ marginBottom: 8 }}>
              <b>Languages & Tools:</b> Python, JavaScript, R, SQL, Pandas, VBA, Flask, MongoDB, Markdown, Git/GitLab<br />
              <b>Technologies:</b> Visual Studio Code, Microsoft Azure, Windows 10/11, Active Directory, Microsoft 365, Office<br />
              <b>AI Tools:</b> CoPilot, ChatGPT
            </p>
          </section>

          <section>
            <h2 className="font-extrabold mb-1" style={{ fontSize: 14 }}>Leadership & Activities</h2>
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontWeight: 'bold' }}>Siren Music Community — President</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>Aug 2021 – May 2024 — Coordinated meetings, events, mentored members, managed budget.</div>
            </div>

            <div>
              <b>LangDorm (Duke Living Group)</b>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeWindow;
