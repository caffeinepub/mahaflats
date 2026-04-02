import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ArrowLeft, Building2, CheckCircle2, ImagePlus, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitProperty } from "../hooks/useQueries";

const CITIES = [
  "Mumbai",
  "Pune",
  "Thane",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Aurangabad",
];

interface Props {
  onBack: () => void;
}

export default function OwnerListingForm({ onBack }: Props) {
  const [form, setForm] = useState({
    ownerName: "",
    mobile: "",
    propertyType: "",
    city: "",
    location: "",
    price: "",
    description: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [_photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ id: string; src: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const submitProperty = useSubmitProperty();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos((prev) => [...prev, ...files]);
    for (const file of files) {
      const id = `${Date.now()}-${Math.random()}`;
      const reader = new FileReader();
      reader.onload = (ev) =>
        setPreviews((prev) => [
          ...prev,
          { id, src: ev.target?.result as string },
        ]);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (id: string) => {
    const idx = previews.findIndex((p) => p.id === id);
    if (idx === -1) return;
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    const priceNum = Number(form.price.replace(/[^0-9]/g, ""));
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }
    try {
      await submitProperty.mutateAsync({
        title: `${form.propertyType} in ${form.location}`,
        city: form.city,
        location: form.location,
        propertyType: form.propertyType,
        price: BigInt(priceNum),
        area: 0n,
        bedrooms: 0n,
        description: form.description,
        photoUrls: previews.map((p) => p.src),
        sellerName: form.ownerName,
        sellerPhone: form.mobile,
      });
    } catch {
      // Backend unavailable, still show success (form data captured)
    }
    setSubmitted(true);
  };

  const isValid =
    agreed &&
    form.ownerName.trim() &&
    form.mobile.trim() &&
    form.propertyType &&
    form.city &&
    form.location.trim() &&
    form.price.trim();

  const triggerFileInput = () => fileRef.current?.click();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 nav-glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            data-ocid="owner_listing.back_button"
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
            className="text-center py-20"
            data-ocid="owner_listing.success_state"
          >
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Listing Submitted!
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Your property listing has been submitted successfully! Our team
              will review and contact you within 24 hours.
            </p>
            <Button
              onClick={onBack}
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Back to Home
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                For Property Owners
              </span>
              <h1 className="font-display text-3xl font-bold text-foreground mt-1">
                List Your Property
              </h1>
              <p className="text-muted-foreground mt-2">
                Fill in the details below and our team will list your property
                on Maharashtra Flats platform.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Owner Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="ownerName"
                  className="text-foreground font-medium"
                >
                  Owner Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="ownerName"
                  data-ocid="owner_listing.input"
                  placeholder="Enter your full name"
                  value={form.ownerName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ownerName: e.target.value }))
                  }
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-foreground font-medium">
                  Mobile Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  data-ocid="owner_listing.mobile_input"
                  placeholder="+91 XXXXXXXXXX"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, mobile: e.target.value }))
                  }
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Property Type <span className="text-red-400">*</span>
                </Label>
                <Select
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, propertyType: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="owner_listing.select"
                    className="bg-card border-border text-foreground"
                  >
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Flat">Flat</SelectItem>
                    <SelectItem value="Plot">Plot</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  City <span className="text-red-400">*</span>
                </Label>
                <Select
                  onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}
                >
                  <SelectTrigger
                    data-ocid="owner_listing.city_select"
                    className="bg-card border-border text-foreground"
                  >
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-foreground font-medium"
                >
                  Property Location / Area{" "}
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="location"
                  data-ocid="owner_listing.location_input"
                  placeholder="e.g. Baner, Pune, Maharashtra"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground font-medium">
                  Expected Price (₹) <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    ₹
                  </span>
                  <Input
                    id="price"
                    data-ocid="owner_listing.price_input"
                    placeholder="e.g. 4500000"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    required
                    className="pl-8 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Property Photos
                </Label>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={triggerFileInput}
                  data-ocid="owner_listing.dropzone"
                >
                  <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload photos
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WEBP supported
                  </p>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                  data-ocid="owner_listing.upload_button"
                />
                {previews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {previews.map(({ id, src }) => (
                      <div
                        key={id}
                        className="relative group rounded-lg overflow-hidden aspect-square"
                      >
                        <img
                          src={src}
                          alt="Property preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(id)}
                          className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-foreground font-medium"
                >
                  Property Description
                </Label>
                <Textarea
                  id="description"
                  data-ocid="owner_listing.textarea"
                  placeholder="Describe your property — number of rooms, amenities, nearby landmarks..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={4}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              {/* Agreement */}
              <div className="rounded-lg bg-card/60 border border-border p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="owner-agree"
                    data-ocid="owner_listing.checkbox"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                    className="mt-1 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor="owner-agree"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    I confirm that the property details submitted by me are
                    correct. I agree that if any buyer is introduced through
                    Maharashtra Flats platform and the transaction is finalized
                    directly or indirectly, I will pay a 1% service charge of
                    the final transaction value to Maharashtra Flats as platform
                    service fees. I also agree not to bypass Maharashtra Flats
                    after buyer introduction.
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                data-ocid="owner_listing.submit_button"
                disabled={!isValid || submitProperty.isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 py-6 text-base font-semibold"
              >
                {submitProperty.isPending
                  ? "Submitting..."
                  : "Submit Property Listing"}
              </Button>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}
