'use client';

const AboutWindow = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <div className="text-6xl mb-4">👨‍💻</div>
        <h1 className="text-2xl font-bold mb-2">About Me</h1>
        <p className="text-sm text-gray-600">Your Name Here</p>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-sm mb-1">Professional Summary</h3>
          <p className="text-sm leading-relaxed">
            I am a passionate software developer with expertise in modern web technologies. 
            I love creating innovative solutions and bringing ideas to life through code.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Git'].map((skill) => (
              <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-1">Education</h3>
          <p className="text-sm">
            Bachelor of Science in Computer Science<br />
            University Name, Year
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-1">Interests</h3>
          <p className="text-sm">
            Web Development, Open Source, Photography, Gaming, Reading
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;

