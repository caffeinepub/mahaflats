import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  Home,
  Lock,
  LogOut,
  Mail,
  Phone,
  TrendingUp,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Broker {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  createdAt: string;
}

type View = "login" | "signup" | "dashboard";

// ── Storage helpers ───────────────────────────────────────────────────────────
const BROKERS_KEY = "maha_brokers";
const SESSION_KEY = "maha_broker_session";

function getBrokers(): Broker[] {
  try {
    return JSON.parse(localStorage.getItem(BROKERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveBroker(broker: Broker) {
  const brokers = getBrokers();
  brokers.push(broker);
  localStorage.setItem(BROKERS_KEY, JSON.stringify(brokers));
}

function getSession(): Broker | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(broker: Broker) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(broker));
}

export function clearBrokerSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Logo ──────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-glow">
        <Building2 className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="font-display text-2xl font-bold text-foreground tracking-tight">
        Maha<span className="text-primary">flats</span>
      </span>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/60 border border-border">
      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-body">{label}</p>
        <p className="text-lg font-semibold text-foreground font-body leading-tight">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Login View ────────────────────────────────────────────────────────────────
function LoginView({
  onLogin,
  onGoSignup,
  onBack,
}: {
  onLogin: (broker: Broker) => void;
  onGoSignup: () => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const brokers = getBrokers();
      const match = brokers.find(
        (b) =>
          b.email.toLowerCase() === email.toLowerCase() &&
          b.password === password,
      );
      setLoading(false);
      if (match) {
        setSession(match);
        toast.success(`Welcome back, ${match.name}!`);
        onLogin(match);
      } else {
        toast.error("Invalid email or password.");
      }
    }, 400);
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-sm mx-auto border-border shadow-card">
        <CardHeader className="text-center pb-2">
          <Logo />
          <CardTitle className="text-xl mt-2">Broker Login</CardTitle>
          <CardDescription>
            Sign in to your Mahaflats broker account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="broker_login.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="broker_login.input"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-ocid="broker_login.submit_button"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-0">
          <p className="text-sm text-muted-foreground text-center">
            New broker?{" "}
            <button
              type="button"
              onClick={onGoSignup}
              className="text-primary hover:underline font-medium"
              data-ocid="broker_login.link"
            >
              Create an account
            </button>
          </p>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
            data-ocid="broker_login.link"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Mahaflats
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// ── Signup View ───────────────────────────────────────────────────────────────
function SignupView({
  onSignup,
  onGoLogin,
  onBack,
}: {
  onSignup: () => void;
  onGoLogin: () => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const set =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, password } = form;
    if (!name || !phone || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    const existing = getBrokers().find(
      (b) => b.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) {
      toast.error("An account with this email already exists.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const broker: Broker = {
        id: crypto.randomUUID(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
      };
      saveBroker(broker);
      setLoading(false);
      toast.success("Account created! Please sign in.");
      onSignup();
    }, 400);
  };

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-sm mx-auto border-border shadow-card">
        <CardHeader className="text-center pb-2">
          <Logo />
          <CardTitle className="text-xl mt-2">Create Broker Account</CardTitle>
          <CardDescription>
            Join Mahaflats to list and manage properties
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="signup-name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="signup-name"
                  placeholder="Rahul Sharma"
                  className="pl-9"
                  value={form.name}
                  onChange={set("name")}
                  data-ocid="broker_signup.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="9876543210"
                  className="pl-9"
                  value={form.phone}
                  onChange={set("phone")}
                  data-ocid="broker_signup.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  value={form.email}
                  onChange={set("email")}
                  data-ocid="broker_signup.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Min 6 characters"
                  className="pl-9"
                  value={form.password}
                  onChange={set("password")}
                  data-ocid="broker_signup.input"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-ocid="broker_signup.submit_button"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-0">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onGoLogin}
              className="text-primary hover:underline font-medium"
              data-ocid="broker_signup.link"
            >
              Sign in
            </button>
          </p>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
            data-ocid="broker_signup.link"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Mahaflats
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// ── Dashboard View ────────────────────────────────────────────────────────────
function DashboardView({
  broker,
  onLogout,
}: {
  broker: Broker;
  onLogout: () => void;
}) {
  const joined = new Date(broker.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">
            Maha<span className="text-primary">flats</span>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="gap-1.5"
          data-ocid="broker_dashboard.button"
        >
          <LogOut className="w-3.5 h-3.5" /> Logout
        </Button>
      </div>

      {/* Welcome card */}
      <Card className="border-border shadow-card mb-4">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold font-display text-lg">
                {broker.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-lg font-semibold truncate">
                  {broker.name}
                </h2>
                <Badge
                  variant="outline"
                  className="text-xs border-primary/40 text-primary shrink-0"
                >
                  Broker
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {broker.email}
              </p>
              <p className="text-sm text-muted-foreground">{broker.phone}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-foreground">
              Welcome back,{" "}
              <span className="font-semibold text-primary">
                {broker.name.split(" ")[0]}
              </span>
              ! Your Mahaflats broker dashboard is ready.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard
          icon={Home}
          label="My Listings"
          value="0"
          sub="No listings yet"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Views"
          value="0"
          sub="Across all listings"
        />
        <StatCard
          icon={Clock}
          label="Subscription"
          value="Pending"
          sub="Payment required"
        />
        <StatCard
          icon={CheckCircle2}
          label="Member Since"
          value={joined.split(" ")[2]}
          sub={joined.split(" ").slice(0, 2).join(" ")}
        />
      </div>

      {/* CTA */}
      <Card className="border-primary/30 bg-primary/5 shadow-card">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                Activate Your Subscription
              </p>
              <p className="text-xs text-muted-foreground">
                ₹4,000 for 6 months — List unlimited properties
              </p>
            </div>
          </div>
          <Button
            className="w-full mt-3"
            size="sm"
            data-ocid="broker_dashboard.primary_button"
          >
            Pay & Activate — ₹4,000
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-6">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Built with love using caffeine.ai
        </a>
      </p>
    </motion.div>
  );
}

// ── Main BrokerAuth ───────────────────────────────────────────────────────────
export default function BrokerAuth({ onBack }: { onBack: () => void }) {
  const existingSession = getSession();
  const [view, setView] = useState<View>(
    existingSession ? "dashboard" : "login",
  );
  const [broker, setBroker] = useState<Broker | null>(existingSession);

  const handleLogin = (b: Broker) => {
    setBroker(b);
    setView("dashboard");
  };

  const handleLogout = () => {
    clearBrokerSession();
    setBroker(null);
    setView("login");
    toast.success("Logged out successfully.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {view === "login" && (
              <LoginView
                key="login"
                onLogin={handleLogin}
                onGoSignup={() => setView("signup")}
                onBack={onBack}
              />
            )}
            {view === "signup" && (
              <SignupView
                key="signup"
                onSignup={() => setView("login")}
                onGoLogin={() => setView("login")}
                onBack={onBack}
              />
            )}
            {view === "dashboard" && broker && (
              <DashboardView
                key="dashboard"
                broker={broker}
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
