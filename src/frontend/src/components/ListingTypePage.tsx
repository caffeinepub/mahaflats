import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Megaphone,
  Rocket,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import OwnerListingForm from "./OwnerListingForm";

interface Props {
  onBack: () => void;
}

type Step = "select" | "payment" | "form";

export default function ListingTypePage({ onBack }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [utr, setUtr] = useState("");
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  if (step === "form") {
    return <OwnerListingForm onBack={() => setStep("select")} />;
  }

  if (step === "payment") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-40 nav-glass border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setStep("select")}
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

        <main className="container mx-auto px-4 py-10 max-w-lg">
          {paymentSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Payment Submitted!
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                Your UTR / Transaction ID has been recorded. You can now proceed
                to fill in your property details. Admin will verify payment and
                activate your listing.
              </p>
              <Button
                onClick={() => setStep("form")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 text-base font-semibold"
              >
                Continue to Property Form
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                  <Zap className="w-4 h-4" />
                  Fast Selling Listing
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Complete Payment – ₹1000
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">
                  Pay via UPI / PhonePe and enter your transaction ID below.
                </p>
              </div>

              {/* What you get */}
              <div className="rounded-xl bg-card border border-border p-5 mb-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  What's Included
                </p>
                {[
                  "Top-position visibility on Maharashtra Flats",
                  "₹500 Facebook promotion to nearby buyers",
                  "Faster genuine buyer inquiries",
                  "Only 1% success fee after deal closes",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <BadgeCheck className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* QR + UPI */}
              <div className="rounded-xl bg-card border border-border p-6 mb-6 text-center">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Scan QR Code to Pay ₹1000
                </p>
                <div className="flex justify-center mb-4">
                  <img
                    src="/assets/uploads/AccountQRCodeUnion-Bank-Of-India-3535_DARK_THEME-1.png"
                    alt="UPI QR Code"
                    className="w-48 h-48 rounded-lg border border-border object-contain bg-white p-1"
                  />
                </div>
                <div className="bg-muted/30 rounded-lg px-4 py-3 inline-block">
                  <p className="text-xs text-muted-foreground mb-1">UPI ID</p>
                  <p className="font-mono font-semibold text-foreground text-sm">
                    7447428486@ibl
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Use PhonePe, GPay, Paytm, or any UPI app
                </p>
              </div>

              {/* UTR Input */}
              <div className="space-y-3 mb-6">
                <label
                  htmlFor="utr"
                  className="block text-sm font-medium text-foreground"
                >
                  UTR / Transaction ID <span className="text-red-400">*</span>
                </label>
                <input
                  id="utr"
                  type="text"
                  placeholder="Enter your 12-digit UTR or Transaction ID"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Find your UTR in the payment success message or bank
                  statement.
                </p>
              </div>

              <Button
                disabled={utr.trim().length < 6 || paymentLoading}
                onClick={() => {
                  setPaymentLoading(true);
                  setTimeout(() => {
                    setPaymentLoading(false);
                    setPaymentSubmitted(true);
                  }, 1000);
                }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 py-5 text-base font-semibold"
              >
                {paymentLoading ? "Submitting..." : "Submit Payment & Continue"}
              </Button>
            </motion.div>
          )}
        </main>
      </div>
    );
  }

  // Step: select
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 nav-glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
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

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              For Property Owners
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground mt-2">
              Choose Your Listing Plan
            </h1>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Select the option that best suits your needs. You can always
              upgrade later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Listing Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-7 flex flex-col hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Free Property Listing
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    No upfront charges
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                List your property on Maharashtra Flats at no cost and make it
                visible to local buyers with standard listing position and no
                upfront charges; only 1% success fee applicable from owner after
                successful deal.
              </p>

              <ul className="space-y-2 mb-7">
                {[
                  "Standard listing position",
                  "Visible to local buyers",
                  "No upfront payment",
                  "1% success fee after deal",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <span className="text-3xl font-display font-bold text-foreground">
                  Free
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  + 1% on deal
                </span>
              </div>

              <Button
                onClick={() => setStep("form")}
                variant="outline"
                className="w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground py-5 font-semibold"
              >
                Select Free Listing
              </Button>
            </motion.div>

            {/* Fast Selling Listing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative rounded-2xl border-2 border-amber-500/60 bg-card p-7 flex flex-col shadow-lg shadow-amber-500/10"
            >
              {/* Recommended Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 bg-amber-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                  <Star className="w-3 h-3 fill-black" />
                  RECOMMENDED
                </div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Fast Selling Listing
                  </h2>
                  <p className="text-xs text-amber-400 font-semibold">
                    Top position + Facebook promotion
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Promote your property with top-position visibility and faster
                chances of getting genuine buyer inquiries including ₹500
                Facebook promotion for better reach to nearby buyers; only 1%
                success fee applicable from owner after successful deal.
              </p>

              <ul className="space-y-2 mb-7">
                {[
                  "Top position on search results",
                  "₹500 Facebook ad promotion",
                  "Faster genuine inquiries",
                  "1% success fee after deal",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <BadgeCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <span className="text-3xl font-display font-bold text-foreground">
                  ₹1,000
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  + 1% on deal
                </span>
              </div>

              <Button
                onClick={() => setStep("payment")}
                className="w-full bg-amber-500 text-black hover:bg-amber-400 py-5 font-semibold text-base"
              >
                <Megaphone className="w-4 h-4 mr-2" />
                Select Fast Selling Listing
              </Button>
            </motion.div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Both plans include our platform's buyer-seller introduction service.
            The 1% success fee is applicable only after a successful property
            deal is finalized through Maharashtra Flats.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
