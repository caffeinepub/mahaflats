import { Button } from "@/components/ui/button";
import { Building2, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  onAdminClick: () => void;
  onLogout: () => void;
  isAdminView: boolean;
  isAdminSession: boolean;
}

export default function Navbar({
  onAdminClick,
  onLogout,
  isAdminView,
  isAdminSession,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Maha<span className="text-gradient">Flats</span>
            <span className="text-muted-foreground text-sm font-body font-normal">
              .com
            </span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            data-ocid="nav.home_link"
            onClick={() => scrollTo("hero")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            data-ocid="nav.listings_link"
            onClick={() => scrollTo("listings")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Listings
          </button>
          <button
            type="button"
            data-ocid="nav.list_property_link"
            onClick={() => scrollTo("list-property")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            List Property
          </button>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Admin controls (only visible when admin is logged in) */}
        <div className="hidden md:flex items-center gap-3">
          {isAdminSession && (
            <>
              <Button
                data-ocid="nav.admin_link"
                variant={isAdminView ? "default" : "outline"}
                size="sm"
                onClick={onAdminClick}
                className={
                  isAdminView
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground"
                }
              >
                <LayoutDashboard className="w-4 h-4 mr-1" />
                {isAdminView ? "Public View" : "Admin Dashboard"}
              </Button>
              <Button
                data-ocid="nav.logout_button"
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => scrollTo("hero")}
                className="text-left text-sm text-muted-foreground hover:text-foreground"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollTo("listings")}
                className="text-left text-sm text-muted-foreground hover:text-foreground"
              >
                Listings
              </button>
              <button
                type="button"
                onClick={() => scrollTo("list-property")}
                className="text-left text-sm text-muted-foreground hover:text-foreground"
              >
                List Property
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="text-left text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </button>
              {isAdminSession && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onAdminClick();
                      setMobileOpen(false);
                    }}
                    className="w-full"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    {isAdminView ? "Public View" : "Admin Dashboard"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
