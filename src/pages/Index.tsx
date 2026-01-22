import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DataIngestionSection } from "@/components/DataIngestionSection";
import { DataStandardizationSection } from "@/components/DataStandardizationSection";
import { DataRepositorySection } from "@/components/DataRepositorySection";
import { VisualizationSection } from "@/components/VisualizationSection";
import { AIInsightsSection } from "@/components/AIInsightsSection";
import { ChatbotSection } from "@/components/ChatbotSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <DataIngestionSection />
        <DataStandardizationSection />
        <DataRepositorySection />
        <VisualizationSection />
        <AIInsightsSection />
        <ChatbotSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
