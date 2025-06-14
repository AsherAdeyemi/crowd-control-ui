import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, Shield, BarChart3, Zap, ArrowRight, Users,
  Camera, Activity, Play, CheckCircle
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg w-fit mb-4 shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

const StatCounter = ({ end, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
        {count}+
      </div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);

  const handleGetStarted = () => {
    setIsStarted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">CrowdMonitor</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Smart Crowd
              </span>
              <br />
              <span className="text-white">Monitoring</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced crowd detection system using real-time computer vision 
              to monitor spaces, ensure safety, and provide actionable insights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={handleGetStarted}
              disabled={isStarted}
              className={`group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-2xl transition-all duration-300 ${
                isStarted 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-purple-500/25 transform'
              }`}
            >
              <div className="flex items-center">
                {isStarted ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Monitoring
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
            <button className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <StatCounter end={99} label="Accuracy Rate" />
            <StatCounter end={24} label="Hours Monitoring" />
            <StatCounter end={1000} label="Detections Made" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver reliable, real-time crowd monitoring solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Camera} title="Real-time Detection" description="Advanced computer vision algorithms powered by Python and OpenCV for instant person detection with high accuracy." delay={100} />
            <FeatureCard icon={Shield} title="Smart Alerts" description="Customizable threshold-based alerting system that notifies you when crowd density exceeds safe limits." delay={200} />
            <FeatureCard icon={BarChart3} title="Analytics Dashboard" description="Comprehensive analytics with historical data, trends, and insights to help optimize space management." delay={300} />
            <FeatureCard icon={Zap} title="Instant Logging" description="Automatic logging to Supabase and local storage ensures no detection data is ever lost." delay={400} />
            <FeatureCard icon={Users} title="Crowd Insights" description="Deep insights into crowd patterns, peak times, and occupancy trends for better decision making." delay={500} />
            <FeatureCard icon={Activity} title="Live Monitoring" description="Real-time webcam feed with overlay detection boxes and confidence scores for immediate visual feedback." delay={600} />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="px-6 py-20 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Built with Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React', desc: 'Frontend Framework' },
              { name: 'Python', desc: 'Detection Logic' },
              { name: 'Supabase', desc: 'Database' },
              { name: 'TailwindCSS', desc: 'Styling' }
            ].map((tech, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <div className="text-purple-400 font-semibold">{tech.name}</div>
                <div className="text-gray-400 text-sm">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Monitoring?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Deploy intelligent crowd monitoring in minutes. Get real-time insights and ensure safety with our computer vision solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleGetStarted}
                disabled={isStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:scale-105 hover:shadow-purple-500/25 transition-all duration-300"
              >
                <div className="flex items-center">
                  {isStarted ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Launching...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Launch Dashboard
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                No setup required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">CrowdMonitor</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 CrowdMonitor. Powered by Computer Vision.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
