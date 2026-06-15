import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveQuizScore } from '../utils/storage';
import { generateQuiz } from '../utils/generateQuiz';
import { courses } from '../data/courses';

export default function QuizPage() {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [soalList, setSoalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const chapter = course?.chapters.find(ch => ch.id === chapterId);

  useEffect(() => {
    async function fetchSoal() {
      try {
        const soal = await generateQuiz(course?.title, chapter?.title);
        setSoalList(soal);
      } catch (e) {
        setError("Gagal generate soal. Coba lagi.");
      } finally {
        setLoading(false);
      }
    }
    if (course && chapter) fetchSoal();
  }, [courseId, chapterId]);

  const soal = soalList[current];
  const total = soalList.length;

  const handlePilih = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplain(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected === soal.jawaban];
    setAnswers(newAnswers);
    if (current + 1 >= total) {
      const score = Math.round((newAnswers.filter(Boolean).length / total) * 100);
      saveQuizScore(courseId, chapterId, score);
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplain(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
      <div className="text-5xl animate-bounce">🧠</div>
      <p className="text-gray-400">AI sedang membuat soal untuk kamu...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">😵</div>
      <p className="text-red-400">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
      >
        Coba Lagi
      </button>
    </div>
  );

  if (finished) {
    const score = Math.round((answers.filter(Boolean).length / total) * 100);
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="bg-gray-800 rounded-2xl p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">{score >= 70 ? '🏆' : '📚'}</div>
          <h2 className="text-2xl font-bold mb-2">Latihan Selesai!</h2>
          <p className="text-gray-400 mb-6">Nilai kamu</p>
          <div className={`text-6xl font-bold mb-6 ${score >= 70 ? 'text-green-400' : 'text-red-400'}`}>
            {score}
          </div>
          <p className="text-gray-400 mb-8">
            {score >= 70 ? 'Bagus! Kamu lulus latihan ini.' : 'Coba lagi untuk hasil lebih baik!'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(`/course/${courseId}/chapter/${chapterId}`)}
              className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-xl text-sm"
            >
              Kembali
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl text-sm"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm">{current + 1} / {total} soal</span>
        <span className="text-gray-400 text-sm">{chapter?.title}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 mb-8">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Soal */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6">
        <span className="text-xs bg-purple-600 px-3 py-1 rounded-full mb-4 inline-block">
          Soal {current + 1}
        </span>
        <p className="text-lg font-medium mt-3">{soal.soal}</p>
      </div>

      {/* Pilihan */}
      <div className="flex flex-col gap-3 mb-6">
        {soal.pilihan.map((pilihan, index) => {
          let style = 'bg-gray-800 hover:bg-gray-700';
          if (selected !== null) {
            if (index === soal.jawaban) style = 'bg-green-600';
            else if (index === selected) style = 'bg-red-600';
          }
          return (
            <button
              key={index}
              onClick={() => handlePilih(index)}
              className={`${style} rounded-2xl p-4 text-left flex items-center gap-4 transition-colors`}
            >
              <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              {pilihan}
            </button>
          );
        })}
      </div>

      {/* Penjelasan */}
      {showExplain && (
        <div className="bg-gray-800 rounded-2xl p-5 mb-6 border border-purple-500/30">
          <p className="text-purple-400 font-semibold mb-1">💡 Penjelasan</p>
          <p className="text-gray-300 text-sm">{soal.penjelasan}</p>
        </div>
      )}

      {/* Next */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-2xl font-semibold"
        >
          {current + 1 >= total ? 'Lihat Hasil' : 'Soal Berikutnya →'}
        </button>
      )}
    </div>
  );
}