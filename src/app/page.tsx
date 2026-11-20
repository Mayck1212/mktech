'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedServices from '@/components/FeaturedServices';
import CatalogSection from '@/components/CatalogSection';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import {
  INITIAL_SERVICES,
  ServiceItem,
  ServiceCategory,
  AvailabilityStatus,
  buildServiceWhatsAppUrl,
} from '@/data/services';

export default function HomePage() {
  // Master services list from centralized file
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'todos'>('todos');
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityStatus | 'todos'>('todos');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'name-asc'>('recommended');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Modal state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenDetails = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleOpenWhatsAppRequest = (service: ServiceItem) => {
    const url = buildServiceWhatsAppUrl(service);
    window.open(url, '_blank');
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleSearchFromHero = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: ServiceCategory | 'todos') => {
    setSelectedCategory(category);
  };

  const handleExploreAll = () => {
    setSelectedCategory('todos');
    setSelectedAvailability('todos');
    setOnlyFeatured(false);
    setSearchQuery('');
    const catalogEl = document.querySelector('#catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B1222] text-[#F8FAFC] flex flex-col selection:bg-[#1769FF]/30 selection:text-white">
      {/* Navigation Header */}
      <Header
        onCategorySelect={handleCategorySelect}
        onSearchClick={() => {
          const catalogEl = document.querySelector('#catalogo');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Cartoon Character */}
        <Hero
          searchQuery={searchQuery}
          onSearchSubmit={handleSearchFromHero}
        />

        {/* 2. Categories Section (7 interactive cards) */}
        <CategoriesSection
          services={services}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 3. Featured Services Section (8 most searched services) */}
        <FeaturedServices
          services={services}
          onSelectService={handleOpenDetails}
          onRequestWhatsApp={handleOpenWhatsAppRequest}
          onExploreAll={handleExploreAll}
        />

        {/* 4. Complete Interactive Service Catalog & 'Não encontrou?' WhatsApp Block */}
        <CatalogSection
          services={services}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={setSelectedAvailability}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onlyFeatured={onlyFeatured}
          onOnlyFeaturedChange={setOnlyFeatured}
          onSelectService={handleOpenDetails}
          onRequestWhatsApp={handleOpenWhatsAppRequest}
        />

        {/* 5. How it Works (5 steps) */}
        <HowItWorks />

        {/* 6. FAQ (Accordion) */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={handleCloseModal}
      />
    </div>
  );
}
