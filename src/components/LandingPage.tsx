import { Rocket, Globe, Satellite, MessageCircle, Zap, Gamepad2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="bg-black">
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen relative overflow-hidden bg-black">
        {/* Video Background - Smooth Cinematic */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-60 animate-pulse"
            style={{
              filter: 'brightness(0.8) contrast(1.1) saturate(1.2)',
              transform: 'scale(1.02)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              animationDuration: '8s'
            }}
            onCanPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.75; // 75% speed - perfect cinematic slow motion
            }}
          >
            <source src="/space-video-30sec.mov" type="video/mp4" />
          </video>
          
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-blue-900/10" />
          

        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-200" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300" />
        </div>

        {/* NASA CosmoScope Navigation Header - Sticky with Glossy Effect */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/60 via-slate-900/70 to-black/60 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          {/* Glossy overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex items-center h-20">
              {/* NASA CosmoScope Branding */}
              <div className="flex items-center space-x-3 -ml-2">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/40 ring-2 ring-cyan-400/20">
                  <Rocket className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight drop-shadow-lg">
                    NASA CosmoScope
                  </h1>
                  <p className="text-xs text-slate-300 font-medium drop-shadow-sm">
                    Exploring the Universe • One Pixel at a Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
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
                href="https://raydekk.github.io/StarsAndPlanets/"
                target="_blank"
                rel="noopener noreferrer"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Features Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Satellite className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Explore Universe</h3>
              <p className="text-slate-400 leading-relaxed">
                Navigate trillion-pixel datasets from NASA missions with maximum zoom capabilities up to 10x magnification.
              </p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Hub</h3>
              <p className="text-slate-400 leading-relaxed">
                Share discoveries, upload space exploration content, and connect with fellow astronomers and space enthusiasts.
              </p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Latest Discoveries</h3>
              <p className="text-slate-400 leading-relaxed">
                Stay updated with breaking news from NASA's Hubble Space Telescope and other space exploration missions.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center">
              <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Mission Statement</h3>
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                NASA's space missions continue to push the boundaries of what is technologically possible. Our platform enables you to explore high-resolution photos and videos from Earth, distant planets, and deep space with unprecedented detail and interactive features.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-8 border-t border-slate-800 mt-56">
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
