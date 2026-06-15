import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { getProgress, getQuizScores } from '../utils/storage';

export default function TrophyPage() {
  const navigate = useNavigate();
  const progress = getProgress();
  const quizScores = getQuizScores();

  const achievements = courses.map(course => {
    const done = progress[course.id] || [];
    const total = course.chapters.length;
    const pct = total > 0 ? Math.round((done.length / total) * 100) : 0;
    const scores = quizScores[course.id] || {};
    const avgScore = Object.values(scores).length > 0
      ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
      : 0;

    return { ...course, done: done.length, total, pct, avgScore };
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🏆 Pencapaian</h1>
        <p className="text-gray-400 mt-1">Progres belajar kamu per mata kuliah</p>
      </div>

      <div className="flex flex-col gap-4">
        {achievements.map(course => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="bg-gray-800 rounded-2xl p-5 flex items-center gap-5 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center text-2xl shrink-0`}>
              {course.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold mb-1">{course.title}</div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{course.done}/{course.total} Bab selesai</span>
                <span>Rata-rata kuis: {course.avgScore > 0 ? course.avgScore : '-'}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${course.pct}%` }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-400 shrink-0">
              {course.pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}