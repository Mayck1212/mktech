'use client';

import React, { useMemo } from 'react';
import {
  Search,
  X,
  Sparkles,
  ArrowUpDown,
  Smartphone,
  Laptop,
  Cpu,
  Wifi,
  HardDrive,
  FileText,
  Globe,
  SlidersHorizontal,
  MessageCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import {
  ServiceItem,
  ServiceCategory,
  AvailabilityStatus,
  CATEGORIES,
  COMMERCIAL_DISCLAIMER,
  buildNotFoundWhatsAppUrl,
} from '@/data/services';
import ServiceCard from './ServiceCard';

interface CatalogSectionProps {
  services: ServiceItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ServiceCategory | 'todos';
  onCategoryChange: (category: ServiceCategory | 'todos') => void;
  selectedAvailability: AvailabilityStatus | 'todos';
  onAvailabilityChange: (availability: AvailabilityStatus | 'todos') => void;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'name-asc';
  onSortByChange: (sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'name-asc') => void;
  onlyFeatured: boolean;
  onOnlyFeaturedChange: (onlyFeatured: boolean) => void;
  onSelectService: (service: ServiceItem) => void;
  onRequestWhatsApp: (service: ServiceItem) => void;
}

export default function CatalogSection({
  services,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedAvailability,
  onAvailabilityChange,
  sortBy,
  onSortByChange,
  onlyFeatured,
  onOnlyFeaturedChange,
  onSelectService,
  onRequestWhatsApp,
}: CatalogSectionProps) {
  // Advanced tokenized search & filter logic
  const filteredServices = useMemo(() => {
    let result = [...services];

    if (searchQuery.trim().length > 0) {
      const cleanText = (str: string) =>
        str
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\w\s]/gi, ' ')
          .trim();

      const rawQ = cleanText(searchQuery);
      // Split into keywords excluding short stopwords
      const stopWords = new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'em', 'no', 'na', 'para', 'com', 'que', 'meu', 'minha']);
      const tokens = rawQ
        .split(/\s+/)
        .filter((t) => t.length > 1 && !stopWords.has(t));

      result = result.filter((item) => {
        const itemCategory = CATEGORIES[item.category];
        const corpus = cleanText(
          `${item.name} ${item.description} ${item.fullDescription} ${
            itemCategory ? itemCategory.name : ''
          } ${item.keywords.join(' ')}`
        );

        // Exact phrase match first
        if (corpus.includes(rawQ)) {
          return true;
        }

        // Token match: if user typed multiple words (e.g. "pc travando"), check if all tokens are present
        if (tokens.length > 0) {
          const matchAll = tokens.every((token) => corpus.includes(token));
          if (matchAll) return true;

          // Or if at least 60% of tokens match
          const matchedCount = tokens.filter((token) => corpus.includes(token)).length;
          return matchedCount >= Math.ceil(tokens.length * 0.6);
        }

        return false;
      });
    }

    // Category filter
    if (selectedCategory !== 'todos') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Availability filter
    if (selectedAvailability !== 'todos') {
      result = result.filter((item) => item.availability === selectedAvailability);
    }

    // Featured toggle
    if (onlyFeatured) {
      result = result.filter((item) => item.featured);
    }

    // Sorting
    result.sort((a, b) => {
      // Package always on top if recommended
      if (sortBy === 'recommended') {
        if (a.isPackage && !b.isPackage) return -1;
        if (!a.isPackage && b.isPackage) return 1;

        if (a.popularRank !== undefined && b.popularRank !== undefined) {
          return a.popularRank - b.popularRank;
        }
        if (a.popularRank !== undefined) return -1;
        if (b.popularRank !== undefined) return 1;

        return a.name.localeCompare(b.name, 'pt-BR');
      }

      if (sortBy === 'price-asc') {
        const pA = a.price === 0 ? 999999 : a.price;
        const pB = b.price === 0 ? 999999 : b.price;
        return pA - pB;
      }

      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }

      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name, 'pt-BR');
      }

      return 0;
    });

    return result;
  }, [
    services,
    searchQuery,
    selectedCategory,
    selectedAvailability,
    onlyFeatured,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'todos' ||
    selectedAvailability !== 'todos' ||
    onlyFeatured;

  const handleClearFilters = () => {
    onSearchChange('');
    onCategoryChange('todos');
    onAvailabilityChange('todos');
    onOnlyFeaturedChange(false);
    onSortByChange('recommended');
  };

  const categoryButtons: {
    id: ServiceCategory | 'todos';
    label: string;
    icon?: React.ReactNode;
  }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'celulares', label: 'Celulares e Android', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'computadores', label: 'Computadores e SO', icon: <Laptop className="w-3.5 h-3.5" /> },
    { id: 'hardware', label: 'Hardware e Peças', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'redes', label: 'Internet e Redes', icon: <Wifi className="w-3.5 h-3.5" /> },
    { id: 'armazenamento', label: 'Arquivos e Backup', icon: <HardDrive className="w-3.5 h-3.5" /> },
    { id: 'documentos', label: 'Documentos e ABNT', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'solucoes-digitais', label: 'Soluções Digitais', icon: <Globe className="w-3.5 h-3.5" /> },
  ];

  const notFoundWhatsAppUrl = buildNotFoundWhatsAppUrl(searchQuery);

  return (
    <section id="catalogo" className="py-14 sm:py-20 bg-[#0B1222] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101B35] border border-[#1E2E55] text-xs font-semibold text-[#39BFFF] mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Catálogo Geral de Serviços</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Todos os serviços.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Pesquise pelo sintoma do seu aparelho, filtre por categoria ou confira preços transparentes e opções sob orçamento.
          </p>
        </div>

        {/* Filter Controls Container */}
        <div className="rounded-2xl bg-[#101B35]/80 border border-[#1E2E55] p-4 sm:p-6 mb-8 shadow-xl shadow-black/30 backdrop-blur-md">
          
          {/* Row 1: Search Input */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquise por nome ou problema: Ex: 'Meu PC está travando', 'passar fotos', 'música pendrive'..."
              className="w-full bg-[#0B1222] border border-[#1E2E55] focus:border-[#39BFFF] focus:ring-2 focus:ring-[#39BFFF]/20 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-slate-400 transition-all outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Row 2: Category Pills (Horizontal Scroll on Mobile) */}
          <div className="mb-5 overflow-x-auto pb-1 scrollbar-none flex items-center gap-2">
            {categoryButtons.map((btn) => {
              const isSelected = selectedCategory === btn.id;
              const count =
                btn.id === 'todos'
                  ? services.length
                  : services.filter((s) => s.category === btn.id).length;

              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => onCategoryChange(btn.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1769FF] to-[#0E56DB] text-white shadow-md shadow-[#1769FF]/20 border border-[#39BFFF]/40'
                      : 'bg-[#0B1222] text-slate-300 hover:text-white hover:bg-[#162447] border border-[#1E2E55]'
                  }`}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                  <span className="ml-1 text-[11px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Row 3: Secondary Filters & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#1E2E55]/60">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Availability Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <select
                  value={selectedAvailability}
                  onChange={(e) =>
                    onAvailabilityChange(e.target.value as AvailabilityStatus | 'todos')
                  }
                  className="bg-[#0B1222] border border-[#1E2E55] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#39BFFF]"
                >
                  <option value="todos">Todos os status</option>
                  <option value="disponivel">Disponível</option>
                  <option value="sob_consulta">Sob consulta</option>
                  <option value="indisponivel">Indisponível</option>
                </select>
              </div>

              {/* Only Featured Toggle */}
              <button
                type="button"
                onClick={() => onOnlyFeaturedChange(!onlyFeatured)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  onlyFeatured
                    ? 'bg-[#1769FF]/20 text-[#39BFFF] border-[#1769FF]/50'
                    : 'bg-[#0B1222] text-slate-400 border-[#1E2E55] hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mais procurados</span>
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value as any)}
                className="bg-[#0B1222] border border-[#1E2E55] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#39BFFF]"
              >
                <option value="recommended">Recomendados / Populares</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name-asc">Ordem alfabética (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Active Filter Summary Bar */}
          {hasActiveFilters && (
            <div className="mt-4 pt-3 border-t border-[#1E2E55]/60 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <span>
                Filtros ativos • Exibindo:{' '}
                <strong className="text-white font-bold">{filteredServices.length}</strong> de {services.length} serviços
              </span>

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[#39BFFF] hover:underline flex items-center gap-1 font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpar todos os filtros</span>
              </button>
            </div>
          )}

        </div>

        {/* Services Grid or Empty State */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={onSelectService}
                onRequestWhatsApp={onRequestWhatsApp}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl bg-[#101B35]/60 border border-[#1E2E55] p-8 sm:p-12 text-center max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0B1222] border border-[#1E2E55] flex items-center justify-center text-slate-400 mb-4">
              <Search className="w-8 h-8 text-[#39BFFF]" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Nenhum serviço encontrado
            </h3>

            <p className="text-sm text-slate-400 mb-6 max-w-md">
              Não encontramos nenhum serviço com o termo {searchQuery ? `"${searchQuery}"` : 'selecionado'}. Você pode limpar os filtros ou chamar nosso suporte diretamente no WhatsApp para verificar seu caso.
            </p>

            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2.5 rounded-xl bg-[#162447] hover:bg-[#1E2E55] text-xs sm:text-sm font-semibold text-white transition-all mb-4"
            >
              Limpar filtros de busca
            </button>
          </div>
        )}

        {/* =========================================================================
            BLOCO OBRIGATÓRIO: "Não encontrou o serviço que procurava?"
            Logo abaixo da área de resultados da pesquisa
            ========================================================================= */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#101B35] via-[#122042] to-[#101B35] border border-[#1E2E55] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B1222] border border-[#39BFFF]/30 flex items-center justify-center text-[#39BFFF] shrink-0 shadow-inner">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                Não encontrou o serviço que procurava?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Conte pra gente o que está acontecendo. Podemos analisar seu problema e verificar como ajudar.
              </p>
            </div>
          </div>

          <a
            href={notFoundWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] hover:from-[#39BFFF] hover:to-[#1769FF] text-white text-sm font-bold shadow-lg shadow-[#1769FF]/20 active:scale-95 transition-all w-full md:w-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Conversar pelo WhatsApp</span>
          </a>
        </div>

        {/* Observação comercial discreta */}
        <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-[#101B35]/40 border border-[#1E2E55]/60 text-slate-400 text-xs">
          <Info className="w-4 h-4 text-[#39BFFF] shrink-0 mt-0.5" />
          <span>{COMMERCIAL_DISCLAIMER}</span>
        </div>

      </div>
    </section>
  );
}
