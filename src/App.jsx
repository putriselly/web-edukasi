import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import ChapterPage from './pages/ChapterPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterPage />} />
        <Route path="/quiz/:courseId/:chapterId" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}