'use client';

const ProjectsWindow = () => (
  <div className="p-6 space-y-8 text-lg">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold mb-2">💻 Projects</h1>
    </div>
    <section>
      <h2 className="font-bold text-base mb-1">Mini Amazon</h2>
      <p>
        Sep 2023 - Dec 2023<br />
        Developed a simulated online marketplace website for a Duke database course, using HTML, Python, Flask, SQL, and MongoDB.
      </p>
      <ul className="list-disc ml-6">
        <li>Managed users, sellers, inventory, products, carts, orders, and feedback.</li>
        <li>Implemented back-end functionality for database and front-end integration.</li>
        <li>Created register/login features, account management, and purchase history.</li>
      </ul>
    </section>
  </div>
);

export default ProjectsWindow;

