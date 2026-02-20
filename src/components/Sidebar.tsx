import { useState } from 'react';
import {
  LayoutDashboard,
  School,
  FileQuestion,
  BookOpen,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activePortal: string;
  onPortalChange: (portal: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const portals = [
  { id: 'admin-dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'text-emerald-400' },
  { id: 'madrasah', name: 'Portal Madrasah', icon: School, color: 'text-emerald-400' },
  { id: 'cbt', name: 'Portal CBT', icon: FileQuestion, color: 'text-amber-400' },
  { id: 'lms', name: 'Portal LMS', icon: BookOpen, color: 'text-sky-400' },
  { id: 'spmb', name: 'Portal SPMB', icon: UserPlus, color: 'text-rose-400' },
];

const previews = [
  { id: 'preview-madrasah', name: 'Preview Madrasah', icon: Eye, color: 'text-violet-400' },
  { id: 'preview-cbt', name: 'Preview CBT Siswa', icon: Eye, color: 'text-violet-400' },
  { id: 'preview-lms', name: 'Preview LMS Siswa', icon: Eye, color: 'text-violet-400' },
  { id: 'preview-spmb', name: 'Preview SPMB', icon: Eye, color: 'text-violet-400' },
];

export default function Sidebar({ activePortal, onPortalChange, isOpen, onToggle, isMobile }: SidebarProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1a472a] text-white shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onToggle}
          />
        )}

        <div
          className={cn(
            "fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-[#0f2818] to-[#1a472a] z-50 transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <School className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">MIN 1</h1>
                <p className="text-emerald-300 text-xs">Portal Admin</p>
              </div>
            </div>

            <nav className="space-y-2">
              {portals.map((portal) => {
                const Icon = portal.icon;
                const isActive = activePortal === portal.id;
                return (
                  <button
                    key={portal.id}
                    onClick={() => {
                      onPortalChange(portal.id);
                      onToggle();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-white/15 text-white shadow-lg border border-white/10"
                        : "text-emerald-100 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive ? portal.color : "text-emerald-300")} />
                    <span className="font-medium text-sm">{portal.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="px-4 text-xs text-emerald-400/70 uppercase tracking-wider mb-3">Preview</p>
              <nav className="space-y-1">
                {previews.map((preview) => {
                  const Icon = preview.icon;
                  const isActive = activePortal === preview.id;
                  return (
                    <button
                      key={preview.id}
                      onClick={() => {
                        onPortalChange(preview.id);
                        onToggle();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-white/15 text-white shadow-lg border border-white/10"
                          : "text-emerald-100 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? preview.color : "text-emerald-300/70")} />
                      <span className="font-medium text-sm">{preview.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">Admin Utama</p>
                <p className="text-emerald-300 text-xs truncate">admin@min1.sch.id</p>
              </div>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Keluar</span>
            </button>
          </div>
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Keluar</h3>
              <p className="text-gray-600 mb-4">Apakah Anda yakin ingin keluar dari aplikasi?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "h-screen bg-gradient-to-b from-[#0f2818] to-[#1a472a] transition-all duration-300 flex flex-col relative",
        isOpen ? "w-[280px]" : "w-[80px]"
      )}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-amber-400 text-[#0f2818] flex items-center justify-center shadow-lg hover:bg-amber-300 transition-colors z-10"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <div className={cn("p-6", !isOpen && "p-4")}>
        <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <School className="w-7 h-7 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">MIN 1</h1>
              <p className="text-emerald-300 text-xs">Portal Admin</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto sidebar-scroll">
        {portals.map((portal) => {
          const Icon = portal.icon;
          const isActive = activePortal === portal.id;
          return (
            <button
              key={portal.id}
              onClick={() => onPortalChange(portal.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white shadow-lg border border-white/10"
                  : "text-emerald-100 hover:bg-white/10 hover:text-white",
                !isOpen && "justify-center px-2"
              )}
              title={!isOpen ? portal.name : undefined}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? portal.color : "text-emerald-300")} />
              {isOpen && (
                <>
                  <span className="font-medium text-sm">{portal.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </>
              )}
            </button>
          );
        })}

        {isOpen && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="px-4 text-xs text-emerald-400/70 uppercase tracking-wider mb-2">Preview</p>
          </div>
        )}
        {previews.map((preview) => {
          const Icon = preview.icon;
          const isActive = activePortal === preview.id;
          return (
            <button
              key={preview.id}
              onClick={() => onPortalChange(preview.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white shadow-lg border border-white/10"
                  : "text-emerald-100 hover:bg-white/10 hover:text-white",
                !isOpen && "justify-center px-2"
              )}
              title={!isOpen ? preview.name : undefined}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? preview.color : "text-emerald-300/70")} />
              {isOpen && <span className="font-medium text-sm">{preview.name}</span>}
            </button>
          );
        })}
      </nav>

      <div className={cn("p-4 border-t border-white/10", !isOpen && "px-2")}>
        <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">Admin Utama</p>
              <p className="text-emerald-300 text-xs truncate">admin@min1.sch.id</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 mt-2 text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 rounded-xl transition-colors",
            !isOpen && "justify-center px-2"
          )}
          title={!isOpen ? "Keluar" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium text-sm">Keluar</span>}
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Keluar</h3>
            <p className="text-gray-600 mb-4">Apakah Anda yakin ingin keluar dari aplikasi?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
