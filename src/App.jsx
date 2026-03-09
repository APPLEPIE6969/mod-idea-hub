import Layout from './components/Layout';
import IdeaCard from './components/IdeaCard';
import CreateIdeaModal from './components/CreateIdeaModal';
import { useIdeas } from './hooks/useIdeas';
import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const { ideas, loading, error, refresh } = useIdeas();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We need to override the Navbar in the Layout or pass the state down
  // For simplicity since Layout uses Navbar internally, we'll pass the toggle logic

  return (
    <>
      <Navbar onPostClick={() => setIsModalOpen(true)} />
      <div className="container mt-6 flex gap-8">
        {/* Simplified Layout Structure to handle State better */}
        {/* We'll move Sidebar into App or a more flexible Layout */}
        <Layout isCustomNavbar>
          <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Recommended for you</h2>
                <p className="text-text-secondary text-sm">Discover top-voted mod ideas from the community.</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/5 px-4 py-2 rounded-full text-xs font-bold hover:bg-white/10 transition-all border border-white/5">NEWEST</button>
                <button className="bg-accent-neon/10 text-accent-neon px-4 py-2 rounded-full text-xs font-bold border border-accent-neon/20 transition-all">TRENDING</button>
              </div>
            </header>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm">
                Failed to load ideas: {error}
              </div>
            )}

            <div className="grid gap-4">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="glass p-6 rounded-2xl h-40 animate-pulse bg-white/5" />
                ))
              ) : ideas.length > 0 ? (
                ideas.map(idea => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))
              ) : (
                <div className="glass p-12 text-center rounded-3xl border-dashed">
                  <p className="text-text-muted mb-4">No ideas found. Be the first to post!</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-accent-neon/10 text-accent-neon px-6 py-2 rounded-full border border-accent-neon/20 hover:bg-accent-neon/20 transition-all font-bold"
                  >
                    CREATE FIRST IDEA
                  </button>
                </div>
              )}
            </div>
          </div>
        </Layout>
      </div>

      <CreateIdeaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={refresh}
      />
    </>
  );
}

export default App;
