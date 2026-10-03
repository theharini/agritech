"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EvaluationLabView } from "@/components/evaluation/EvaluationLabView";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AuthModal } from "@/components/AuthModal";
import { useRouter } from "next/navigation";

export default function EvaluationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("evaluationLab");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "home") router.push("/");
    else if (tab === "missionControl") router.push("/mission-control");
    else setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EvaluationLabView />
      </main>

      <Footer setActiveTab={handleTabChange} />
      <ChatbotWidget onLaunchMission={() => router.push("/mission-control")} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
