import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import BrokerAuth from "./BrokerAuth";
import AboutSection from "./components/AboutSection";
import AccessDenied from "./components/AccessDenied";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin, {
  clearAdminSession,
  getAdminSession,
} from "./components/AdminLogin";
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

type View =
  | "public"
  | "admin-login"
  | "admin-dashboard"
  | "access-denied"
  | "broker";

const ADMIN_SECRET_HASH = "#admin-maha-secure";

function resolveHashView(hash: string): View | null {
  if (hash === ADMIN_SECRET_HASH) {
    return getAdminSession() ? "admin-dashboard" : "admin-login";
  }
  if (hash === "#admin" || hash === "#admin-login") {
    return getAdminSession() ? "admin-dashboard" : "access-denied";
  }
  if (
    hash === "#broker" ||
    hash === "#broker-login" ||
    hash === "#broker-signup"
  ) {
    return "broker";
  }
  return null;
}

export default function App() {
  const [view, setView] = useState<View>("public");
  const [cityFilter, setCityFilter] = useState("All Cities");

  useEffect(() => {
    const resolved = resolveHashView(window.location.hash);
    if (resolved) setView(resolved);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const resolved = resolveHashView(window.location.hash);
      if (resolved) setView(resolved);
      else if (window.location.hash === "") setView("public");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleLoginSuccess = () => {
    window.location.hash = "";
    setView("admin-dashboard");
  };

  const handleLogout = () => {
    clearAdminSession();
    setView("public");
    window.location.hash = "";
  };

  const handleAdminDashboardClick = () => {
    if (getAdminSession()) {
      setView((v) => (v === "admin-dashboard" ? "public" : "admin-dashboard"));
    } else {
      window.location.hash = "admin-maha-secure";
    }
  };

  const handleBackToPublic = () => {
    window.location.hash = "";
    setView("public");
  };

  // ── Broker view ──────────────────────────────────────────────────────────
  if (view === "broker") {
    return (
      <>
        <BrokerAuth onBack={handleBackToPublic} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  // ── Admin login view ─────────────────────────────────────────────────────
  if (view === "admin-login") {
    return (
      <>
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackToPublic}
        />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  if (view === "access-denied") {
    return (
      <>
        <AccessDenied onBack={handleBackToPublic} />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  const isAdminView = view === "admin-dashboard";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        onAdminClick={handleAdminDashboardClick}
        onLogout={handleLogout}
        isAdminView={isAdminView}
        isAdminSession={!!getAdminSession()}
      />

      {isAdminView ? (
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

          <Footer
            onAdminClick={() => {
              window.location.hash = "admin-maha-secure";
            }}
          />
        </main>
      )}

      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}
