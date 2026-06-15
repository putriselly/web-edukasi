import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import ChapterPage from './pages/ChapterPage';
import QuizPage from './pages/QuizPage';
import Sidebar from './components/Sidebar';

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname.includes('/quiz');

  return (
    <div className="flex">
      {!hideLayout && <Sidebar />}
      <div className={`flex-1 ${!hideLayout ? 'ml-16' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterPage />} />
          <Route path="/quiz/:courseId/:chapterId" element={<QuizPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
