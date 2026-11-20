'use client';

import React from 'react';
import { Sparkles, ArrowRight, Info } from 'lucide-react';
import { ServiceItem, COMMERCIAL_DISCLAIMER } from '@/data/services';
import ServiceCard from './ServiceCard';

interface FeaturedServicesProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onRequestWhatsApp: (service: ServiceItem) => void;
  onExploreAll: () => void;
}

export default function FeaturedServices({
  services,
  onSelectService,
  onRequestWhatsApp,
  onExploreAll,
}: FeaturedServicesProps) {
  // Sort according to commercial rank (1 to 8)
  const popularServices = services
    .filter((s) => s.popularRank !== undefined)
    .sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99));

  if (popularServices.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#0B1222] via-[#0E162D] to-[#0B1222] border-t border-[#1E2E55]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1769FF]/15 border border-[#1769FF]/30 text-xs font-semibold text-[#39BFFF] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destaques da MK Tech</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Serviços mais procurados.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Soluções populares com valores transparentes, prazos ágeis e atendimento direto via WhatsApp.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              type="button"
              onClick={onExploreAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#101B35] hover:bg-[#162447] text-xs sm:text-sm font-semibold text-slate-200 hover:text-white border border-[#1E2E55] transition-all"
            >
              <span>Ver catálogo completo ({services.length} serviços)</span>
              <ArrowRight className="w-4 h-4 text-[#39BFFF]" />
            </button>
          </div>
        </div>

        {/* Grid of Featured Cards (Comfortable mobile layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
              onRequestWhatsApp={onRequestWhatsApp}
            />
          ))}
        </div>

        {/* Discreta Observação Comercial */}
        <div className="mt-8 flex items-start gap-2.5 p-3.5 rounded-xl bg-[#101B35]/40 border border-[#1E2E55]/60 text-slate-400 text-xs">
          <Info className="w-4 h-4 text-[#39BFFF] shrink-0 mt-0.5" />
          <span>{COMMERCIAL_DISCLAIMER}</span>
        </div>

      </div>
    </section>
  );
}
