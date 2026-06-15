import { useState } from 'react';

export default function SettingsPage() {
  const [nama, setNama] = useState(localStorage.getItem('user-nama') || 'Putri Selly');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('user-nama', nama);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Yakin mau reset semua progress? Data tidak bisa dikembalikan!')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">⚙️ Pengaturan</h1>
        <p className="text-gray-400 mt-1">Kelola preferensi kamu</p>
      </div>

      {/* Nama */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-4">
        <h2 className="font-bold mb-4">Profil</h2>
        <label className="text-gray-400 text-sm mb-2 block">Nama</label>
        <input
          type="text"
          value={nama}
          onChange={e => setNama(e.target.value)}
          className="w-full bg-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl text-sm font-medium"
        >
          {saved ? '✓ Tersimpan!' : 'Simpan'}
        </button>
      </div>

      {/* Reset */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="font-bold mb-2">Danger Zone</h2>
        <p className="text-gray-400 text-sm mb-4">Reset semua progress dan nilai kuis kamu.</p>
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl text-sm font-medium"
        >
          Reset Semua Progress
        </button>
      </div>
    </div>
  );
}