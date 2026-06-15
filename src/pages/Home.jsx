import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { getProgress, getQuizScores } from '../utils/storage';

export default function Home() {
  const navigate = useNavigate();
  const progress = getProgress();
  const quizScores = getQuizScores();

  const totalSelesai = courses.filter(c => {
    const done = progress[c.id] || [];
    return c.chapters.length > 0 && done.length === c.chapters.length;
  }).length;

  const totalKuisLulus = Object.values(quizScores).reduce((acc, course) => {
    return acc + Object.values(course).filter(s => s >= 70).length;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm">Selamat datang kembali,</p>
        <h1 className="text-3xl font-bold">Putri Selly 👋</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-2xl mb-1">📚</div>
          <div className="text-3xl font-bold">{courses.length}</div>
          <div className="text-gray-400 text-sm">Mata Kuliah</div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-2xl mb-1">✅</div>
          <div className="text-3xl font-bold">{totalSelesai}</div>
          <div className="text-gray-400 text-sm">Selesai</div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-3xl font-bold">{totalKuisLulus}</div>
          <div className="text-gray-400 text-sm">Kuis Lulus</div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-3xl font-bold">0</div>
          <div className="text-gray-400 text-sm">Hari Belajar</div>
        </div>
      </div>

      {/* Mata Kuliah */}
      <h2 className="text-xl font-bold mb-4">Mata Kuliah Saya</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.map(course => {
          const done = progress[course.id] || [];
          const total = course.chapters.length;
          const pct = total > 0 ? Math.round((done.length / total) * 100) : 0;

          return (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="bg-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              <div className={`bg-gradient-to-r ${course.color} h-32 flex items-center justify-center text-5xl`}>
                {course.icon}
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-400 mb-1">Informatika</div>
                <div className="font-bold text-lg mb-3">{course.title}</div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{done.length}/{total} Bab</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}