'use client';

import React from 'react';
import {
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Laptop,
  FileText,
  Globe,
  ArrowUp,
  Clock,
  Phone,
} from 'lucide-react';
import { CATEGORIES, ServiceCategory, WHATSAPP_NUMBER } from '@/data/services';

interface FooterProps {
  onSelectCategory: (category: ServiceCategory | 'todos') => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: ServiceCategory) => {
    onSelectCategory(cat);
    const catalogEl = document.querySelector('#catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#080D1A] border-t border-[#1E2E55] text-slate-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Description (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1769FF] to-[#101B35] border border-[#39BFFF]/30 shadow-md">
                <span className="text-white font-black tracking-tight text-lg">
                  M<span className="text-[#39BFFF]">K</span>
                </span>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                MK <span className="text-[#39BFFF]">TECH</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Plataforma especializada em assistência técnica de software, celulares, computadores, formatação acadêmica e soluções digitais. Atendimento rápido, transparente e sem burocracia.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Atendimento seguro e confiável</span>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleNavClick(e, '#inicio')}
                  className="hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#categorias"
                  onClick={(e) => handleNavClick(e, '#categorias')}
                  className="hover:text-white transition-colors"
                >
                  Categorias
                </a>
              </li>
              <li>
                <a
                  href="#catalogo"
                  onClick={(e) => handleNavClick(e, '#catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Todos os Serviços
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  onClick={(e) => handleNavClick(e, '#como-funciona')}
                  className="hover:text-white transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, '#faq')}
                  className="hover:text-white transition-colors"
                >
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Categories (Col 7-9) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Categorias
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {(Object.keys(CATEGORIES) as ServiceCategory[]).map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-white transition-colors text-left flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF]" />
                    <span>{CATEGORIES[cat].name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / WhatsApp Card (Col 10-12) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Atendimento Direto
            </h4>

            <div className="p-4 rounded-xl bg-[#101B35] border border-[#1E2E55] mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                <Phone className="w-4 h-4 text-[#39BFFF]" />
                <span>(38) 99912-5035</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#1769FF]" />
                <span>Segunda a Sábado • Atendimento ágil</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Olá, MK Tech! Gostaria de informações sobre atendimento e serviços.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="mt-12 pt-6 border-t border-[#1E2E55] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MK Tech. Todos os direitos reservados.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
