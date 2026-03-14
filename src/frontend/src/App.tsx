import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminDashboard from "./components/AdminDashboard";
import AllListings from "./components/AllListings";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import FeaturedProperties from "./components/FeaturedProperties";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SellerForm from "./components/SellerForm";
import TrustSection from "./components/TrustSection";
import WhatsAppButton from "./components/WhatsAppButton";
import { useIsAdmin } from "./hooks/useQueries";

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [cityFilter, setCityFilter] = useState("All Cities");
  const { data: isAdmin } = useIsAdmin();

  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdminView((v) => !v);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        onAdminClick={handleAdminClick}
        isAdminView={isAdminView && !!isAdmin}
      />

      {isAdminView && isAdmin ? (
        <AdminDashboard />
      ) : (
        <main>
          <Hero onCityFilter={setCityFilter} />

          <section id="featured">
            <FeaturedProperties />
          </section>

          <AllListings cityFilter={cityFilter} />

          <SellerForm />

          <section id="about">
            <AboutSection />
          </section>

          <TrustSection />

          <FAQSection />

          <ContactSection />

          <Footer />
        </main>
      )}

      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}
