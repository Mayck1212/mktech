'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ArrowRight, ShieldCheck, Zap, Sparkles, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/services';

interface HeroProps {
  onSearchSubmit: (query: string) => void;
  searchQuery: string;
}

export default function Hero({ onSearchSubmit, searchQuery }: HeroProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(localSearch);
    const catalogEl = document.querySelector('#catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickTags = [
    { label: 'Formatação Windows', query: 'Windows' },
    { label: 'Limpeza de Celular', query: 'Limpeza' },
    { label: 'Normas ABNT', query: 'ABNT' },
    { label: 'Otimização Gamer', query: 'Otimização' },
    { label: 'Suporte Remoto', query: 'Remoto' },
  ];

  return (
    <section
      id="inicio"
      className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#0B1222] via-[#0D162B] to-[#0B1222]"
    >
      {/* Background Ambient Lighting (Gradients sutis) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1769FF]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#39BFFF]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Search & Highlights */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101B35] border border-[#1E2E55] w-fit mb-5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#39BFFF] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Assistência Especializada • MK Tech
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] mb-4">
              Encontre a solução para o seu{' '}
              <span className="bg-gradient-to-r from-[#39BFFF] via-[#1769FF] to-[#39BFFF] bg-clip-text text-transparent">
                problema.
              </span>
            </h1>

            {/* Complementary Text */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              Serviços de tecnologia, assistência de software e soluções digitais em um só lugar. Escolha o serviço ideal, consulte valores transparentes e solicite atendimento direto pelo WhatsApp.
            </p>

            {/* Search Bar Component */}
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-xl mb-4 group"
            >
              <div className="relative flex items-center rounded-2xl bg-[#101B35]/90 border border-[#1E2E55] focus-within:border-[#39BFFF] focus-within:ring-2 focus-within:ring-[#39BFFF]/20 shadow-xl shadow-black/40 transition-all p-1.5 sm:p-2">
                <div className="pl-3 pr-2 text-slate-400 group-focus-within:text-[#39BFFF] transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Qual serviço você procura? Ex: Windows, celular lento, ABNT..."
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none px-2 py-2"
                  aria-label="Pesquisar serviços"
                />
                <button
                  type="submit"
                  className="shrink-0 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
                >
                  <span>Buscar</span>
                  <ArrowRight className="w-4 h-4 hidden sm:inline" />
                </button>
              </div>
            </form>

            {/* Quick Keyword Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8">
              <span className="text-xs text-slate-400 font-medium mr-1">Sugestões:</span>
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => {
                    setLocalSearch(tag.query);
                    onSearchSubmit(tag.query);
                    const catalogEl = document.querySelector('#catalogo');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#101B35]/60 hover:bg-[#1769FF]/20 text-slate-300 hover:text-white border border-[#1E2E55] hover:border-[#39BFFF]/40 transition-all"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#1E2E55]/60 max-w-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1769FF]/15 text-[#39BFFF] border border-[#1769FF]/30 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Via WhatsApp</span>
                  <span className="text-[11px] text-slate-400">Atendimento ágil</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Transparente</span>
                  <span className="text-[11px] text-slate-400">Diagnóstico claro</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Sem Burocracia</span>
                  <span className="text-[11px] text-slate-400">Direto ao ponto</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Cartoon Character */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0">
            {/* Ambient Radial Aura Behind Character */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1769FF]/20 via-[#39BFFF]/10 to-transparent rounded-full blur-3xl transform scale-90 pointer-events-none -z-10" />
            
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] flex justify-center items-center">
              {/* Floating tech badge */}
              <div className="absolute -top-3 left-2 sm:-left-4 z-20 px-3 py-1.5 rounded-xl bg-[#101B35]/90 border border-[#39BFFF]/30 backdrop-blur-md shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#39BFFF] animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs font-semibold text-white">Suporte Especializado</span>
              </div>

              {/* Character Image */}
              <div className="relative w-full aspect-[984/1024] select-none filter drop-shadow-[0_15px_35px_rgba(23,105,255,0.25)]">
                <picture>
                  <source srcSet="/images/mktech-character.webp" type="image/webp" />
                  <img
                    src="/images/mktech-character.png"
                    alt="Mascote e Especialista MK Tech apontando para o celular com o catálogo de serviços"
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
                    loading="eager"
                  />
                </picture>
              </div>

              {/* Subtle base gradient ground to blend naturally */}
              <div className="absolute -bottom-4 inset-x-8 h-10 bg-gradient-to-t from-[#0B1222] via-[#0B1222]/80 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
