import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, IndianRupee, Loader2, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRecordPayment, useSubmitProperty } from "../hooks/useQueries";

const CITIES = ["Mumbai", "Pune", "Thane", "Nagpur", "Nashik"];
const PROPERTY_TYPES = ["1BHK", "2BHK", "3BHK", "Villa", "Plot"];

type Step = 1 | 2 | 3;

export default function SellerForm() {
  const [step, setStep] = useState<Step>(1);
  const [propertyId, setPropertyId] = useState<bigint | null>(null);
  const [utr, setUtr] = useState("");

  const [form, setForm] = useState({
    sellerName: "",
    sellerPhone: "",
    title: "",
    city: "",
    location: "",
    propertyType: "",
    price: "",
    area: "",
    bedrooms: "",
    description: "",
    photoUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    ],
  });

  const submitProperty = useSubmitProperty();
  const recordPayment = useRecordPayment();

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitProperty.mutate(
      {
        title: form.title,
        city: form.city,
        location: form.location,
        propertyType: form.propertyType,
        price: BigInt(form.price || "0"),
        area: BigInt(form.area || "0"),
        bedrooms: BigInt(form.bedrooms || "0"),
        description: form.description,
        photoUrls: form.photoUrls,
        sellerName: form.sellerName,
        sellerPhone: form.sellerPhone,
      },
      {
        onSuccess: () => {
          setPropertyId(BigInt(Date.now()));
          setStep(2);
          toast.success("Property details saved! Please complete payment.");
        },
        onError: () =>
          toast.error("Failed to submit property. Please try again."),
      },
    );
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr.trim()) {
      toast.error("Please enter your UTR/Transaction reference number.");
      return;
    }
    if (propertyId) {
      recordPayment.mutate(
        { propertyId, paymentRef: utr },
        {
          onSuccess: () => setStep(3),
          onError: () =>
            toast.error("Failed to record payment. Please contact support."),
        },
      );
    } else {
      setStep(3);
    }
  };

  return (
    <section id="list-property" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              List Your Property
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sell Faster with Mahaflats
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            List your property for just ₹1,000/year and reach thousands of
            genuine buyers.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  step >= s ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s === 1
                  ? "Property Details"
                  : s === 2
                    ? "Payment"
                    : "Confirmation"}
              </span>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Property Details
                </h3>
                <form onSubmit={handleStep1Submit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-foreground">Seller Name *</Label>
                      <Input
                        required
                        value={form.sellerName}
                        onChange={(e) => update("sellerName", e.target.value)}
                        placeholder="Your full name"
                        className="bg-secondary border-border text-foreground mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Phone Number *</Label>
                      <Input
                        required
                        type="tel"
                        value={form.sellerPhone}
                        onChange={(e) => update("sellerPhone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="bg-secondary border-border text-foreground mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        🔒 Private — visible only to admin
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Property Title *</Label>
                    <Input
                      required
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="e.g. Spacious 2BHK in Bandra West"
                      className="bg-secondary border-border text-foreground mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-foreground">City *</Label>
                      <Select
                        value={form.city}
                        onValueChange={(v) => update("city", v)}
                      >
                        <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          {CITIES.map((c) => (
                            <SelectItem
                              key={c}
                              value={c}
                              className="text-foreground"
                            >
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground">
                        Location / Area *
                      </Label>
                      <Input
                        required
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="e.g. Bandra West"
                        className="bg-secondary border-border text-foreground mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <Label className="text-foreground">Property Type *</Label>
                      <Select
                        value={form.propertyType}
                        onValueChange={(v) => update("propertyType", v)}
                      >
                        <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          {PROPERTY_TYPES.map((t) => (
                            <SelectItem
                              key={t}
                              value={t}
                              className="text-foreground"
                            >
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground">Price (₹) *</Label>
                      <Input
                        required
                        type="number"
                        value={form.price}
                        onChange={(e) => update("price", e.target.value)}
                        placeholder="5000000"
                        className="bg-secondary border-border text-foreground mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Bedrooms *</Label>
                      <Input
                        required
                        type="number"
                        min="1"
                        value={form.bedrooms}
                        onChange={(e) => update("bedrooms", e.target.value)}
                        placeholder="2"
                        className="bg-secondary border-border text-foreground mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Area (sq ft) *</Label>
                    <Input
                      required
                      type="number"
                      value={form.area}
                      onChange={(e) => update("area", e.target.value)}
                      placeholder="1200"
                      className="bg-secondary border-border text-foreground mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground">Description *</Label>
                    <Textarea
                      required
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Describe your property — location highlights, amenities, nearby facilities..."
                      rows={4}
                      className="bg-secondary border-border text-foreground mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground">Property Photos</Label>
                    <div
                      data-ocid="seller_form.dropzone"
                      className="mt-1 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Photo upload will be available after listing
                        confirmation
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, WebP up to 10MB each
                      </p>
                    </div>
                  </div>

                  <Button
                    data-ocid="seller_form.submit_button"
                    type="submit"
                    disabled={submitProperty.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
                  >
                    {submitProperty.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {submitProperty.isPending
                      ? "Saving..."
                      : "Continue to Payment →"}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Complete Payment
                </h3>
                <p className="text-muted-foreground mb-6">
                  Pay the annual listing fee to publish your property.
                </p>

                <div className="bg-secondary/50 border border-border rounded-xl p-5 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">
                      Annual Listing Fee
                    </span>
                    <span className="font-display text-2xl font-bold text-primary">
                      ₹1,000
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your listing will be live for 12 months after payment
                    verification.
                  </p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan the QR code to pay via UPI
                  </p>
                  <div className="inline-block bg-white p-3 rounded-xl">
                    <img
                      src="/assets/uploads/AccountQRCodeUnion-Bank-Of-India-3535_DARK_THEME-1.png"
                      alt="UPI QR Code"
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      UPI ID:
                    </span>
                    <span className="font-mono text-foreground font-semibold">
                      7447428486@ibl
                    </span>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <Label className="text-foreground">
                      UTR / Transaction Reference Number *
                    </Label>
                    <Input
                      data-ocid="payment.utr_input"
                      required
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="Enter 12-digit UTR number"
                      className="bg-secondary border-border text-foreground mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Find the UTR number in your UPI payment app transaction
                      history.
                    </p>
                  </div>
                  <Button
                    data-ocid="payment.submit_button"
                    type="submit"
                    disabled={recordPayment.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
                  >
                    {recordPayment.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {recordPayment.isPending
                      ? "Submitting..."
                      : "Submit Payment Reference"}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Thank You!
                </h3>
                <p className="text-muted-foreground mb-2">
                  Your property has been submitted successfully.
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  Our team will verify your payment and publish your listing
                  within <strong className="text-foreground">24 hours</strong>.
                </p>
                <div className="bg-secondary/50 border border-border rounded-xl p-4 text-sm text-muted-foreground">
                  Have questions? Contact us on WhatsApp at{" "}
                  <strong className="text-foreground">+91 7447428486</strong>
                </div>
                <Button
                  variant="outline"
                  className="mt-6 border-border text-foreground hover:bg-secondary"
                  onClick={() => {
                    setStep(1);
                    setUtr("");
                    setForm({
                      sellerName: "",
                      sellerPhone: "",
                      title: "",
                      city: "",
                      location: "",
                      propertyType: "",
                      price: "",
                      area: "",
                      bedrooms: "",
                      description: "",
                      photoUrls: [],
                    });
                  }}
                >
                  List Another Property
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
