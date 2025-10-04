import { useState } from 'react';
import { Upload, Heart, Clock, ImagePlus } from 'lucide-react';

interface CommunityPost {
  id: string;
  userName: string;
  title: string;
  description: string;
  imageUrl: string;
  likesCount: number;
  createdAt: string;
}

const SAMPLE_POSTS: CommunityPost[] = [
  {
    id: '1',
    userName: 'AstroExplorer',
    title: 'Mars Perseverance: Jezero Crater Landing Site',
    description: 'NASA\'s Perseverance rover captured this stunning view of the Jezero Crater. This ancient lake bed holds clues about past microbial life on Mars. The resolution allows us to see individual rocks and geological features!',
    imageUrl: 'https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxies-73873.jpeg?auto=compress&cs=tinysrgb&w=800',
    likesCount: 342,
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    userName: 'SpaceMissionFan',
    title: 'ISS Expedition 68: Earth from Low Orbit',
    description: 'Astronauts aboard the International Space Station photographed this breathtaking view of Earth. You can see city lights, aurora borealis, and the curvature of our planet from 400km altitude.',
    imageUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=800',
    likesCount: 567,
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    userName: 'LunarExplorer',
    title: 'Artemis Mission: Moon South Pole Mapping',
    description: 'High-resolution imagery from NASA\'s Artemis lunar mapping mission reveals permanently shadowed craters at the Moon\'s south pole. These regions may contain water ice crucial for future human missions.',
    imageUrl: 'https://images.pexels.com/photos/2162/sky-space-telescope-universe.jpg?auto=compress&cs=tinysrgb&w=800',
    likesCount: 823,
    createdAt: '1 day ago'
  }
];

export default function CommunityTab() {
  const [posts, setPosts] = useState<CommunityPost[]>(SAMPLE_POSTS);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newPost, setNewPost] = useState({
    userName: '',
    title: '',
    description: '',
    imageUrl: ''
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likesCount: post.likesCount + 1 }
        : post
    ));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: CommunityPost = {
      id: Date.now().toString(),
      userName: newPost.userName || 'Anonymous',
      title: newPost.title,
      description: newPost.description,
      imageUrl: newPost.imageUrl,
      likesCount: 0,
      createdAt: 'Just now'
    };
    setPosts([post, ...posts]);
    setNewPost({ userName: '', title: '', description: '', imageUrl: '' });
    setShowUploadForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Space Exploration Community</h2>
          <p className="text-slate-400">Share discoveries from NASA missions, Mars rovers, ISS expeditions, and deep space exploration</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
        >
          <Upload className="w-5 h-5" />
          <span className="font-medium">Upload Post</span>
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <ImagePlus className="w-6 h-6 mr-2 text-cyan-400" />
            Create New Post
          </h3>
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={newPost.userName}
                onChange={(e) => setNewPost({ ...newPost, userName: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Give your discovery a title"
                required
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                placeholder="Describe your space exploration discovery"
                rows={3}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                placeholder="https://example.com/space-image.jpg"
                required
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all font-medium"
              >
                Post to Community
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-white line-clamp-1">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400">{post.userName}</span>
                  <span className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.createdAt}
                  </span>
                </div>
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-slate-700 hover:bg-pink-500 text-slate-300 hover:text-white rounded-lg transition-all group"
                >
                  <Heart className="w-4 h-4 group-hover:fill-current" />
                  <span className="text-sm font-medium">{post.likesCount}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
