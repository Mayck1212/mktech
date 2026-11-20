'use client';

import React, { useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  Sparkles,
  ArrowUpDown,
  Smartphone,
  Laptop,
  FileText,
  Globe,
  SlidersHorizontal,
  MessageCircle,
} from 'lucide-react';
import {
  ServiceItem,
  ServiceCategory,
  AvailabilityStatus,
  CATEGORIES,
  WHATSAPP_NUMBER,
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
  // Filter & sort logic
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Search query filter (normalizes text, accents)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      result = result.filter((item) => {
        const nameNorm = item.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const descNorm = item.description
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const fullDescNorm = item.fullDescription
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const catNorm = CATEGORIES[item.category].name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const keywordsNorm = item.keywords.map((kw) =>
          kw
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        );

        return (
          nameNorm.includes(q) ||
          descNorm.includes(q) ||
          fullDescNorm.includes(q) ||
          catNorm.includes(q) ||
          keywordsNorm.some((kw) => kw.includes(q))
        );
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
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name, 'pt-BR');
      }
      // 'recommended' - featured first, then name
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return a.name.localeCompare(b.name, 'pt-BR');
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

  const categoryButtons: { id: ServiceCategory | 'todos'; label: string; icon?: React.ReactNode }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'celulares', label: 'Celulares', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'computadores', label: 'Computadores', icon: <Laptop className="w-3.5 h-3.5" /> },
    { id: 'documentos', label: 'Documentos & Slides', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'digitais', label: 'Serviços Digitais', icon: <Globe className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="catalogo" className="py-14 sm:py-20 bg-[#0B1222] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101B35] border border-[#1E2E55] text-xs font-semibold text-[#39BFFF] mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Catálogo Interativo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Todos os serviços.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Filtre por categoria, pesquise por sintomas ou ordene pelo melhor preço. Clique em qualquer serviço para ver detalhes e solicitar atendimento.
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
              placeholder="Pesquisar por nome, problema (ex: vírus, ABNT, tela preta, formatar)..."
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
                  {btn.id === 'todos' && (
                    <span className="ml-1 text-[11px] opacity-70">({services.length})</span>
                  )}
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
                <span>Em destaque</span>
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
                <option value="recommended">Recomendados</option>
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
                Filtros ativos • Encontrado(s):{' '}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Não encontramos nenhum serviço com os termos ou filtros selecionados. Tente buscar por palavras mais simples como &quot;formatação&quot;, &quot;celular&quot; ou &quot;ABNT&quot;.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2.5 rounded-xl bg-[#162447] hover:bg-[#1E2E55] text-xs sm:text-sm font-semibold text-white transition-all"
              >
                Limpar filtros de busca
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Olá, MK Tech! Pesquisei no site por "${searchQuery}" e não encontrei o serviço. Vocês realizam esse tipo de atendimento?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#0E56DB] text-xs sm:text-sm font-semibold text-white shadow-md hover:from-[#39BFFF] hover:to-[#1769FF] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar no WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
