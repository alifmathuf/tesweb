import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#0f2818] to-[#1a472a] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">MIN 1</h3>
                <p className="text-emerald-300 text-xs">Kota Jakarta</p>
              </div>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Madrasah Ibtidaiyah Negeri 1 berkomitmen menyelenggarakan pendidikan 
              berkualitas berbasis nilai-nilai Islam untuk membentuk generasi unggul.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-amber-400 mb-4">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-emerald-100 text-sm">
                  Jl. Pendidikan No. 123, Kota Jakarta, 10110
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-100 text-sm">(021) 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-100 text-sm">info@min1.sch.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-100 text-sm">www.min1.sch.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-400 mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              {['Beranda', 'Profil Madrasah', 'Informasi', 'Galeri', 'Kontak'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-emerald-100 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-400 mb-4">Media Sosial</h4>
            <p className="text-emerald-100 text-sm mb-4">
              Ikuti kami di media sosial untuk informasi terbaru.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-emerald-300 text-sm text-center sm:text-left">
            © {currentYear} MIN 1 Kota Jakarta. Hak Cipta Dilindungi.
          </p>
          <p className="text-emerald-400 text-xs">
            Dikembangkan dengan ❤️ untuk Pendidikan Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
