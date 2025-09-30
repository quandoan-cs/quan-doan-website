'use client';

const ProjectsWindow = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      status: "In Progress",
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts",
      tech: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js and Tailwind CSS",
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      status: "Completed",
      link: "#"
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2">💻 Projects</h1>
        <p className="text-sm text-gray-600">A showcase of my recent work</p>
      </div>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-300 p-3 bg-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm">{project.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                project.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {project.tech.map((tech) => (
                <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button className="xp-button text-xs">
                View Live
              </button>
              <button className="xp-button text-xs">
                Source Code
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4 border-t border-gray-300">
        <p className="text-xs text-gray-600 mb-2">
          Want to see more? Check out my GitHub profile!
        </p>
        <button className="xp-button">
          View All Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectsWindow;

