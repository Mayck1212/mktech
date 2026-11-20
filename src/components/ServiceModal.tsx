'use client';

import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Laptop,
  Cpu,
  Wifi,
  HardDrive,
  FileText,
  Globe,
  Tag,
  Info,
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  formatPrice,
  getAvailabilityBadge,
  buildServiceWhatsAppUrl,
  COMMERCIAL_DISCLAIMER,
} from '@/data/services';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!service) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const categoryInfo = CATEGORIES[service.category] || CATEGORIES.celulares;
  const availabilityBadge = getAvailabilityBadge(service.availability);

  const getCategoryIcon = () => {
    switch (service.category) {
      case 'celulares':
        return <Smartphone className="w-4 h-4" />;
      case 'computadores':
        return <Laptop className="w-4 h-4" />;
      case 'hardware':
        return <Cpu className="w-4 h-4" />;
      case 'redes':
        return <Wifi className="w-4 h-4" />;
      case 'armazenamento':
        return <HardDrive className="w-4 h-4" />;
      case 'documentos':
        return <FileText className="w-4 h-4" />;
      case 'solucoes-digitais':
        return <Globe className="w-4 h-4" />;
      default:
        return <Laptop className="w-4 h-4" />;
    }
  };

  const handleOpenWhatsApp = () => {
    const url = buildServiceWhatsAppUrl(service);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0F1A34] border border-[#1E2E55] shadow-2xl shadow-black overflow-hidden animate-scaleUp">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2E55] bg-[#0B1222]/90">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#101B35] border border-[#1E2E55] text-xs font-medium text-slate-300">
              <span className="text-[#39BFFF]">{getCategoryIcon()}</span>
              <span>{categoryInfo.name}</span>
            </div>

            {service.isPackage && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#1769FF] to-[#39BFFF] text-white">
                <Tag className="w-3 h-3" />
                <span>Pacote Promocional</span>
              </span>
            )}

            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${availabilityBadge.bgClass} ${availabilityBadge.textClass} ${availabilityBadge.borderClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${availabilityBadge.dotClass}`} />
              <span>{availabilityBadge.label}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#162447] transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          <div>
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2"
            >
              {service.name}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {service.fullDescription || service.description}
            </p>
          </div>

          {/* Price & Time Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0B1222] border border-[#1E2E55]">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                {service.priceType === 'under_review' ? 'Condição Comercial' : 'Valor Estimado'}
              </span>
              <span className="text-xl font-black text-white">
                {formatPrice(service)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {service.priceType === 'starting_at' && 'Valor inicial sujeito à avaliação do volume de dados ou complexidade.'}
                {service.priceType === 'under_review' && 'Preço sob medida definido após diagnóstico técnico prévio.'}
                {service.priceType === 'fixed' && 'Preço fixo de mão de obra sem surpresas.'}
              </span>
            </div>

            {service.estimatedTime && (
              <div className="sm:border-l sm:border-[#1E2E55] sm:pl-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                  Prazo Estimado
                </span>
                <div className="flex items-center gap-1.5 text-base font-bold text-white mt-1">
                  <Clock className="w-4 h-4 text-[#39BFFF]" />
                  <span>{service.estimatedTime}</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Alinhado diretamente no início do atendimento.
                </span>
              </div>
            )}
          </div>

          {/* What is Included Checklist (if any) */}
          {service.included && service.included.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>O que está incluído no procedimento:</span>
              </h3>
              <ul className="space-y-1.5">
                {service.included.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#0B1222]/50 p-2.5 rounded-lg border border-[#1E2E55]/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#39BFFF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Important Information */}
          {service.importantInfo && (
            <div className="p-3.5 rounded-xl bg-[#1769FF]/10 border border-[#1769FF]/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#39BFFF] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300">
                <strong className="text-white block font-semibold mb-0.5">
                  Observações importantes:
                </strong>
                {service.importantInfo}
              </div>
            </div>
          )}

          {/* Commercial Note */}
          <div className="p-3 rounded-xl bg-[#0B1222]/60 border border-[#1E2E55] flex items-start gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>{COMMERCIAL_DISCLAIMER}</span>
          </div>

          {/* Security reassurance */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              Atendimento seguro: a MK Tech nunca solicita suas senhas pessoais, códigos SMS ou credenciais bancárias.
            </span>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-t border-[#1E2E55] bg-[#0B1222]/90">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              Solicitação direta
            </span>
            <span className="text-xs text-slate-300">
              WhatsApp oficial: <strong className="text-white">(38) 99912-5035</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#0B1222] hover:bg-[#162447] text-slate-300 hover:text-white border border-[#1E2E55] text-xs font-semibold transition-all"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1769FF]/20 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar pelo WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
