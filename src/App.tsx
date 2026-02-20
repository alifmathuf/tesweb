import { useState, useEffect } from 'react';
import { auth, type UserRole } from '@/lib/auth';
import LoginPage from '@/sections/LoginPage';
import AdminDashboard from '@/sections/AdminDashboard';
import GuruDashboard from '@/sections/GuruDashboard';
import SiswaDashboard from '@/sections/SiswaDashboard';
import PendaftarDashboard from '@/sections/PendaftarDashboard';
import MadrasahPortal from '@/sections/MadrasahPortal';
import CBTPortal from '@/sections/CBTPortal';
import LMSPortal from '@/sections/LMSPortal';
import SPMBPortal from '@/sections/SPMBPortal';
import PreviewMadrasah from '@/sections/PreviewMadrasah';
import PreviewCBT from '@/sections/PreviewCBT';
import PreviewLMS from '@/sections/PreviewLMS';
import PreviewSPMB from '@/sections/PreviewSPMB';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import WhatsAppChat from '@/components/WhatsAppChat';
import { initData } from '@/lib/db';
import { cn } from '@/lib/utils';

const portalConfig: Record<string, { name: string; color: string; breadcrumb: string }> = {
  'admin-dashboard': { name: 'Dashboard Admin', color: 'text-emerald-700', breadcrumb: 'Dashboard' },
  'guru-dashboard': { name: 'Dashboard Guru', color: 'text-sky-700', breadcrumb: 'Dashboard' },
  'siswa-dashboard': { name: 'Dashboard Siswa', color: 'text-amber-700', breadcrumb: 'Dashboard' },
  'pendaftar-dashboard': { name: 'Dashboard Pendaftar', color: 'text-rose-700', breadcrumb: 'Dashboard' },
  madrasah: { name: 'Portal Madrasah', color: 'text-emerald-700', breadcrumb: 'Madrasah' },
  cbt: { name: 'Portal CBT', color: 'text-amber-700', breadcrumb: 'CBT' },
  lms: { name: 'Portal LMS', color: 'text-sky-700', breadcrumb: 'LMS' },
  spmb: { name: 'Portal SPMB', color: 'text-rose-700', breadcrumb: 'SPMB' },
  'preview-madrasah': { name: 'Preview Madrasah', color: 'text-violet-700', breadcrumb: 'Preview Madrasah' },
  'preview-cbt': { name: 'Preview CBT Siswa', color: 'text-violet-700', breadcrumb: 'Preview CBT' },
  'preview-lms': { name: 'Preview LMS Siswa', color: 'text-violet-700', breadcrumb: 'Preview LMS' },
  'preview-spmb': { name: 'Preview SPMB', color: 'text-violet-700', breadcrumb: 'Preview SPMB' },
};

const isPreview = (portal: string) => portal.startsWith('preview-');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [activePortal, setActivePortal] = useState('admin-dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initData();
    
    // Check existing auth
    const user = auth.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role as UserRole);
      setActivePortal(auth.getDashboardRoute(user.role as UserRole));
    }

    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setActivePortal(auth.getDashboardRoute(role));
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setActivePortal('admin-dashboard');
  };

  const handleNavigate = (portal: string) => {
    setActivePortal(portal);
  };

  const renderContent = () => {
    // Preview mode
    if (isPreview(activePortal)) {
      switch (activePortal) {
        case 'preview-madrasah': return <PreviewMadrasah />;
        case 'preview-cbt': return <PreviewCBT />;
        case 'preview-lms': return <PreviewLMS />;
        case 'preview-spmb': return <PreviewSPMB />;
        default: return <PreviewMadrasah />;
      }
    }

    // Dashboard berdasarkan role
    switch (activePortal) {
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'guru-dashboard':
        return <GuruDashboard onLogout={handleLogout} />;
      case 'siswa-dashboard':
        return <SiswaDashboard onLogout={handleLogout} />;
      case 'pendaftar-dashboard':
        return <PendaftarDashboard onLogout={handleLogout} />;
      // Admin portals
      case 'madrasah':
        return userRole === 'admin' ? <MadrasahPortal /> : <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'cbt':
        return userRole === 'admin' ? <CBTPortal /> : <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'lms':
        return userRole === 'admin' ? <LMSPortal /> : <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'spmb':
        return userRole === 'admin' ? <SPMBPortal /> : <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      default:
        // Fallback ke dashboard sesuai role
        if (userRole === 'admin') return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        if (userRole === 'guru') return <GuruDashboard onLogout={handleLogout} />;
        if (userRole === 'siswa') return <SiswaDashboard onLogout={handleLogout} />;
        if (userRole === 'pendaftar') return <PendaftarDashboard onLogout={handleLogout} />;
        return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
  };

  // Login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const config = portalConfig[activePortal];
  const showPreview = isPreview(activePortal);

  // Preview mode: fullscreen tanpa admin UI
  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar
          activePortal={activePortal}
          onPortalChange={handleNavigate}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />
        <div className="flex-1 overflow-auto">
          <div className="bg-violet-600 text-white px-4 py-2 text-center text-sm flex items-center justify-center gap-2">
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs">PREVIEW MODE</span>
            <span>Ini adalah tampilan yang dilihat oleh user/publik</span>
          </div>
          {renderContent()}
        </div>
      </div>
    );
  }

  // Dashboard mode (tanpa sidebar untuk guru, siswa, pendaftar)
  const showSidebar = userRole === 'admin';

  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderContent()}
      </div>
    );
  }

  // Admin mode dengan sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activePortal={activePortal}
        onPortalChange={handleNavigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        !isMobile && sidebarOpen ? "ml-0" : "ml-0"
      )}>
        <Navbar
          portalName={config?.name || 'Dashboard'}
          portalColor={config?.color || 'text-emerald-700'}
          isMobile={isMobile}
        />

        <Breadcrumb items={[{ label: config?.breadcrumb || 'Dashboard' }]} />

        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>

        <Footer />
      </div>

      <WhatsAppChat />
    </div>
  );
}

export default App;
