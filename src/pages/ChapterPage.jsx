import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { getProgress, saveChapterDone } from '../utils/storage';

export default function ChapterPage() {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('materi');

  const course = courses.find(c => c.id === courseId);
  const chapter = course?.chapters.find(ch => ch.id === chapterId);
  const progress = getProgress();
  const done = progress[courseId] || [];
  const isDone = done.includes(chapterId);

  const chapterIndex = course?.chapters.findIndex(ch => ch.id === chapterId);
  const prevChapter = course?.chapters[chapterIndex - 1];
  const nextChapter = course?.chapters[chapterIndex + 1];

  if (!course || !chapter) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p>Bab tidak ditemukan.</p>
    </div>
  );

  const handleSelesai = () => {
    saveChapterDone(courseId, chapterId);
    navigate(`/course/${courseId}`);
  };

  const tabs = ['materi', 'contoh-soal', 'latihan'];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 p-6 flex flex-col gap-3 overflow-y-auto">
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="text-gray-400 hover:text-white text-sm mb-2"
        >
          ← Kembali ke Daftar
        </button>
        <h2 className="font-bold text-lg">{course.title}</h2>
        <p className="text-gray-400 text-sm mb-4">
          Bab {chapterIndex + 1} dari {course.chapters.length}
        </p>
        {course.chapters.map((ch, index) => {
          const isActive = ch.id === chapterId;
          const isChDone = done.includes(ch.id);
          return (
            <div
              key={ch.id}
              onClick={() => navigate(`/course/${courseId}/chapter/${ch.id}`)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors
                ${isActive ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${isChDone ? 'bg-green-500' : isActive ? 'bg-purple-400' : 'bg-gray-700'}`}>
                {isChDone ? '✓' : index + 1}
              </div>
              <div>
                <div className="text-sm font-medium">{ch.title}</div>
                <div className="text-xs text-gray-400">{ch.duration || '—'}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">Bab {chapterIndex + 1}</p>
            <h1 className="text-2xl font-bold">{chapter.title}</h1>
          </div>
          <div className="flex gap-3">
            {prevChapter && (
              <button
                onClick={() => navigate(`/course/${courseId}/chapter/${prevChapter.id}`)}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl text-sm"
              >
                ← Sebelumnya
              </button>
            )}
            {nextChapter ? (
              <button
                onClick={() => navigate(`/course/${courseId}/chapter/${nextChapter.id}`)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-sm"
              >
                Selanjutnya →
              </button>
            ) : (
              <button
                onClick={handleSelesai}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm"
              >
                {isDone ? '✓ Selesai' : 'Tandai Selesai ✓'}
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-800 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors
                ${activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'}`}
            >
              {tab === 'materi' ? 'Materi' : tab === 'contoh-soal' ? 'Contoh Soal' : 'Latihan'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'materi' && (
          <div className="bg-gray-800 rounded-2xl p-6">
            {chapter.pdfUrl ? (
              <iframe
                src={chapter.pdfUrl}
                className="w-full h-[600px] rounded-xl"
                title="Materi PDF"
              />
            ) : (
              <div className="text-center text-gray-400 py-16">
                <div className="text-5xl mb-4">📄</div>
                <p>Materi belum tersedia untuk bab ini.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contoh-soal' && (
          <div className="text-center text-gray-400 py-16">
            <div className="text-5xl mb-4">📝</div>
            <p>Contoh soal belum tersedia untuk bab ini.</p>
          </div>
        )}

        {activeTab === 'latihan' && (
          <div className="text-center text-gray-400 py-16">
            <div className="text-5xl mb-4">🧠</div>
            <p>Latihan belum tersedia untuk bab ini.</p>
            <button
              onClick={() => navigate(`/quiz/${courseId}/${chapterId}`)}
              className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-sm"
            >
              Mulai Latihan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}