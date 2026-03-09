import Layout from './components/Layout';
import IdeaCard from './components/IdeaCard';
import CreateIdeaModal from './components/CreateIdeaModal';
import CustomDropdown from './components/CustomDropdown';
import { useIdeas } from './hooks/useIdeas';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IdeaDetailView from './pages/IdeaDetailView';
import ProfileDashboard from './pages/ProfileDashboard';
import Marketplace from './pages/Marketplace';
import Developers from './pages/Developers';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
  >
    {children}
  </motion.div>
);

function IdeaFeed({ ideas, loading, error, setIsModalOpen, onVote, categoryFilter, onCategoryChange }) {
  const [activeTab, setActiveTab] = useState('Trending');

  const tabs = ['Trending', 'Newest', 'Top Voted'];

  const filterOptions = [
    { value: 'All', label: 'All Ideas' },
    { value: 'Minecraft Mod', label: 'Minecraft' },
    { value: 'Plugin', label: 'Plugins' },
    { value: 'Tool', label: 'Tools' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold pb-4 relative transition-colors bg-transparent border-none cursor-pointer ${activeTab === tab ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Filter:</span>
          <CustomDropdown
            options={filterOptions}
            value={categoryFilter || 'All'}
            onChange={onCategoryChange}
            className="min-w-[160px]"
          />
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
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar
        onPostClick={() => setIsModalOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageWrapper>
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
                  categoryFilter={categoryFilter}
                  onCategoryChange={setCategoryFilter}
                />
              </Layout>
            </PageWrapper>
          } />
          <Route path="/idea/:id" element={
            <PageWrapper>
              <IdeaDetailView />
            </PageWrapper>
          } />
          <Route path="/profile" element={
            <PageWrapper>
              <ProfileDashboard />
            </PageWrapper>
          } />
          <Route path="/marketplace" element={
            <PageWrapper>
              <Marketplace />
            </PageWrapper>
          } />
          <Route path="/devs" element={
            <PageWrapper>
              <Developers />
            </PageWrapper>
          } />
          <Route path="/leaderboard" element={
            <PageWrapper>
              <Leaderboard />
            </PageWrapper>
          } />
          <Route path="/settings" element={
            <PageWrapper>
              <Settings />
            </PageWrapper>
          } />
          <Route path="/dashboard" element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>

      <CreateIdeaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={refreshIdeas}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
