import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Building2,
  CalendarIcon,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import PrintableVisitConfirmation from "./PrintableVisitConfirmation";

interface Props {
  onBack: () => void;
}

export default function BuyerVisitForm({ onBack }: Props) {
  const [form, setForm] = useState({
    buyerName: "",
    mobile: "",
    propertyId: "",
  });
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined);
  const [calOpen, setCalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  const isValid =
    agreed &&
    form.buyerName.trim() &&
    form.mobile.trim() &&
    form.propertyId.trim() &&
    visitDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (showPrint) {
    return (
      <PrintableVisitConfirmation
        buyerName={form.buyerName}
        propertyName={form.propertyId}
        visitDate={visitDate ? format(visitDate, "MMMM d, yyyy") : ""}
        onBack={() => setShowPrint(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 nav-glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            data-ocid="buyer_visit.back_button"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              Maha<span className="text-gradient">Flats</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
            data-ocid="buyer_visit.success_state"
          >
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Visit Request Recorded!
            </h2>
            <div className="bg-card/60 border border-border rounded-lg p-5 max-w-md mx-auto text-left mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your property visit request has been recorded through Mahaflats.
                Our team will coordinate with the property owner and get back to
                you shortly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setShowPrint(true)}
                data-ocid="buyer_visit.print_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <FileText className="w-4 h-4 mr-2" />
                View / Print Site Visit Agreement
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-border text-foreground"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                For Property Buyers
              </span>
              <h1 className="font-display text-3xl font-bold text-foreground mt-1">
                Request a Site Visit
              </h1>
              <p className="text-muted-foreground mt-2">
                Schedule a property visit through Mahaflats and our team will
                coordinate with the owner.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Buyer Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="buyerName"
                  className="text-foreground font-medium"
                >
                  Buyer Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="buyerName"
                  data-ocid="buyer_visit.input"
                  placeholder="Enter your full name"
                  value={form.buyerName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, buyerName: e.target.value }))
                  }
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label
                  htmlFor="buyerMobile"
                  className="text-foreground font-medium"
                >
                  Mobile Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="buyerMobile"
                  type="tel"
                  data-ocid="buyer_visit.mobile_input"
                  placeholder="+91 XXXXXXXXXX"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, mobile: e.target.value }))
                  }
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Property ID */}
              <div className="space-y-2">
                <Label
                  htmlFor="propertyId"
                  className="text-foreground font-medium"
                >
                  Property ID or Property Name{" "}
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="propertyId"
                  data-ocid="buyer_visit.property_input"
                  placeholder="e.g. MHF-2024-001 or 2BHK Baner Pune"
                  value={form.propertyId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, propertyId: e.target.value }))
                  }
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Visit Date */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Preferred Visit Date <span className="text-red-400">*</span>
                </Label>
                <Popover open={calOpen} onOpenChange={setCalOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-ocid="buyer_visit.select"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-card border-border",
                        !visitDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {visitDate ? format(visitDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-card border-border"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={visitDate}
                      onSelect={(d) => {
                        setVisitDate(d);
                        setCalOpen(false);
                      }}
                      disabled={(d) => d < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Agreement */}
              <div className="rounded-lg bg-card/60 border border-border p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="buyer-agree"
                    data-ocid="buyer_visit.checkbox"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                    className="mt-1 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor="buyer-agree"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I confirm that I am requesting a property visit through
                    Mahaflats platform. I understand that Mahaflats is acting as
                    a property introduction platform between buyer and owner.
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                data-ocid="buyer_visit.submit_button"
                disabled={!isValid || submitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 py-6 text-base font-semibold"
              >
                {submitting ? "Submitting..." : "Submit Visit Request"}
              </Button>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}
