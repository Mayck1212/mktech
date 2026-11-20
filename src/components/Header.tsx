'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/services';

interface HeaderProps {
  onSearchClick?: () => void;
  onCategorySelect?: (category: any) => void;
}

export default function Header({ onSearchClick, onCategorySelect }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Categorias', href: '#categorias' },
    { label: 'Serviços', href: '#catalogo' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1222]/90 backdrop-blur-md border-b border-[#1E2E55] shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39BFFF] rounded-lg"
            aria-label="MK Tech Início"
          >
            {/* Official Logo Image */}
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-md border border-[#39BFFF]/40 group-hover:border-[#39BFFF] transition-all bg-[#0B1222]">
              <img
                src="/images/mktech-logo.webp"
                alt="MK Tech Logo"
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -inset-0.5 rounded-xl bg-[#1769FF]/20 blur-sm -z-10 group-hover:bg-[#39BFFF]/30 transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                MK <span className="text-[#39BFFF]">TECH</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-1 hidden sm:block">
                Assistência & Soluções Digitais
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#101B35]/70 border border-[#1E2E55] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-[#1769FF]/15 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Olá, MK Tech! Estive navegando no site e gostaria de tirar uma dúvida sobre serviços.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] transition-all shadow-md shadow-[#1769FF]/20 hover:shadow-[#39BFFF]/30 transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da MK Tech"
              className="p-2.5 rounded-xl bg-[#1769FF]/20 text-[#39BFFF] border border-[#1769FF]/40 active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-[#101B35] border border-[#1E2E55] active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[60px] bg-[#0B1222]/98 backdrop-blur-xl border-b border-[#1E2E55] shadow-2xl px-5 pt-4 pb-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-200 hover:text-white hover:bg-[#101B35] rounded-xl border border-transparent hover:border-[#1E2E55] transition-all"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#39BFFF]">→</span>
              </a>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-[#1E2E55] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atendimento direto pelo WhatsApp oficial</span>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Olá, MK Tech! Estive navegando no site pelo celular e gostaria de atendimento.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#1769FF] to-[#0E56DB] shadow-lg shadow-[#1769FF]/25 active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Atendimento (38 99912-5035)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
