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
import { MissionControlDashboard } from "@/components/mission/MissionControlDashboard";
import { EvaluationLabView } from "@/components/evaluation/EvaluationLabView";
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
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

            {/* AgriMission Agent Innovation Highlight Banner */}
            <div className="rounded-3xl border border-theme-primary/40 bg-gradient-to-r from-theme-card via-theme-surface to-theme-card p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary border border-theme-primary/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    New Innovation
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400">
                    Decision-Support & Safe Workflow Layer
                  </span>
                </div>
                <h3 className="text-lg font-black text-theme-text">
                  {language === "ta"
                    ? "அக்ரிமிஷன் ஏஜென்ட் — விவசாய இலக்குகளிலிருந்து செயல் திட்டங்கள் வரை"
                    : "AgriMission Agent — From Goals to Verified Action Plans"}
                </h3>
                <p className="text-xs text-theme-muted leading-relaxed">
                  {language === "ta"
                    ? "சந்தை விலை, போக்குவரத்து கட்டணம் மற்றும் வாங்குபவரின் நம்பகத்தன்மையை ஒப்பிட்டு பாதுகாப்பான செயல் திட்டத்தை தானாக உருவாக்கும் முகமை."
                    : "Converts complex farmer selling goals into multi-constraint, verified action plans with deterministic net realization formulas and safe human approval gates."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setActiveTab("missionControl")}
                  className="px-4 py-2.5 rounded-xl bg-theme-primary text-theme-bg font-extrabold text-xs hover:bg-theme-primary-hover transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>{language === "ta" ? "பணி கட்டுப்பாடு" : "Launch AgriMission"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab("evaluationLab")}
                  className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-bold text-xs hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{language === "ta" ? "மதிப்பீட்டு கூடம்" : "Evaluation Lab"}</span>
                </button>
              </div>
            </div>

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

        {activeTab === "missionControl" && (
          <MissionControlDashboard onNavigateToEvaluation={() => setActiveTab("evaluationLab")} />
        )}

        {activeTab === "evaluationLab" && <EvaluationLabView />}

        {activeTab === "faq" && <FAQSection />}
      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Embedded RAG Floating Chatbot Widget (Present on All Pages) */}
      <ChatbotWidget onLaunchMission={() => setActiveTab("missionControl")} />

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
