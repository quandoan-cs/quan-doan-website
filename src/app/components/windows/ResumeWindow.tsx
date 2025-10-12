'use client';

const ResumeWindow = () => (
  <div className="p-8 space-y-10 text-lg xp-window">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold mb-3">📄 Resume</h1>
      <a href="/QuanDoan_Resume.pdf" className="xp-button" download>
        Download PDF
      </a>
    </div>

    {/* Education */}
    <section>
      <h2 className="font-extrabold text-2xl mb-2">Education</h2>
      <p>
        <b>Duke University</b> — <b>B.A. in Computer Science</b><br />
        Aug 2020 – May 2024, Durham, NC
      </p>
      <p>
        <b>Relevant Coursework:</b> Algorithms, Data Structures, Computer Systems, 
        Database Systems, Discrete Math, Regression Analysis, Multivariable Calculus, Data Science
      </p>
    </section>

    {/* Skills */}
    <section>
      <h2 className="font-extrabold text-2xl mb-2 mt-6">Skills</h2>
      <p>
        <b>Languages & Tools:</b> Python, JavaScript, R, SQL, Pandas, VBA, Flask, MongoDB, Markdown, Git/GitLab<br />
        <b>Technologies:</b> Visual Studio Code, Microsoft Azure, Windows 10/11, Active Directory, Microsoft 365, Office<br />
        <b>AI Tools:</b> CoPilot, ChatGPT
      </p>
    </section>

    {/* Experience */}
    <section>
      <h2 className="font-extrabold text-2xl mb-2 mt-6">Experience</h2>

      <b>GCM Medical & OEM, Inc. — IT Administrator</b><br />
      May 2025 – Present, Wilmington, NC
      <ul className="list-disc ml-6">
        <li>Manage <b>IT operations</b> for 350+ users across multiple sites, partnering with CIO, IT staff, and MSP.</li>
        <li>Built <b>automation app</b> using Python, SQL, JavaScript, Epicor APIs to cut lookup time by <b>75%</b>.</li>
        <li>Streamline <b>operations</b>, deploy/maintain hardware/software/networking, provide support, document solutions.</li>
      </ul>

      <b>Duke University Code+ Program — Software Engineer Intern</b><br />
      May 2022 – Aug 2022, Durham, NC
      <ul className="list-disc ml-6">
        <li>Developed <b>NLP algorithm</b> to improve processing of 4,500+ grant proposals for Duke OR&I.</li>
        <li><b>Optimized workflows</b>, reducing parsing time by <b>93%</b>.</li>
        <li>Packaged algorithm into <b>web app</b> for document matching and summary.</li>
        <li>Consulted with <b>project sponsors</b> and stakeholders.</li>
      </ul>
    </section>

    {/* Leadership & Activities */}
    <section>
      <h2 className="font-extrabold text-2xl mb-2 mt-6">Leadership & Activities</h2>

      <b>Siren Music Community — President</b><br />
      Aug 2021 – May 2024, Durham, NC
      <ul className="list-disc ml-6">
        <li><b>Coordinated</b> meetings, events, and playlist sessions.</li>
        <li><b>Mentored</b> members in music production projects.</li>
        <li><b>Managed</b> organization’s budget and spending.</li>
      </ul>

      <b>LangDorm (Duke Living Group)</b>
    </section>
  </div>
);

export default ResumeWindow;
