'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/services';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Como funciona o atendimento na MK Tech?',
      answer:
        'O atendimento começa diretamente pelo WhatsApp. Você escolhe o serviço no catálogo ou relata sua necessidade. Conforme o caso, o serviço pode ser realizado presencialmente (combinando a entrega do aparelho) ou de forma 100% remota através de acesso assistido (para problemas de configuração, formatação lógica e documentos).',
    },
    {
      question: 'Onde devo entregar meu aparelho?',
      answer:
        'O ponto e os horários para entrega ou retirada de computadores, notebooks e celulares são combinados individualmente no momento do primeiro contato via WhatsApp, garantindo flexibilidade e segurança para ambas as partes.',
    },
    {
      question: 'Quanto tempo demora a execução de um serviço?',
      answer:
        'O prazo varia conforme o tipo de procedimento. Serviços de limpeza e otimização costumam levar entre 2 a 4 horas. Formatações completas de computadores levam em média de 3 a 6 horas. Já trabalhos acadêmicos (ABNT) e apresentações de slides dependem do volume de páginas e são alinhados previamente.',
    },
    {
      question: 'Os preços informados no site podem mudar?',
      answer:
        'A maioria dos preços no catálogo possui indicação "A partir de" ou "Sob avaliação". Isso ocorre porque o valor exato depende do diagnóstico técnico inicial (por exemplo: se o cliente precisa de backup de 500GB, o procedimento exige mais tempo). Qualquer ajuste de valor sempre é informado e aprovado por você antes do início do trabalho.',
    },
    {
      question: 'Como funciona o pagamento?',
      answer:
        'Aceitamos pagamentos via PIX, dinheiro e cartões de débito ou crédito. As condições e formas de pagamento são combinadas diretamente no atendimento ao finalizar ou entregar o serviço.',
    },
    {
      question: 'Existe garantia para os serviços realizados?',
      answer:
        'Sim! Todos os nossos serviços de software e formatação possuem garantia de funcionamento para as configurações executadas. Caso ocorra qualquer instabilidade decorrente do procedimento inicial dentro do período de garantia informado, oferecemos suporte para correção.',
    },
    {
      question: 'Posso solicitar um serviço que não aparece no catálogo?',
      answer:
        'Com certeza! O catálogo reúne os serviços mais frequentes, mas atendemos diversas outras demandas em tecnologia, automações, planilhas, softwares específicos e suporte a dispositivos. Basta nos chamar no WhatsApp e descrever o que você precisa.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#0B1222] relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101B35] border border-[#1E2E55] text-xs font-semibold text-[#39BFFF] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Perguntas frequentes.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Respostas claras para as principais dúvidas sobre atendimento, prazos e garantia.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#101B35]/80 border border-[#1E2E55] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-[#39BFFF] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-[#0B1222] border border-[#1E2E55] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#39BFFF]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1E2E55]/40 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-2xl bg-[#101B35]/50 border border-[#1E2E55] text-center flex flex-col items-center">
          <p className="text-sm font-semibold text-white mb-1">
            Não encontrou a resposta para a sua dúvida?
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Estamos prontos para te ajudar pelo WhatsApp oficial.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Olá, MK Tech! Gostaria de tirar uma dúvida que não encontrei na seção de perguntas frequentes do site.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1222] hover:bg-[#162447] text-xs sm:text-sm font-semibold text-[#39BFFF] hover:text-white border border-[#1E2E55] hover:border-[#39BFFF]/40 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar com o suporte agora</span>
          </a>
        </div>

      </div>
    </section>
  );
}
