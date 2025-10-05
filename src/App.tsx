import { useState, useEffect } from 'react';
import { Rocket, Users, Sparkles, Telescope, Gamepad2 } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CommunityTab from './components/CommunityTab';
import WhatsNew from './components/WhatsNew';
import ExploreUniverse from './components/ExploreUniverse';
import AstronautChatbot from './components/AstronautChatbot';

type Tab = 'community' | 'whatsNew' | 'explore';

function App() {
  // Initialize state based on URL hash and localStorage
  const getInitialState = () => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    const savedState = localStorage.getItem('nasa-cosmoscope-state');
    
    if (hash && ['explore', 'community', 'whatsNew'].includes(hash)) {
      return { showLanding: false, activeTab: hash as Tab };
    }
    
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        return parsed;
      } catch (e) {
        console.error('Error parsing saved state:', e);
      }
    }
    
    return { showLanding: true, activeTab: 'explore' as Tab };
  };

  const initialState = getInitialState();
  const [showLanding, setShowLanding] = useState(initialState.showLanding);
  const [activeTab, setActiveTab] = useState<Tab>(initialState.activeTab);

  // Save state to localStorage and update URL whenever state changes
  useEffect(() => {
    const state = { showLanding, activeTab };
    localStorage.setItem('nasa-cosmoscope-state', JSON.stringify(state));
    
    // Update page title and URL based on current state
    if (!showLanding) {
      const titles = {
        explore: '🔭 Explore Universe - NASA CosmoScope',
        community: '👥 Community - NASA CosmoScope', 
        whatsNew: '✨ What\'s New - NASA CosmoScope'
      };
      document.title = titles[activeTab];
      window.history.replaceState(null, '', `#${activeTab}`);
    } else {
      document.title = 'CosmoScope - Explore the Universe';
      window.history.replaceState(null, '', '/');
    }
  }, [showLanding, activeTab]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['explore', 'community', 'whatsNew'].includes(hash)) {
        setShowLanding(false);
        setActiveTab(hash as Tab);
      } else {
        setShowLanding(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {/* Render the appropriate page */}
      {showLanding ? (
        <LandingPage onEnter={() => setShowLanding(false)} />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {/* Header */}
          <header className="bg-gradient-to-r from-black/60 via-slate-900/70 to-black/60 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-50 shadow-2xl shadow-cyan-500/10">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
              <div className="flex items-center justify-between h-20">
                <button 
                  onClick={() => setShowLanding(true)}
                  className="flex items-center space-x-3 hover:opacity-80 transition-all group cursor-pointer -ml-2"
                  title="Back to Landing Page"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/40 ring-2 ring-cyan-400/20 group-hover:scale-110 transition-transform">
                    <Rocket className="w-7 h-7 text-white drop-shadow-lg" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight drop-shadow-lg">
                      NASA CosmoScope
                    </h1>
                    <p className="text-xs text-slate-300 font-medium drop-shadow-sm">
                      Exploring the Universe • One Pixel at a Time
                    </p>
                  </div>
                </button>
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === 'explore'
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Telescope className="w-5 h-5" />
                    <span className="font-medium">Explore</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('community')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === 'community'
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Community</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('whatsNew')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === 'whatsNew'
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">What's New</span>
                  </button>
                  <a
                    href="https://raydekk.github.io/StarsAndPlanets/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span className="font-medium">Space Odyssey</span>
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'explore' && <ExploreUniverse />}
            {activeTab === 'community' && <CommunityTab />}
            {activeTab === 'whatsNew' && <WhatsNew />}
          </main>
        </div>
      )}

      {/* Astronaut Chatbot - Always visible on ALL pages */}
      <AstronautChatbot />
    </>
  );
}

export default App;
