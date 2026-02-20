import { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const phoneNumber = '6281234567890';
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Chat WhatsApp</h4>
                  <p className="text-emerald-100 text-xs">Balasan cepat dalam hitungan menit</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-[#f0f2f5]">
            <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[85%]">
              <p className="text-sm text-gray-700">
                Halo! Ada yang bisa kami bantu? Silakan kirim pesan Anda.
              </p>
              <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/20"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#128C7E] transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110",
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:shadow-xl hover:shadow-[#25D366]/30"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
}
