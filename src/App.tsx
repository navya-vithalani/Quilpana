import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useCallback, useMemo} from 'react';
import { VoteStatus, UserVotes } from './types/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GAMES, TEMPLATES, TOTAL_VOTE_QUOTA, TOTAL_SKILL_GAMES_QUOTA } from './constants';
import PlayerHeader from './components/PlayerHeader';
import CreatorHeader from './components/CreatorHeader';
import PlayerMode from './pages/PlayerMode';
import CreatorMode from './pages/CreatorMode';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import GamePage from "./pages/GamePage";
import Modal from './components/Modal';
import UploadGameModal from './components/UploadGameModal';
import FeedbackPage from './pages/FeedbackPage';
import SplashPage from './components/landing/SplashPage';
import { useToast }  from './components/system/Toast';
import Footer from './components/Footer';
import PlaceholderPage from './pages/PlaceholderPage';
import SynapseChat from "./components/chat/SynapseChat";
import Navbar from "./components/Navbar";
import SparkPage from "./pages/SparkPage";
import ManifestoPage from "./pages/ManifestoPage";
import Manifesto from "./pages/ManifestoChatgpt";
import BeyondPage from "./pages/BeyondPage"

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('quilpana-login-status', false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userVotes, setUserVotes] = useLocalStorage<UserVotes>('quilpana-votes', {});
  const [favoriteGames, setFavoriteGames] = useLocalStorage<string[]>('quilpana-favorites', []);
  const [skillGamesPlayed, setSkillGamesPlayed] = useLocalStorage('quilpana-skill-games-played', 0);

  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("quilpana-splash-seen")
  );

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleVote = useCallback((gameId: string, voteType: 'up' | 'down') => setVoteModalOpen(true), []);
  const handleFavorite = useCallback((gameId: string) => {
    setFavoriteGames(prev => {
      const isFavorite = prev.includes(gameId);
      const game = GAMES.find(g => g.id === gameId);
      if (isFavorite) {
        toast.success(`Removed ${game?.name || 'game'} from favorites`);
        return prev.filter(id => id !== gameId);
      } else {
        toast.success(`Added ${game?.name || 'game'} to favorites`);
        return [...prev, gameId];
      }
    });
  }, [setFavoriteGames, toast]);

  const { totalUpvotes, totalDownvotes, favoriteGameObjects, upvotesLeft, skillGamesLeft } = useMemo(() => {
    const upvotes = Object.values(userVotes).filter(v => v === VoteStatus.Up).length;
    const downvotes = Object.values(userVotes).filter(v => v === VoteStatus.Down).length;
    const favorites = GAMES.filter(game => favoriteGames.includes(game.id));
    return {
      totalUpvotes: upvotes,
      totalDownvotes: downvotes,
      favoriteGameObjects: favorites,
      upvotesLeft: Math.max(0, TOTAL_VOTE_QUOTA - upvotes),
      skillGamesLeft: Math.max(0, TOTAL_SKILL_GAMES_QUOTA - skillGamesPlayed),
    };
  }, [userVotes, favoriteGames, skillGamesPlayed]);

  const handleLogout = () => {
     setIsLoggedIn(false);
     navigate("/");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const PlayerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={`min-h-screen flex flex-col`}>
      <PlayerHeader
        upvotesLeft={upvotesLeft}
        totalDownvotes={totalDownvotes}
        numFavorites={favoriteGames.length}
        skillGamesLeft={skillGamesLeft}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
      />
        <main className="page-layout">{children}</main>
      <SynapseChat />
      <Footer />
    </div>
  );

   const CreatorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={`page-layout`}>
      <CreatorHeader
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
      />
        <main className="page-layout">{children}</main>
        <SynapseChat />
      <Footer />
    </div>
  );

    const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={`page-layout`}>
      <Navbar />
        <main className="page-layout">{children}</main>
      <Footer />
    </div>
  );

  return (
    <>
    <div className="page-layout">

      {/* ROUTES */}

      <Routes>
        <Route path="/" element={
            <LandingPage />
        } />
        <Route path="/login" element={<LoginPage onNavigateToSignUp={() => handleNavigate('/signup')} />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/player" element={
          <PlayerLayout>
            <PlayerMode
              games={GAMES}
              userVotes={userVotes}
              favoriteGames={favoriteGames}
              onVote={handleVote}
              onFavorite={handleFavorite}
              upvotesLeft={upvotesLeft}
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </PlayerLayout>
        } />

        <Route path="/creator" element={
          <CreatorLayout>
            <CreatorMode
              templates={TEMPLATES}
              favoriteGames={favoriteGames}
              onFavorite={handleFavorite}
            />
          </CreatorLayout>
        } />

        <Route path="/player/:id" element={<GamePage />} />

        <Route path="/spark" element={
          <MainLayout>
            <SparkPage />
          </MainLayout>
        } />

        <Route path="/manifesto" element={
          <MainLayout>
            <ManifestoPage />
          </MainLayout>
        } />

        
        <Route path="/beyond" element={
          <MainLayout>
            <BeyondPage />
          </MainLayout>
        } />
        
        <Route path="/manifestocgpt" element={
          <MainLayout>
            <Manifesto />
          </MainLayout>
        } />

        <Route path="/profile" element={
          <MainLayout>
            <ProfilePage
              favoriteGames={favoriteGameObjects}
              totalUpvotes={totalUpvotes}
              totalDownvotes={totalDownvotes}
            />
          </MainLayout>
        } />

        <Route path="/:gameId/feedback" element={<FeedbackPage />} />

        <Route path="*" element={
          <MainLayout>
            <PlaceholderPage title="Not Found" />
          </MainLayout>
        } />
      </Routes>

      {/* MODALS */}

      <Modal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)}>
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Unlock Your Full Potential!</h2>
          <p className="text-gray-600 mb-6">Gain access to more skill games, exclusive content, and advanced features with quilpana Premium.</p>
          <button
            onClick={() => { setIsPremiumModalOpen(false); handleNavigate('/player'); }}
            className="bg-gradient-to-r from-blue-500 to-violet-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-violet-700 transition"
          >
            Explore Premium
          </button>
        </div>
      </Modal>

      <Modal isOpen={voteModalOpen} onClose={() => setVoteModalOpen(false)}>
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">Voting Locked!</h2>
          <p className="text-gray-700 mb-6">You need to complete the game first to unlock voting.</p>
          <button
            onClick={() => setVoteModalOpen(false)}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-700 transition"
          >
            OK
          </button>
        </div>
      </Modal>

      <UploadGameModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onRequireLogin={() => handleNavigate('/login')}
      />
    </div>

    {/* SPLASH PAGE */}

    {showSplash && location.pathname === '/' && (
        <SplashPage
          onEnter={() => {
            setShowSplash(false);
            sessionStorage.setItem("quilpana-splash-seen", "true");
          }}
        />
      )}
    </>
  );
}

export default App;
