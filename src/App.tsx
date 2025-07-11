import { useEffect, useState } from 'react';
import { ArrowRight, Code2, Sparkles, Users2, Linkedin, Mail, ChevronDown, X, Menu } from 'lucide-react';

function App() {

  const [scrolled, setScrolled] = useState(false); // NEW
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(prev => ({ ...prev, [index]: isInView }));
      });
      setScrolled(window.scrollY > 30); // NEW
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    resume: File | null;
    position: string;
  }>({
    username: '',
    email: '',
    resume: null,
    position: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form and close modal
    setFormData({ username: '', email: '', resume: null, position: '' });
    setShowCareerForm(false);
  };

  const positions = [
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'UI/UX Designer',
    'LinkedIn Marketing Specialist'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg transition-transform duration-500 md:hidden"
          style={{
            animation: 'slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={() => setShowMobileMenu(false)}
        >
          <nav className="flex flex-col gap-10 items-center w-full">
            <a
              href="#about"
              className="text-2xl text-slate-100 font-medium hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(false);
              }}
            >
              About
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCareerForm(true);
                setShowMobileMenu(false);
              }}
              className="text-2xl text-slate-100 font-medium hover:text-blue-400 transition-colors"
            >
              Careers
            </button>
            <a
              href="https://www.linkedin.com/company/6origin/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-2xl text-slate-100 font-medium hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(false);
              }}
            >
              <Linkedin className="w-6 h-6" />
              LinkedIn
            </a>
          </nav>
        </div>
      )}
      {/* Navigation */}
      <nav
        className={`
          fixed z-50 transition-all duration-500 ease-in-out
          border-b border-slate-800/50
          left-1/2 -translate-x-1/2
          ${scrolled
            ? 'w-4/5 mt-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg'
            : 'w-full mt-0 rounded-none bg-transparent'}
        `}
        style={{
          top: scrolled ? '0.5rem' : '0',
        }}
      >

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQHgs91NBr3saA/company-logo_100_100/B4DZfuIyDWH4AQ-/0/1752046974096?e=1757548800&v=beta&t=WBKO_ivs11PA5e5hDUacjG4xt2NGTzP4HxqJH0_SUEM" 
              alt="6Origin" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-light tracking-wide">6Origin</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a>
            <button 
              onClick={() => setShowCareerForm(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Careers
            </button>
            <a 
              href="https://www.linkedin.com/company/6origin/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors flex items-center space-x-1"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
          {/* Hamburger menu for mobile - toggles with X in the same spot */}
          <button
            className="md:hidden ml-4 text-slate-400 hover:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setShowMobileMenu((open) => !open)}
            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Career Form Modal */}
      {showCareerForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCareerForm(false)} />
          <div className="relative bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
            <button 
              onClick={() => setShowCareerForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-light mb-6 text-center">Join Our Team</h3>
            <div className="mb-4">
              <p className="text-slate-300 text-center mb-2">We are having the following positions:</p>
              <ul className="list-disc list-inside text-slate-200 mb-4">
                {positions.map((position, index) => (
                  <li key={index}>{position}</li>
                ))}
              </ul>
              <p className="text-slate-400 text-center mb-4">Please send your resume or application to:</p>
              <a
                href="mailto:careers@6origin.com?subject=Job Application for 6Origin&body=Please attach your resume and mention the position you are applying for."
                className="block text-blue-400 text-center underline hover:text-blue-300 mb-2"
              >
                6originlabs@google.com
              </a>
              <p className="text-xs text-slate-500 text-center">(Click the email above to apply directly)</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-extralight mb-6 leading-none">
              Creating
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent font-light">
                innovative
              </span>
              <span className="block text-slate-300">solutions</span>
            </h1>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              for your success.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="https://www.linkedin.com/company/6origin/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect with Us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => setShowCareerForm(true)}
              className="px-8 py-3 border border-slate-600 rounded-full text-sm font-medium hover:border-slate-400 transition-colors"
            >
              Join Our Team
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            data-animate
            className={`transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-slate-200">
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">6Origin</span>
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
              We are a cloud-based software startup dedicated to building innovative digital solutions that solve modern problems and revolutionize the way people work, learn, and connect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {[
              { icon: Sparkles, title: "Innovation", desc: "Cutting-edge solutions for tomorrow" },
              { icon: Code2, title: "Cloud-Native", desc: "Scalable, secure, and accessible" },
              { icon: Users2, title: "Community", desc: "Built together, for everyone" }
            ].map((item, index) => (
              <div 
                key={index}
                data-animate
                className={`transition-all duration-1000 delay-${index * 200} ${isVisible[index + 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="group">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-slate-200">{item.title}</h3>
                  <p className="text-slate-400 text-sm font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            data-animate
            className={`transition-all duration-1000 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-slate-200">
              Join Our <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              We're looking for passionate developers, designers, and innovators to help us build the future of digital solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowCareerForm(true)}
                className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="https://www.linkedin.com/company/6origin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 border border-slate-600 rounded-full text-sm font-medium hover:border-slate-400 transition-colors flex items-center space-x-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQHgs91NBr3saA/company-logo_100_100/B4DZfuIyDWH4AQ-/0/1752046974096?e=1757548800&v=beta&t=WBKO_ivs11PA5e5hDUacjG4xt2NGTzP4HxqJH0_SUEM" 
              alt="6Origin" 
              className="w-6 h-6 rounded"
            />
            <span className="text-sm font-light text-slate-400">6Origin</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowCareerForm(true)}
              className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
            >
              Careers
            </button>
            <a 
              href="https://www.linkedin.com/company/6origin/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:6originlabs@gmail.com" className="text-slate-500 hover:text-slate-300 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-slate-800/30">
          <p className="text-xs text-slate-500 font-light">
            © 2025 6Origin. Building the future, one solution at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;