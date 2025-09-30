'use client';

const ContactWindow = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2">📧 Contact</h1>
        <p className="text-sm text-gray-600">Let's get in touch!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-sm mb-2">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">📧</span>
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📱</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span>Your City, Country</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💼</span>
                <span>linkedin.com/in/yourprofile</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🐙</span>
                <span>github.com/yourusername</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm mb-2">Quick Contact</h3>
          <form className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <input 
                type="email" 
                className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Message</label>
              <textarea 
                rows={4}
                className="w-full border border-gray-400 px-2 py-1 text-xs focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Your message here..."
              />
            </div>
            <button type="submit" className="xp-button w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-300">
        <h3 className="font-bold text-sm mb-2">Social Links</h3>
        <div className="flex gap-2">
          <button className="xp-button text-xs">
            LinkedIn
          </button>
          <button className="xp-button text-xs">
            GitHub
          </button>
          <button className="xp-button text-xs">
            Twitter
          </button>
          <button className="xp-button text-xs">
            Email
          </button>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <p className="text-xs text-gray-600">
          I'm always interested in new opportunities and collaborations. 
          Feel free to reach out!
        </p>
      </div>
    </div>
  );
};

export default ContactWindow;

