import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm py-3 px-4 lg:px-6 bg-gray-50/50 border-b border-gray-100">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('navigate', { detail: { portal: 'dashboard' } }));
        }}
        className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Beranda</span>
      </a>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="font-medium text-emerald-700">{item.label}</span>
          ) : (
            <a
              href={item.href || '#'}
              onClick={(e) => {
                if (!item.href) {
                  e.preventDefault();
                }
              }}
              className="text-gray-500 hover:text-emerald-600 transition-colors"
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}
