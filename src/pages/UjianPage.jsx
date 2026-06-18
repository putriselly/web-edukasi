import { useNavigate, useParams } from 'react-router-dom';
import { courses } from '../data/courses';

export default function UjianPage() {
  const { courseId, ujianId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);
  const ujian = course?.kuis?.find(k => k.id === ujianId);

  if (!course || !ujian) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p>Ujian tidak ditemukan.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <button
        onClick={() => navigate(`/course/${courseId}`)}
        className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
      >
        ← Kembali ke {course.title}
      </button>

      <h1 className="text-2xl font-bold mb-6">{ujian.title}</h1>

      <div className="bg-gray-800 rounded-2xl p-6">
        <iframe
          src={ujian.pdfUrl}
          className="w-full h-[700px] rounded-xl"
          title={ujian.title}
        />
      </div>
    </div>
  );
}