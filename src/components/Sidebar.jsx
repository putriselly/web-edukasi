import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: '🏠', path: '/', label: 'Home' },
  { icon: '🏆', path: '/trophy', label: 'Pencapaian' },
  { icon: '⚙️', path: '/settings', label: 'Pengaturan' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const nama = localStorage.getItem('user-nama') || 'Putri Selly';
  const inisial = nama.charAt(0).toUpperCase();

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center py-6 gap-6 z-50">
      {/* Logo */}
      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">
        P
      </div>

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            title={item.label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors
              ${isActive ? 'bg-purple-600' : 'hover:bg-gray-800'}`}
          >
            {item.icon}
          </button>
        );
      })}

      {/* Avatar */}
      <div className="mt-auto w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
        {inisial}
      </div>
    </div>
  );
}