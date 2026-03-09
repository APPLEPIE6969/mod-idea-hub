import Layout from './components/Layout';
import IdeaCard from './components/IdeaCard';
import CreateIdeaModal from './components/CreateIdeaModal';
import { useIdeas } from './hooks/useIdeas';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import IdeaDetailView from './pages/IdeaDetailView';
import ProfileDashboard from './pages/ProfileDashboard';

function IdeaFeed({ ideas, loading, error, setIsModalOpen }) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="flex gap-4">
          <button className="text-sm font-bold border-b-2 border-primary text-slate-100 pb-1 bg-transparent border-none cursor-pointer">Trending</button>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-100 transition-colors pb-1 bg-transparent border-none cursor-pointer">Newest</button>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-100 transition-colors pb-1 bg-transparent border-none cursor-pointer">Top Voted</button>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span>Show:</span>
          <select className="bg-transparent border-none text-slate-200 text-xs focus:ring-0 cursor-pointer outline-none">
            <option>All Ideas</option>
            <option>Minecraft</option>
            <option>Plugins</option>
          </select>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm">
          Failed to load ideas: {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-neutral-dark/50 border border-slate-800 rounded-xl h-40 animate-pulse" />
          ))
        ) : ideas.length > 0 ? (
          ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} onVote={onVote} />
          ))
        ) : (
          <div className="bg-neutral-dark border border-slate-800 border-dashed p-12 text-center rounded-xl">
            <p className="text-slate-500 mb-4">No ideas found. Be the first to post!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary/20 text-primary px-6 py-2 rounded-lg border border-primary/40 hover:bg-primary/30 transition-all font-bold cursor-pointer"
            >
              CREATE FIRST IDEA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const {
    ideas,
    loading,
    error,
    refreshIdeas,
    voteIdea,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter
  } = useIdeas();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar
        onPostClick={() => setIsModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Routes>
        <Route path="/" element={
          <Layout
            activeCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
          >
            <IdeaFeed
              ideas={ideas}
              loading={loading}
              error={error}
              setIsModalOpen={setIsModalOpen}
              onVote={voteIdea}
            />
          </Layout>
        } />
        <Route path="/idea/:id" element={<IdeaDetailView />} />
        <Route path="/profile" element={<ProfileDashboard />} />
      </Routes>

      <CreateIdeaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={refreshIdeas}
      />
    </div>
  );
}
