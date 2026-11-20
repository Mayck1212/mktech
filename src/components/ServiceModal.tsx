'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Laptop,
  FileText,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  formatPrice,
  getAvailabilityBadge,
  buildWhatsAppUrl,
  WHATSAPP_NUMBER,
} from '@/data/services';

interface ServiceModalProps {
  service: ServiceItem | null;
  initialMode?: 'details' | 'request';
  onClose: () => void;
}

export default function ServiceModal({
  service,
  initialMode = 'details',
  onClose,
}: ServiceModalProps) {
  const [mode, setMode] = useState<'details' | 'request'>(initialMode);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; problem?: string }>({});

  useEffect(() => {
    setMode(initialMode);
    setFormErrors({});
  }, [service, initialMode]);

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

  const categoryInfo = CATEGORIES[service.category];
  const availabilityBadge = getAvailabilityBadge(service.availability);

  const getCategoryIcon = () => {
    switch (service.category) {
      case 'celulares':
        return <Smartphone className="w-4 h-4" />;
      case 'computadores':
        return <Laptop className="w-4 h-4" />;
      case 'documentos':
        return <FileText className="w-4 h-4" />;
      case 'digitais':
        return <Globe className="w-4 h-4" />;
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; problem?: string } = {};

    if (!customerName.trim()) {
      errors.name = 'Por favor, informe seu nome para o atendimento.';
    }

    if (!problemDescription.trim()) {
      errors.problem = 'Por favor, descreva brevemente o problema ou o que precisa.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const url = buildWhatsAppUrl({
      customerName,
      serviceName: service.name,
      deviceModel: deviceModel.trim() || undefined,
      problemDescription,
      additionalInfo: additionalInfo.trim() || undefined,
    });

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
          <div className="flex items-center gap-2">
            {mode === 'request' && (
              <button
                type="button"
                onClick={() => setMode('details')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#162447] mr-1"
                aria-label="Voltar aos detalhes"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#101B35] border border-[#1E2E55] text-xs font-medium text-slate-300">
              <span className="text-[#39BFFF]">{getCategoryIcon()}</span>
              <span>{categoryInfo.name}</span>
            </div>

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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {mode === 'details' ? (
            /* --- VIEW: SERVICE DETAILS --- */
            <>
              <div>
                <h2
                  id="modal-title"
                  className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2"
                >
                  {service.name}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Price & Time Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0B1222] border border-[#1E2E55]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                    Valor Estimado
                  </span>
                  <span className="text-xl font-black text-white">
                    {formatPrice(service.price, service.priceType)}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {service.priceType === 'starting_at' && 'Pode variar conforme a complexidade avaliada.'}
                    {service.priceType === 'under_review' && 'Preço definido após diagnóstico técnico inicial.'}
                    {service.priceType === 'fixed' && 'Valor fixo sem surpresas.'}
                  </span>
                </div>

                <div className="sm:border-l sm:border-[#1E2E55] sm:pl-4">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                    Prazo Estimado
                  </span>
                  <div className="flex items-center gap-1.5 text-base font-bold text-white mt-1">
                    <Clock className="w-4 h-4 text-[#39BFFF]" />
                    <span>{service.estimatedTime}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Combinado diretamente no atendimento.
                  </span>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>O que está incluído no serviço:</span>
                </h3>
                <ul className="space-y-2">
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

              {/* Important Notes */}
              {service.importantInfo && (
                <div className="p-4 rounded-xl bg-[#1769FF]/10 border border-[#1769FF]/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#39BFFF] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-300">
                    <strong className="text-white block font-semibold mb-0.5">
                      Observação importante:
                    </strong>
                    {service.importantInfo}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* --- VIEW: WHATSAPP REQUEST FORM --- */
            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Solicitar Atendimento
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Preencha as informações abaixo para gerarmos sua mensagem formatada no WhatsApp oficial da MK Tech.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B1222] border border-[#1E2E55] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Serviço Selecionado:</span>
                  <span className="text-sm font-bold text-white">{service.name}</span>
                </div>
                <span className="text-xs font-semibold text-[#39BFFF]">
                  {formatPrice(service.price, service.priceType)}
                </span>
              </div>

              {/* Client Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  placeholder="Ex: Carlos Silva"
                  className={`w-full bg-[#0B1222] border ${
                    formErrors.name ? 'border-rose-500' : 'border-[#1E2E55]'
                  } rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39BFFF]`}
                />
                {formErrors.name && (
                  <span className="text-xs text-rose-400 mt-1 block">{formErrors.name}</span>
                )}
              </div>

              {/* Device Model (Conditional emphasis) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Modelo do Aparelho ou Dispositivo {service.deviceRequired ? '*' : '(Opcional)'}
                </label>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder="Ex: Samsung Galaxy S21, Notebook Dell Inspiron, iPhone 12..."
                  className="w-full bg-[#0B1222] border border-[#1E2E55] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39BFFF]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Ajuda a agilizar o diagnóstico e estimativa de tempo.
                </span>
              </div>

              {/* Problem / Needs Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Descreva o problema ou o que você precisa *
                </label>
                <textarea
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => {
                    setProblemDescription(e.target.value);
                    if (formErrors.problem) setFormErrors({ ...formErrors, problem: undefined });
                  }}
                  placeholder="Ex: O computador está travando muito ao iniciar e preciso dos meus arquivos salvos..."
                  className={`w-full bg-[#0B1222] border ${
                    formErrors.problem ? 'border-rose-500' : 'border-[#1E2E55]'
                  } rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39BFFF]`}
                />
                {formErrors.problem && (
                  <span className="text-xs text-rose-400 mt-1 block">{formErrors.problem}</span>
                )}
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Observações adicionais (Opcional)
                </label>
                <input
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Ex: Prefiro atendimento no período da tarde; tenho urgência..."
                  className="w-full bg-[#0B1222] border border-[#1E2E55] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#39BFFF]"
                />
              </div>

              {/* Security Reassurance */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Segurança garantida: Nunca solicitamos suas senhas pessoais, códigos SMS ou credenciais bancárias.
                </span>
              </div>

              {/* Action Buttons for Form */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#1E2E55]">
                <button
                  type="button"
                  onClick={() => setMode('details')}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1222] text-slate-300 hover:text-white border border-[#1E2E55] text-xs font-semibold"
                >
                  Voltar aos detalhes
                </button>

                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-sm font-bold shadow-lg shadow-[#1769FF]/30 active:scale-98 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Solicitação no WhatsApp</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Bottom Action Bar (in details mode) */}
        {mode === 'details' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-t border-[#1E2E55] bg-[#0B1222]/90">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-slate-400">
                Pronto para resolver?
              </span>
              <span className="text-xs text-slate-300">
                Atendimento rápido via WhatsApp: <strong className="text-white">(38) 99912-5035</strong>
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
                onClick={() => setMode('request')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1769FF]/20 active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Solicitar Atendimento</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
