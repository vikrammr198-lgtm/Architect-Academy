import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SearchModal } from './components/layout/SearchModal';
import { Dashboard } from './pages/Dashboard';
import { SystemDesign } from './pages/SystemDesign';
import { Networking } from './pages/Networking';
import { TopicPage } from './pages/TopicPage';
import { Progress } from './pages/Progress';
import { Bookmarks } from './pages/Bookmarks';
import { Glossary } from './pages/Glossary';
import { useStore } from './store/useStore';

export const App: React.FC = () => {
  const { isSidebarOpen } = useStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200 transition-colors">
        <Header />
        <Sidebar />
        <SearchModal />

        {/* Main Content Area adapts dynamically when sidebar opens/closes on desktop */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
            isSidebarOpen ? 'lg:pl-[21.5rem]' : 'lg:pl-8'
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/system-design" element={<SystemDesign />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
