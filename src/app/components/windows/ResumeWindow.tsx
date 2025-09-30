'use client';

const ResumeWindow = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2">📄 Resume</h1>
        <button className="xp-button">
          Download PDF
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Experience</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm">Software Developer</h4>
                  <p className="text-xs text-gray-600">Company Name</p>
                </div>
                <span className="text-xs text-gray-500">2022 - Present</span>
              </div>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Developed and maintained web applications using React and Node.js</li>
                <li>Collaborated with cross-functional teams to deliver high-quality software</li>
                <li>Implemented responsive designs and optimized application performance</li>
              </ul>
            </div>
            
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm">Junior Developer</h4>
                  <p className="text-xs text-gray-600">Previous Company</p>
                </div>
                <span className="text-xs text-gray-500">2020 - 2022</span>
              </div>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Built user interfaces with modern JavaScript frameworks</li>
                <li>Participated in code reviews and agile development processes</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Technical Skills</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <strong>Frontend:</strong> React, Vue.js, TypeScript, HTML5, CSS3
            </div>
            <div>
              <strong>Backend:</strong> Node.js, Python, Express.js, MongoDB
            </div>
            <div>
              <strong>Tools:</strong> Git, Docker, AWS, VS Code
            </div>
            <div>
              <strong>Other:</strong> Agile, Scrum, REST APIs
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">Education</h3>
          <div className="text-xs">
            <div className="flex justify-between">
              <span>Bachelor of Science in Computer Science</span>
              <span>2020</span>
            </div>
            <p className="text-gray-600">University Name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeWindow;

