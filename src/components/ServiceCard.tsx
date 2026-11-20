'use client';

import React from 'react';
import {
  Clock,
  ArrowRight,
  MessageSquare,
  Smartphone,
  Laptop,
  FileText,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  formatPrice,
  getAvailabilityBadge,
} from '@/data/services';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  onRequestWhatsApp: (service: ServiceItem) => void;
}

export default function ServiceCard({
  service,
  onSelect,
  onRequestWhatsApp,
}: ServiceCardProps) {
  const categoryInfo = CATEGORIES[service.category];
  const availabilityBadge = getAvailabilityBadge(service.availability);

  const getCategoryIcon = () => {
    switch (service.category) {
      case 'celulares':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'computadores':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'documentos':
        return <FileText className="w-3.5 h-3.5" />;
      case 'digitais':
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#101B35]/90 to-[#0D172E]/95 border border-[#1E2E55] hover:border-[#39BFFF]/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 p-5 sm:p-6">
      
      {/* Top Meta: Category + Availability Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1222] border border-[#1E2E55] text-xs font-medium text-slate-300">
            <span className="text-[#39BFFF]">{getCategoryIcon()}</span>
            <span>{categoryInfo.name}</span>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${availabilityBadge.bgClass} ${availabilityBadge.textClass} ${availabilityBadge.borderClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${availabilityBadge.dotClass}`} />
            <span>{availabilityBadge.label}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#39BFFF] transition-colors leading-snug">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Estimated Time */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
          <Clock className="w-3.5 h-3.5 text-[#39BFFF]" />
          <span>Prazo estimado: <strong className="text-slate-300 font-medium">{service.estimatedTime}</strong></span>
        </div>
      </div>

      {/* Footer Area: Price & Action Buttons */}
      <div className="pt-4 border-t border-[#1E2E55]/70 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Valor do serviço
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-white">
              {formatPrice(service.price, service.priceType)}
            </span>
          </div>

          {service.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1769FF]/20 text-[#39BFFF] border border-[#1769FF]/40">
              Popular
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            type="button"
            onClick={() => onSelect(service)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0B1222] hover:bg-[#162447] text-slate-200 hover:text-white border border-[#1E2E55] hover:border-[#39BFFF]/50 text-xs font-semibold transition-all active:scale-95"
            aria-label={`Ver detalhes de ${service.name}`}
          >
            <span>Ver detalhes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onRequestWhatsApp(service)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-xs font-semibold shadow-md shadow-[#1769FF]/20 transition-all active:scale-95"
            aria-label={`Solicitar atendimento para ${service.name}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Solicitar</span>
          </button>
        </div>
      </div>

    </div>
  );
}
