'use client';

import React from 'react';
import {
  Clock,
  ArrowRight,
  MessageSquare,
  Smartphone,
  Laptop,
  Cpu,
  Wifi,
  HardDrive,
  FileText,
  Globe,
  Tag,
  Sparkles,
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  formatPrice,
  getAvailabilityBadge,
  buildServiceWhatsAppUrl,
} from '@/data/services';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  onRequestWhatsApp?: (service: ServiceItem) => void;
}

export default function ServiceCard({
  service,
  onSelect,
  onRequestWhatsApp,
}: ServiceCardProps) {
  const categoryInfo = CATEGORIES[service.category] || CATEGORIES.celulares;
  const availabilityBadge = getAvailabilityBadge(service.availability);

  const getCategoryIcon = () => {
    switch (service.category) {
      case 'celulares':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'computadores':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'hardware':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'redes':
        return <Wifi className="w-3.5 h-3.5" />;
      case 'armazenamento':
        return <HardDrive className="w-3.5 h-3.5" />;
      case 'documentos':
        return <FileText className="w-3.5 h-3.5" />;
      case 'solucoes-digitais':
        return <Globe className="w-3.5 h-3.5" />;
      default:
        return <Laptop className="w-3.5 h-3.5" />;
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRequestWhatsApp) {
      onRequestWhatsApp(service);
    } else {
      const url = buildServiceWhatsAppUrl(service);
      window.open(url, '_blank');
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl transition-all duration-300 p-5 sm:p-6 ${
        service.isPackage
          ? 'bg-gradient-to-b from-[#132247] via-[#0F1C3B] to-[#0A1326] border-2 border-[#39BFFF]/60 shadow-xl shadow-[#1769FF]/15 hover:border-[#39BFFF]'
          : 'bg-gradient-to-b from-[#101B35]/90 to-[#0D172E]/95 border border-[#1E2E55] hover:border-[#39BFFF]/40 hover:shadow-xl hover:shadow-black/40'
      }`}
    >
      {/* Top Meta: Category + Package/Popular Badge + Availability */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1222] border border-[#1E2E55] text-xs font-medium text-slate-300">
            <span className="text-[#39BFFF]">{getCategoryIcon()}</span>
            <span>{categoryInfo.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {service.isPackage && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#1769FF] to-[#39BFFF] text-white shadow-sm">
                <Tag className="w-3 h-3" />
                <span>Promoção</span>
              </span>
            )}

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${availabilityBadge.bgClass} ${availabilityBadge.textClass} ${availabilityBadge.borderClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${availabilityBadge.dotClass}`} />
              <span>{availabilityBadge.label}</span>
            </div>
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

        {/* Package extra savings indicator if present */}
        {service.packageSavings && (
          <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{service.packageSavings}</span>
          </div>
        )}

        {/* Estimated Time if available */}
        {service.estimatedTime && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
            <Clock className="w-3.5 h-3.5 text-[#39BFFF]" />
            <span>
              Prazo:{' '}
              <strong className="text-slate-300 font-medium">
                {service.estimatedTime}
              </strong>
            </span>
          </div>
        )}
      </div>

      {/* Footer Area: Price & Action Buttons */}
      <div className="pt-4 border-t border-[#1E2E55]/70 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              {service.priceType === 'under_review' ? 'Condição' : 'Preço estimado'}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-white">
              {formatPrice(service)}
            </span>
          </div>

          {service.featured && !service.isPackage && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1769FF]/20 text-[#39BFFF] border border-[#1769FF]/40">
              Mais procurado
            </span>
          )}
        </div>

        {/* Action Buttons */}
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
            onClick={handleWhatsAppClick}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white text-xs font-semibold shadow-md transition-all active:scale-95 ${
              service.isPackage
                ? 'bg-gradient-to-r from-[#1769FF] via-[#0E56DB] to-[#39BFFF] hover:opacity-95 shadow-[#1769FF]/30'
                : 'bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] shadow-[#1769FF]/20'
            }`}
            aria-label={`Solicitar atendimento via WhatsApp para ${service.name}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Solicitar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
