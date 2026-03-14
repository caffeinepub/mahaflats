import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Property } from "../backend.d";
import { useSubmitInquiry } from "../hooks/useQueries";
import { formatPrice } from "../lib/formatPrice";

interface InquiryDialogProps {
  property: Property;
  triggerIndex?: number;
}

export default function InquiryDialog({
  property,
  triggerIndex,
}: InquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const { mutate, isPending } = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        propertyId: property.id,
        buyerName: form.name,
        buyerPhone: form.phone,
        buyerEmail: form.email,
        message: form.message,
      },
      {
        onSuccess: () => {
          toast.success(
            "Inquiry sent! Our team will contact you within 24 hours.",
          );
          setOpen(false);
          setForm({ name: "", phone: "", email: "", message: "" });
        },
        onError: () => toast.error("Failed to send inquiry. Please try again."),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-ocid={`property.contact_button.${triggerIndex ?? 1}`}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          <Phone className="w-4 h-4 mr-2" />
          Contact for Details
        </Button>
      </DialogTrigger>
      <DialogContent
        data-ocid="inquiry.dialog"
        className="bg-card border-border text-foreground max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Enquire About Property
          </DialogTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {property.title} — {formatPrice(property.price)}
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label className="text-foreground">Your Name *</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Enter your full name"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          <div>
            <Label className="text-foreground">Phone Number *</Label>
            <Input
              required
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="+91 98765 43210"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          <div>
            <Label className="text-foreground">Email Address</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="your@email.com"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          <div>
            <Label className="text-foreground">Message</Label>
            <Textarea
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              placeholder="I'm interested in this property and would like to know more..."
              rows={3}
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          <Button
            data-ocid="inquiry.submit_button"
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isPending ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
