'use client';

import React from 'react';
import {
  Search,
  FileCheck2,
  Send,
  Handshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/services';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Escolha o serviço',
      description: 'Navegue pelas categorias ou use o campo de busca para encontrar exatamente o que você precisa.',
      icon: <Search className="w-6 h-6 text-[#1769FF]" />,
    },
    {
      step: '02',
      title: 'Consulte detalhes e prazos',
      description: 'Confira os valores transparentes, o que está incluso no procedimento e o tempo estimado de execução.',
      icon: <FileCheck2 className="w-6 h-6 text-[#39BFFF]" />,
    },
    {
      step: '03',
      title: 'Envie sua solicitação',
      description: 'Preencha seus dados em poucos segundos e abra a conversa estruturada direto no WhatsApp da MK Tech.',
      icon: <Send className="w-6 h-6 text-[#1769FF]" />,
    },
    {
      step: '04',
      title: 'Combine o atendimento',
      description: 'Defina a melhor forma: entrega presencial do equipamento ou suporte remoto seguro na sua tela.',
      icon: <Handshake className="w-6 h-6 text-[#39BFFF]" />,
    },
    {
      step: '05',
      title: 'Receba seu serviço',
      description: 'Aparelho ou documento finalizado com rapidez, padrão de excelência e suporte dedicado.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
    },
  ];

  return (
    <section id="como-funciona" className="py-14 sm:py-20 bg-gradient-to-b from-[#0B1222] via-[#0E162E] to-[#0B1222] relative border-t border-[#1E2E55]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101B35] border border-[#1E2E55] text-xs font-semibold text-[#39BFFF] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Processo Simples e Transparente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Como funciona o atendimento na MK Tech.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Sem burocracia, sem filas e com comunicação direta pelo WhatsApp do início ao fim.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col p-6 rounded-2xl bg-[#101B35]/70 border border-[#1E2E55] hover:border-[#39BFFF]/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1222] border border-[#1E2E55] group-hover:border-[#39BFFF]/40 flex items-center justify-center shadow-inner transition-colors">
                  {item.icon}
                </div>
                <span className="text-2xl font-black text-slate-600 group-hover:text-[#39BFFF] transition-colors">
                  {item.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>

              {/* Subtle bottom indicator */}
              <div className="mt-4 pt-3 border-t border-[#1E2E55]/50 flex items-center gap-1 text-[11px] font-semibold text-slate-500 group-hover:text-[#39BFFF] transition-colors">
                <span>Passo {index + 1} de 5</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner below steps */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#101B35] via-[#142347] to-[#101B35] border border-[#1E2E55] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              Tem alguma dúvida sobre o seu problema específico?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Nosso atendimento está disponível para orientar você antes de fechar qualquer serviço.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Olá, MK Tech! Gostaria de entender melhor como funciona o atendimento para o meu caso.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-sm font-bold shadow-lg shadow-[#1769FF]/20 active:scale-95 transition-all"
          >
            <span>Conversar no WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
