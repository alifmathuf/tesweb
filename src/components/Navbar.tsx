import { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Clock,
  ChevronDown,
  Settings,
  User,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  portalName: string;
  portalColor: string;
  isMobile: boolean;
}

export default function Navbar({ portalName, portalColor, isMobile }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const notifications = [
    { id: 1, title: 'Ujian Baru', message: 'Ujian Matematika telah dibuat', time: '5 menit lalu', unread: true },
    { id: 2, title: 'Tugas Masuk', message: '5 siswa mengumpulkan tugas', time: '1 jam lalu', unread: true },
    { id: 3, title: 'Pendaftar Baru', message: '3 pendaftar SPMB baru', time: '2 jam lalu', unread: false },
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {isMobile && <div className="w-10" />}
        <div>
          <h2 className={cn("text-lg font-bold", portalColor)}>{portalName}</h2>
          <p className="text-xs text-gray-500 hidden sm:block">Sistem Informasi Madrasah</p>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{formatDate(currentTime)}</span>
          <span className="text-gray-300">|</span>
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>{formatTime(currentTime)}</span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="pl-9 pr-4 py-2 w-32 lg:w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0",
                        notif.unread && "bg-emerald-50/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                          notif.unread ? "bg-emerald-500" : "bg-gray-300"
                        )} />
                        <div>
                          <p className="font-medium text-sm text-gray-900">{notif.title}</p>
                          <p className="text-sm text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">Admin Utama</p>
                  <p className="text-sm text-gray-500">admin@min1.sch.id</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    Profil
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                    <HelpCircle className="w-4 h-4" />
                    Bantuan
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
