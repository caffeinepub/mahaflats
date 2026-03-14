import { Button } from "@/components/ui/button";
import { Building2, LogIn, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

interface NavbarProps {
  onAdminClick: () => void;
  isAdminView: boolean;
}

export default function Navbar({ onAdminClick, isAdminView }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const isLoggedIn = loginStatus === "success" && !!identity;

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

        {/* Auth + Admin */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {isAdmin && (
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
                  {isAdminView ? "Public View" : "Admin Dashboard"}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <Button
              data-ocid="nav.admin_link"
              variant="outline"
              size="sm"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="border-border text-foreground hover:bg-secondary"
            >
              <LogIn className="w-4 h-4 mr-1" />
              {loginStatus === "logging-in" ? "Logging in..." : "Admin Login"}
            </Button>
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
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onAdminClick();
                        setMobileOpen(false);
                      }}
                      className="w-full"
                    >
                      {isAdminView ? "Public View" : "Admin Dashboard"}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={login}
                  className="w-full"
                >
                  <LogIn className="w-4 h-4 mr-1" /> Admin Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
