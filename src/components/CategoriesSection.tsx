'use client';

import React from 'react';
import { Smartphone, Laptop, FileText, Globe, ArrowRight } from 'lucide-react';
import { CATEGORIES, ServiceCategory, ServiceItem } from '@/data/services';

interface CategoriesSectionProps {
  services: ServiceItem[];
  selectedCategory: ServiceCategory | 'todos';
  onSelectCategory: (category: ServiceCategory | 'todos') => void;
}

export default function CategoriesSection({
  services,
  selectedCategory,
  onSelectCategory,
}: CategoriesSectionProps) {
  const getIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'celulares':
        return <Smartphone className="w-6 h-6 text-[#1769FF]" />;
      case 'computadores':
        return <Laptop className="w-6 h-6 text-[#39BFFF]" />;
      case 'documentos':
        return <FileText className="w-6 h-6 text-[#1769FF]" />;
      case 'digitais':
        return <Globe className="w-6 h-6 text-[#39BFFF]" />;
    }
  };

  const handleCategoryClick = (catId: ServiceCategory) => {
    onSelectCategory(catId);
    const catalogElement = document.querySelector('#catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-12 sm:py-16 bg-[#0B1222] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101B35] border border-[#1E2E55] text-xs font-semibold text-[#39BFFF] mb-3">
              <span>Áreas de Atuação</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Encontre o serviço que você precisa.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Selecione uma categoria abaixo para filtrar instantaneamente todas as soluções disponíveis na MK Tech.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              type="button"
              onClick={() => {
                onSelectCategory('todos');
                const catalogEl = document.querySelector('#catalogo');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs sm:text-sm font-semibold text-[#39BFFF] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Ver catálogo completo ({services.length} serviços)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Grid (4 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {(Object.keys(CATEGORIES) as ServiceCategory[]).map((catId) => {
            const category = CATEGORIES[catId];
            const count = services.filter((s) => s.category === catId).length;
            const isSelected = selectedCategory === catId;

            return (
              <div
                key={catId}
                onClick={() => handleCategoryClick(catId)}
                className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#101B35] to-[#142347] border-2 border-[#39BFFF] shadow-lg shadow-[#1769FF]/20 transform -translate-y-1'
                    : 'bg-[#101B35]/70 hover:bg-[#101B35] border border-[#1E2E55] hover:border-[#39BFFF]/50 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Service Count Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1222] border border-[#1E2E55] flex items-center justify-center group-hover:border-[#39BFFF]/50 transition-colors shadow-inner">
                      {getIcon(catId)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0B1222] text-slate-300 border border-[#1E2E55]">
                      {count} {count === 1 ? 'serviço' : 'serviços'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#39BFFF] transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {category.shortDescription}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#39BFFF] group-hover:text-white transition-colors pt-3 border-t border-[#1E2E55]/60">
                  <span>Visualizar serviços</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
