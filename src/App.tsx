import { useState } from 'react';
import { Rocket, Users, Sparkles, Telescope, Gamepad2 } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CommunityTab from './components/CommunityTab';
import WhatsNew from './components/WhatsNew';
import ExploreUniverse from './components/ExploreUniverse';

type Tab = 'community' | 'whatsNew' | 'explore';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('explore');

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Rocket className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                NASA CosmoScope
              </h1>
            </div>
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
                href="#"
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
  );
}

export default App;
