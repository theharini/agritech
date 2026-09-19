"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { WeatherAlertWidget } from "@/components/WeatherAlertWidget";
import { FertilizerRecommendationModal } from "@/components/FertilizerRecommendationModal";
import { FarmersSection } from "@/components/FarmersSection";
import { BuyersSection } from "@/components/BuyersSection";
import { EquipmentSection } from "@/components/EquipmentSection";
import { GrocerySection } from "@/components/GrocerySection";
import { AgronomistSection } from "@/components/AgronomistSection";
import { FinanceSection } from "@/components/FinanceSection";
import { MyActivityDashboard } from "@/components/MyActivityDashboard";
import { MarketPriceTrends } from "@/components/MarketPriceTrends";
import { ProfitLossAnalytics } from "@/components/ProfitLossAnalytics";
import { SchemesSection } from "@/components/SchemesSection";
import { CommunityForum } from "@/components/CommunityForum";
import { AgNewsAndBlog } from "@/components/AgNewsAndBlog";
import { FAQSection } from "@/components/FAQSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AuthModal } from "@/components/AuthModal";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isFertilizerModalOpen, setIsFertilizerModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Universal Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {activeTab === "home" && (
          <div className="space-y-14">
            {/* Hero Section */}
            <HeroSection
              onOpenFertilizerModal={() => setIsFertilizerModalOpen(true)}
              onNavigateToForum={() => setActiveTab("forum")}
              onNavigateToMarket={() => setActiveTab("market")}
            />

            {/* Weather & Climate Alerts */}
            <WeatherAlertWidget />

            {/* Farmers Section */}
            <section id="farmers-section" className="pt-4 border-t border-theme-border">
              <FarmersSection onNavigateToMarket={() => setActiveTab("market")} />
            </section>

            {/* Buyers & Retailers Section */}
            <section id="buyers-section" className="pt-8 border-t border-theme-border">
              <BuyersSection />
            </section>

            {/* Equipment Suppliers Section */}
            <section id="equipment-section" className="pt-8 border-t border-theme-border">
              <EquipmentSection />
            </section>

            {/* Grocery Sellers Section */}
            <section id="grocery-section" className="pt-8 border-t border-theme-border">
              <GrocerySection />
            </section>

            {/* Agronomists & Advisors Section */}
            <section id="agronomist-section" className="pt-8 border-t border-theme-border">
              <AgronomistSection />
            </section>

            {/* Finance & Insurance Section */}
            <section id="finance-section" className="pt-8 border-t border-theme-border">
              <FinanceSection />
            </section>

            {/* Quick Mandi Market Trends Preview */}
            <section className="pt-8 border-t border-theme-border">
              <MarketPriceTrends />
            </section>

            {/* Quick Profit & Loss Analytics Preview */}
            <section className="pt-8 border-t border-theme-border">
              <ProfitLossAnalytics />
            </section>
          </div>
        )}

        {activeTab === "about" && <AboutSection />}

        {activeTab === "blog" && <AgNewsAndBlog defaultView="blog" />}

        {activeTab === "agNews" && <AgNewsAndBlog defaultView="news" />}

        {activeTab === "schemes" && <SchemesSection />}

        {activeTab === "forum" && <CommunityForum />}

        {activeTab === "services" && (
          <ServicesSection onSelectService={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === "myActivity" && <MyActivityDashboard />}

        {activeTab === "market" && <MarketPriceTrends />}

        {activeTab === "analytics" && <ProfitLossAnalytics />}

        {activeTab === "faq" && <FAQSection />}
      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Embedded RAG Floating Chatbot Widget (Present on All Pages) */}
      <ChatbotWidget />

      {/* Fertilizer Recommendation Calculator Modal */}
      <FertilizerRecommendationModal
        isOpen={isFertilizerModalOpen}
        onClose={() => setIsFertilizerModalOpen(false)}
      />

      {/* Role-Based Authentication & Demo Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
