import { useNavigate, useParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { getProgress } from '../utils/storage';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);
  const progress = getProgress();
  const done = progress[courseId] || [];

  if (!course) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p>Mata kuliah tidak ditemukan.</p>
    </div>
  );

  const pct = course.chapters.length > 0
    ? Math.round((done.length / course.chapters.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
      >
        ← Kembali ke Daftar
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="text-4xl mb-2">{course.icon}</div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-gray-400 mt-1">{done.length} dari {course.chapters.length} Bab • {pct}% selesai</p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex flex-col gap-3 mb-10">
        {course.chapters.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl p-6 text-center text-gray-400">
            Belum ada bab untuk mata kuliah ini.
          </div>
        ) : (
          course.chapters.map((chapter, index) => {
            const isDone = done.includes(chapter.id);
            return (
              <div
                key={chapter.id}
                onClick={() => navigate(`/course/${courseId}/chapter/${chapter.id}`)}
                className="bg-gray-800 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  ${isDone ? 'bg-green-500' : 'bg-gray-700'}`}>
                  {isDone ? '✓' : index + 1}
                </div>
                <div>
                  <div className="font-semibold">{chapter.title}</div>
                  <div className="text-gray-400 text-sm">{chapter.duration || '—'}</div>
                </div>
                {isDone && (
                  <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    Selesai
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Kuis & Ujian */}
      {course.kuis && course.kuis.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Kuis & Ujian</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {course.kuis.map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/course/${courseId}/ujian/${item.id}`)}
                className="bg-gray-800 rounded-2xl p-5 text-center cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="text-3xl mb-2">📋</div>
                <div className="font-semibold text-sm">{item.title}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}