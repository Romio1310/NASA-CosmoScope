import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, Info, MapPin } from 'lucide-react';

interface ImageLabel {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

const SPACE_IMAGES = [
  {
    id: '1',
    title: 'Carina Nebula - JWST Deep Field',
    url: 'https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxies-73873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'An incredibly detailed view of star-forming regions',
    resolution: '4.5 Trillion Pixels',
    labels: [
      { id: 'l1', x: 30, y: 25, title: 'Stellar Nursery', description: 'New stars being born in gas clouds' },
      { id: 'l2', x: 65, y: 40, title: 'Cosmic Cliffs', description: 'Edge of a giant gaseous cavity' },
      { id: 'l3', x: 45, y: 70, title: 'Hot Young Stars', description: 'Ultraviolet radiation from massive stars' }
    ]
  },
  {
    id: '2',
    title: 'Andromeda Galaxy - Full Resolution',
    url: 'https://science.nasa.gov/wp-content/uploads/2023/04/hs-2015-02-a-hires_jpg-jpg.webp',
    description: 'Our neighboring galaxy in unprecedented detail',
    resolution: '1.5 Billion Pixels',
    labels: [
      { id: 'l4', x: 50, y: 35, title: 'Galactic Core', description: 'Central supermassive black hole region' },
      { id: 'l5', x: 25, y: 55, title: 'Spiral Arm', description: 'Dense regions of star formation' }
    ]
  },
  {
    id: '3',
    title: 'Hubble Ultra Deep Field',
    url: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Thousands of galaxies in a tiny patch of sky',
    resolution: '800 Million Pixels',
    labels: [
      { id: 'l6', x: 20, y: 30, title: 'Ancient Galaxy', description: '13 billion light-years away' },
      { id: 'l7', x: 70, y: 50, title: 'Galaxy Cluster', description: 'Gravitationally bound galaxies' }
    ]
  }
];

export default function ExploreUniverse() {
  const [selectedImage, setSelectedImage] = useState(SPACE_IMAGES[0]);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState<ImageLabel | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 10));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
    if (zoom <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMaxZoom = () => {
    setZoom(10);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        setZoom(prev => Math.max(1, Math.min(10, prev + delta)));
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Explore the Universe</h2>
          <p className="text-slate-400">
            Navigate through billions of pixels of space imagery with maximum zoom capabilities
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
          <Info className="w-5 h-5 text-cyan-400" />
          <span className="text-slate-300 font-medium">
            {selectedImage.resolution}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Select Image</h3>
            <div className="space-y-3">
              {SPACE_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setSelectedImage(img);
                    handleReset();
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedImage.id === img.id
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-medium mb-1">{img.title}</div>
                  <div className="text-xs opacity-80">{img.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Zoom Controls</h3>
            <div className="space-y-3">
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 10}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
              >
                <ZoomIn className="w-5 h-5" />
                <span>Zoom In</span>
              </button>
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
              >
                <ZoomOut className="w-5 h-5" />
                <span>Zoom Out</span>
              </button>
              <button
                onClick={handleMaxZoom}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all"
              >
                <Maximize2 className="w-5 h-5" />
                <span>Maximum Zoom</span>
              </button>
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset View</span>
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Current Zoom</span>
                <span className="text-lg font-bold text-cyan-400">{zoom.toFixed(1)}x</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                  style={{ width: `${(zoom / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800"
              />
              <span className="text-slate-300 font-medium">Show Feature Labels</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div
            ref={containerRef}
            className="relative bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-700 aspect-video cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute inset-0 transition-transform origin-center"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
              {showLabels && selectedImage.labels.map((label) => (
                <button
                  key={label.id}
                  onClick={() => setSelectedLabel(label)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${label.x}%`,
                    top: `${label.y}%`
                  }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping absolute" />
                    <MapPin className="w-6 h-6 text-cyan-400 relative z-10 drop-shadow-lg" fill="currentColor" />
                  </div>
                </button>
              ))}
            </div>

            {zoom > 1 && (
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-300">
                  {zoom > 1 ? 'Drag to pan • Scroll to zoom' : 'Zoom in to explore'}
                </p>
              </div>
            )}
          </div>

          {selectedLabel && (
            <div className="bg-slate-800 rounded-xl p-6 border border-cyan-500/50 shadow-xl shadow-cyan-500/10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-bold text-white">{selectedLabel.title}</h4>
                <button
                  onClick={() => setSelectedLabel(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-slate-300">{selectedLabel.description}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
            <p className="text-slate-300 mb-4">{selectedImage.description}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="px-3 py-1 bg-slate-800 rounded-lg border border-slate-700 text-slate-300">
                Resolution: {selectedImage.resolution}
              </div>
              <div className="px-3 py-1 bg-slate-800 rounded-lg border border-slate-700 text-slate-300">
                Zoom Range: 1x - 10x
              </div>
              <div className="px-3 py-1 bg-slate-800 rounded-lg border border-slate-700 text-slate-300">
                {selectedImage.labels.length} Known Features
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
