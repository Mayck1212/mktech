'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/services';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip bubble on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#101B35]/95 border border-[#39BFFF]/30 shadow-xl backdrop-blur-md text-xs text-white max-w-xs animate-fadeIn">
          <span>Precisa de ajuda rápida? Fale comigo!</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'Olá, MK Tech! Estive navegando pelo site e gostaria de solicitar um atendimento.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco via WhatsApp"
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1769FF] to-[#39BFFF] text-white shadow-xl shadow-[#1769FF]/40 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#39BFFF]/40"
      >
        <span className="absolute -inset-1 rounded-full bg-[#1769FF]/30 animate-ping -z-10" />
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
}
