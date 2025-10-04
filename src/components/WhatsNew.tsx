import { ExternalLink, Calendar, Star } from 'lucide-react';

const SPACE_NEWS = [
  {
    id: '1',
    title: 'Artemis II Crew Training Intensifies',
    date: 'October 1, 2025',
    description: 'NASA astronauts continue rigorous training for the Artemis II mission, the first crewed flight around the Moon in over 50 years. The crew is preparing for launch in 2026, marking humanity\'s return to lunar exploration.',
    imageUrl: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://www.nasa.gov/artemis'
  },
  {
    id: '2',
    title: 'Mars Sample Return Mission Update',
    date: 'September 28, 2025',
    description: 'NASA and ESA reveal new details about the ambitious Mars Sample Return mission. Perseverance rover has collected 20 rock samples that will be brought back to Earth for detailed analysis, potentially revealing signs of ancient Martian life.',
    imageUrl: 'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://www.nasa.gov/mars'
  },
  {
    id: '3',
    title: 'James Webb Discovers Exoplanet Atmosphere',
    date: 'September 25, 2025',
    description: 'James Webb Space Telescope detects water vapor and carbon dioxide in the atmosphere of exoplanet K2-18b, located 120 light-years away. This rocky world in the habitable zone could potentially harbor conditions suitable for life.',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://www.nasa.gov/webb'
  },
  {
    id: '4',
    title: 'ISS Commercial Partnership Expansion',
    date: 'September 20, 2025',
    description: 'NASA announces new commercial partnerships for the International Space Station, expanding microgravity research opportunities. Private companies will conduct experiments in materials science, biotechnology, and space manufacturing.',
    imageUrl: 'https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://www.nasa.gov/station'
  }
];

export default function WhatsNew() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Star className="w-8 h-8 text-cyan-400" />
          <h2 className="text-4xl font-bold text-white">What's New in Space Exploration</h2>
          <Star className="w-8 h-8 text-cyan-400" />
        </div>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          Stay updated with the latest news from NASA missions, space exploration programs, and groundbreaking discoveries
        </p>
        <a
          href="https://www.nasa.gov/news"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 font-medium"
        >
          <span>Visit NASA Official Site</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {SPACE_NEWS.map((news) => (
          <div
            key={news.id}
            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-200 font-medium">{news.date}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {news.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {news.description}
              </p>
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                <span>Read Full Article</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Explore NASA Missions</h3>
        <p className="text-slate-400 mb-6">
          Visit official NASA mission pages for real-time updates, high-resolution images, and scientific discoveries
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.nasa.gov/artemis"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white rounded-lg transition-all"
          >
            Artemis Program
          </a>
          <a
            href="https://www.nasa.gov/mars"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white rounded-lg transition-all"
          >
            Mars Exploration
          </a>
          <a
            href="https://www.nasa.gov/webb"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white rounded-lg transition-all"
          >
            Webb Telescope
          </a>
          <a
            href="https://www.nasa.gov/station"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white rounded-lg transition-all"
          >
            Space Station
          </a>
        </div>
      </div>
    </div>
  );
}
