import { Rocket, Globe, Telescope, Users, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="bg-black">
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-30"
            poster="https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1920"
          >
            <source src="https://player.vimeo.com/external/397667648.sd.mp4?s=82da022d2dcf9c11a93c65b6e85c6b5b44aa4a6b&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
            {/* Fallback to image if video doesn't load */}
          </video>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" />
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-200" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300" />
        </div>

        {/* NASA CosmoScope Navigation Header */}
        <nav className="relative z-20 bg-black/40 backdrop-blur-md border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex items-center h-20">
              {/* NASA CosmoScope Branding */}
              <div className="flex items-center space-x-3 -ml-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                    NASA CosmoScope
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Exploring the Universe • One Pixel at a Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Navigate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Billions</span> of Pixels
            </h2>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Zoom into NASA's high-resolution space imagery, discover celestial features, and join a community of space enthusiasts exploring the cosmos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              <button
                onClick={onEnter}
                className="group flex items-center space-x-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-semibold rounded-lg transition-all shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
              >
                <span>Launch Explorer</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#"
                className="group flex items-center space-x-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-cyan-500/50 text-white text-lg font-semibold rounded-lg transition-all"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>The Space Odyssey</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Second Page */}
      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
        {/* Same background styling */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" />
        
        {/* Animated Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-200" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Features Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Telescope className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Explore Universe</h3>
              <p className="text-slate-400 leading-relaxed">
                Navigate trillion-pixel datasets from NASA missions with maximum zoom capabilities up to 10x magnification.
              </p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Hub</h3>
              <p className="text-slate-400 leading-relaxed">
                Share discoveries, upload space exploration content, and connect with fellow astronomers and space enthusiasts.
              </p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Latest Discoveries</h3>
              <p className="text-slate-400 leading-relaxed">
                Stay updated with breaking news from NASA's Hubble Space Telescope and other space exploration missions.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center">
              <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Mission Statement</h3>
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                NASA's space missions continue to push the boundaries of what is technologically possible. Our platform enables you to explore high-resolution photos and videos from Earth, distant planets, and deep space with unprecedented detail and interactive features.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-8 border-t border-slate-800 mt-20">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
              <p>NASA Space Explorer Platform • Powered by Space Exploration Data</p>
              <p>Explore • Discover • Share</p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
