import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveQuizScore } from '../utils/storage';

const contohSoal = [
  {
    id: 1,
    soal: "Apa itu variabel dalam pemrograman?",
    pilihan: [
      "Tempat menyimpan data sementara",
      "Perintah untuk mencetak output",
      "Jenis tipe data",
      "Fungsi bawaan bahasa pemrograman"
    ],
    jawaban: 0,
    penjelasan: "Variabel adalah tempat penyimpanan data sementara di memori yang nilainya dapat berubah selama program berjalan."
  },
  {
    id: 2,
    soal: "Manakah yang merupakan tipe data integer?",
    pilihan: ["3.14", "'Hello'", "42", "True"],
    jawaban: 2,
    penjelasan: "Integer adalah tipe data bilangan bulat. 42 adalah contoh integer, sedangkan 3.14 adalah float, 'Hello' adalah string, dan True adalah boolean."
  }
];

export default function QuizPage() {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const soal = contohSoal[current];
  const total = contohSoal.length;

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
      {/* Progress */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm">{current + 1} / {total} soal</span>
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
              <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">
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