import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AccountSettingsPage from './pages/AccountSettingsPage';
import AdminPage from './pages/AdminPage';
import ArchivePage from './pages/ArchivePage';
import BoardThreadsPage from './pages/BoardThreadsPage';
import ForumPage from './pages/ForumPage';
import HomePage from './pages/HomePage';
import BopGeneralPage from './pages/BopGeneralPage';
import BopGovernancePage from './pages/BopGovernancePage';
import BopOfficialPage from './pages/BopOfficialPage';
import BopTechnicalPage from './pages/BopTechnicalPage';
import RegisterPage from './pages/RegisterPage';
import ForumPostBodyPage from './pages/ForumPostBodyPage';
import ThreadViewPage from './pages/ThreadViewPage';
import PublicProfilePage from './pages/PublicProfilePage';
import MessagesPage from './pages/MessagesPage';
import ForDevelopersPage from './pages/ForDevelopersPage';
import ContractsPage from './pages/ContractsPage';
import DividendsPage from './pages/DividendsPage';
import HowDividendsWorkPage from './pages/HowDividendsWorkPage';
import MyNftsPage from './pages/MyNftsPage';
import LiteboardChannelPage from './pages/LiteboardChannelPage';
import LiteboardDeployPage from './pages/LiteboardDeployPage';
import LiteboardExplorerPage from './pages/LiteboardExplorerPage';
import LiteboardHubPage from './pages/LiteboardHubPage';
import LiteboardThreadPage from './pages/LiteboardThreadPage';
import SiteFooter from './components/SiteFooter';

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/liteboard/deploy" element={<LiteboardDeployPage />} />
        <Route path="/liteboard/explorer" element={<LiteboardExplorerPage />} />
        <Route
          path="/liteboard/:mint/:channel/:threadNumber"
          element={<LiteboardThreadPage />}
        />
        <Route path="/liteboard/:mint/:channel" element={<LiteboardChannelPage />} />
        <Route path="/liteboard/:mint" element={<LiteboardHubPage />} />
        <Route path="/forums" element={<ForumPage />} />
        <Route path="/forums/archive" element={<ArchivePage />} />
        <Route path="/forums/bop-official" element={<BopOfficialPage />} />
        <Route
          path="/forums/bop-official/:boardSlug/:threadNumber"
          element={<ThreadViewPage />}
        />
        <Route path="/forums/bop-official/:boardSlug" element={<BoardThreadsPage />} />
        <Route path="/forums/bop-general" element={<BopGeneralPage />} />
        <Route
          path="/forums/bop-general/:boardSlug/:threadNumber"
          element={<ThreadViewPage />}
        />
        <Route path="/forums/bop-general/:boardSlug" element={<BoardThreadsPage />} />
        <Route path="/forums/bop-governance" element={<BopGovernancePage />} />
        <Route
          path="/forums/bop-governance/:boardSlug/:threadNumber"
          element={<ThreadViewPage />}
        />
        <Route path="/forums/bop-governance/:boardSlug" element={<BoardThreadsPage />} />
        <Route path="/forums/bop-technical" element={<BopTechnicalPage />} />
        <Route
          path="/forums/bop-technical/:boardSlug/:threadNumber"
          element={<ThreadViewPage />}
        />
        <Route path="/forums/bop-technical/:boardSlug" element={<BoardThreadsPage />} />
        <Route path="/forums/login" element={<Navigate to="/forums" replace />} />
        <Route path="/forums/account" element={<AccountSettingsPage />} />
        <Route path="/forums/admin" element={<AdminPage />} />
        <Route path="/forums/register" element={<RegisterPage />} />
        <Route path="/forums/u/:username" element={<PublicProfilePage />} />
        <Route path="/forums/messages" element={<MessagesPage />} />
        <Route path="/dividends" element={<DividendsPage />} />
        <Route path="/dividends/how-it-works" element={<HowDividendsWorkPage />} />
        <Route path="/dividends/my-nfts" element={<MyNftsPage />} />
        <Route path="/forums/post-text/:postId" element={<ForumPostBodyPage />} />
        <Route path="/for-developers" element={<ForDevelopersPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}

export default App;
