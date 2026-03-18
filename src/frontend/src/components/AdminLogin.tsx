import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Eye, EyeOff, Lock, LogIn, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@mahaflats.com";
const ADMIN_SESSION_KEY = "maha_admin_session";
// Password is verified locally to avoid backend connection dependency on login
const ADMIN_PASSWORD = "Mahaflats@2024";

export function getAdminSession(): boolean {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as { ts: number };
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    return Date.now() - data.ts < THIRTY_DAYS;
  } catch {
    return false;
  }
}

export function setAdminSession() {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ ts: Date.now() }));
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({
  onLoginSuccess,
  onBack,
}: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }
    setIsLoading(true);
    // Small delay for UX feedback
    await new Promise((r) => setTimeout(r, 400));
    if (password !== ADMIN_PASSWORD) {
      toast.error("Incorrect password. Please try again.");
      setIsLoading(false);
      return;
    }
    setAdminSession();
    toast.success("Welcome to Admin Dashboard!");
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
        data-ocid="admin_login.back_button"
      >
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-2xl text-foreground">
          Maha<span className="text-primary">Flats</span>
          <span className="text-muted-foreground text-sm font-normal">
            .com
          </span>
        </span>
      </button>

      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access the Mahaflats admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-foreground text-sm">Admin Email</Label>
            <div className="relative mt-1">
              <Input
                data-ocid="admin_login.email_input"
                type="email"
                value={ADMIN_EMAIL}
                readOnly
                className="bg-secondary/60 border-border text-muted-foreground pr-10 cursor-default"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div>
            <Label className="text-foreground text-sm">Password</Label>
            <div className="relative mt-1">
              <Input
                data-ocid="admin_login.password_input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-secondary border-border text-foreground pr-10"
                autoFocus
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            data-ocid="admin_login.submit_button"
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login to Admin Panel
              </span>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Authorized personnel only. All access is logged.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to Mahaflats.com
      </button>
    </div>
  );
}
