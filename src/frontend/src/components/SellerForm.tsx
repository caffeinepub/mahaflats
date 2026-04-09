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
import { HttpAgent } from "@icp-sdk/core/agent";
import {
  AlertCircle,
  CheckCircle2,
  Image,
  IndianRupee,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ListingFeeType, ListingPurpose } from "../backend.d";
import { loadConfig } from "../config";
import { useSubmitProperty } from "../hooks/useQueries";
import { StorageClient } from "../utils/StorageClient";

const CITIES = [
  "Mumbai",
  "Pune",
  "Thane",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Aurangabad",
];
const PROPERTY_TYPES = ["1BHK", "2BHK", "3BHK", "Villa", "Plot", "Commercial"];
const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_MB = 5;

interface SellerFormProps {
  listingType?: "free" | "paid";
  paymentRef?: string;
}

export default function SellerForm(_props?: SellerFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    sellerName: "",
    sellerPhone: "",
    title: "",
    city: "",
    location: "",
    propertyType: "",
    listingPurpose: "forSale" as "forSale" | "forRent",
    price: "",
    rentAmount: "",
    area: "",
    bedrooms: "",
    description: "",
  });

  const submitProperty = useSubmitProperty();
  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const isForRent = form.listingPurpose === "forRent";

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - photoFiles.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_PHOTOS} photos allowed.`);
      return;
    }
    const toProcess = Array.from(files).slice(0, remaining);
    if (files.length > remaining) {
      toast.error(`Only ${remaining} more photo(s) can be added.`);
    }

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    let processed = 0;

    for (const file of toProcess) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(
          `"${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB and was skipped.`,
        );
        processed++;
        if (processed === toProcess.length && newFiles.length > 0) {
          setPhotoFiles((p) => [...p, ...newFiles]);
          setPhotoPreviews((p) => [...p, ...newPreviews]);
        }
        continue;
      }
      newFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        processed++;
        if (processed === toProcess.length) {
          setPhotoFiles((p) => [...p, ...newFiles]);
          setPhotoPreviews((p) => [...p, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotoFiles((f) => f.filter((_, i) => i !== index));
    setPhotoPreviews((p) => p.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (photoFiles.length === 0) return [];
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      if (config.backend_host?.includes("localhost")) {
        await agent.fetchRootKey().catch(console.warn);
      }
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );

      const urls: string[] = [];
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const bytes = new Uint8Array(await file.arrayBuffer());
        const { hash } = await storageClient.putFile(bytes, (pct) => {
          const overall = Math.round(
            ((i + pct / 100) / photoFiles.length) * 100,
          );
          setUploadProgress(overall);
        });
        const url = await storageClient.getDirectURL(hash);
        urls.push(url);
      }
      return urls;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const validate = (): string | null => {
    if (!form.sellerName.trim()) return "Owner name is required.";
    if (!form.sellerPhone.trim() || form.sellerPhone.length < 10)
      return "Valid phone number is required.";
    if (!form.title.trim()) return "Property title is required.";
    if (!form.city) return "City is required.";
    if (!form.location.trim()) return "Location is required.";
    if (!form.propertyType) return "Property type is required.";
    if (
      !form.price ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    )
      return "Valid price is required.";
    if (
      isForRent &&
      (!form.rentAmount ||
        Number.isNaN(Number(form.rentAmount)) ||
        Number(form.rentAmount) <= 0)
    )
      return "Monthly rent amount is required for rental properties.";
    if (!form.area || Number.isNaN(Number(form.area)) || Number(form.area) <= 0)
      return "Property area is required.";
    if (!form.bedrooms || Number.isNaN(Number(form.bedrooms)))
      return "Number of bedrooms is required.";
    if (!form.description.trim() || form.description.length < 20)
      return "Please provide a description (at least 20 characters).";
    if (!agreed) return "Please agree to the terms before submitting.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    let photoUrls: string[] = [];
    if (photoFiles.length > 0) {
      try {
        photoUrls = await uploadPhotos();
      } catch (err) {
        console.error("Photo upload error:", err);
        toast.error(
          "Photo upload failed. Please try again or submit without photos.",
        );
        return;
      }
    }

    const listingPurpose =
      form.listingPurpose === "forRent"
        ? ListingPurpose.forRent
        : ListingPurpose.forSale;
    const listingFeeType =
      listingPurpose === ListingPurpose.forRent
        ? ListingFeeType.twoMonthRentCommission
        : ListingFeeType.yearlyFee1000;
    const rentAmount =
      listingPurpose === ListingPurpose.forRent && form.rentAmount
        ? BigInt(Math.round(Number(form.rentAmount)))
        : null;

    submitProperty.mutate(
      {
        title: form.title,
        city: form.city,
        location: form.location,
        propertyType: form.propertyType,
        price: BigInt(Math.round(Number(form.price))),
        area: BigInt(Math.round(Number(form.area))),
        bedrooms: BigInt(Math.round(Number(form.bedrooms))),
        description: form.description,
        photoUrls,
        sellerName: form.sellerName,
        sellerPhone: form.sellerPhone,
        listingPurpose,
        rentAmount,
        listingFeeType,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success(
            "Property submitted successfully! Awaiting admin approval.",
          );
        },
        onError: (err) => {
          console.error("Submit error:", err);
          toast.error("Submission failed. Please try again.");
        },
      },
    );
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Property Submitted!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Your property listing is under review. Our admin team will approve it
          within 24–48 hours. You will be notified once it goes live.
        </p>
        {isForRent ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            Commission: 2 months rent (₹
            {form.rentAmount
              ? (Number(form.rentAmount) * 2).toLocaleString("en-IN")
              : "--"}
            ) on successful deal.
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            <IndianRupee className="w-4 h-4" />
            ₹1,000 yearly listing fee applies. Admin will share payment details.
          </div>
        )}
      </div>
    );
  }

  const isSubmitting = submitProperty.isPending || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment info banner */}
      <div
        className={`rounded-lg border p-3 text-sm flex items-start gap-2 ${
          isForRent
            ? "bg-orange-500/10 border-orange-500/20 text-orange-300"
            : "bg-blue-500/10 border-blue-500/20 text-blue-300"
        }`}
      >
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>
          {isForRent
            ? "Rental Commercial: 2 months rent commission applies on successful deal."
            : "₹1,000 yearly listing fee applies for sale properties. Payment details shared after submission."}
        </span>
      </div>

      {/* Owner Details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
          Owner Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-foreground text-sm">Owner Full Name *</Label>
            <Input
              required
              value={form.sellerName}
              onChange={(e) => update("sellerName", e.target.value)}
              placeholder="Your full name"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          <div>
            <Label className="text-foreground text-sm">
              Mobile Number * (Admin only — not shown publicly)
            </Label>
            <Input
              required
              type="tel"
              value={form.sellerPhone}
              onChange={(e) => update("sellerPhone", e.target.value)}
              placeholder="+91 98765 43210"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
          Property Details
        </h3>

        <div>
          <Label className="text-foreground text-sm">Property Title *</Label>
          <Input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Spacious 2BHK in Bandra West"
            className="bg-secondary border-border text-foreground mt-1"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-foreground text-sm">City *</Label>
            <Select value={form.city} onValueChange={(v) => update("city", v)}>
              <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground text-sm">Locality / Area *</Label>
            <Input
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Bandra West, Andheri"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-foreground text-sm">Property Type *</Label>
            <Select
              value={form.propertyType}
              onValueChange={(v) => update("propertyType", v)}
            >
              <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground text-sm">Listing For *</Label>
            <Select
              value={form.listingPurpose}
              onValueChange={(v) =>
                update("listingPurpose", v as "forSale" | "forRent")
              }
            >
              <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                <SelectValue placeholder="For Sale / For Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forSale">For Sale</SelectItem>
                <SelectItem value="forRent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label className="text-foreground text-sm">
              {isForRent ? "Expected Value (₹)" : "Expected Price (₹) *"}
            </Label>
            <Input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="e.g. 8500000"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          {isForRent && (
            <div>
              <Label className="text-foreground text-sm">
                Monthly Rent (₹) *
              </Label>
              <Input
                required
                type="number"
                min="0"
                value={form.rentAmount}
                onChange={(e) => update("rentAmount", e.target.value)}
                placeholder="e.g. 25000"
                className="bg-secondary border-border text-foreground mt-1"
              />
            </div>
          )}
          <div>
            <Label className="text-foreground text-sm">Area (sq ft) *</Label>
            <Input
              required
              type="number"
              min="0"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. 1200"
              className="bg-secondary border-border text-foreground mt-1"
            />
          </div>
          <div>
            <Label className="text-foreground text-sm">Bedrooms *</Label>
            <Select
              value={form.bedrooms}
              onValueChange={(v) => update("bedrooms", v)}
            >
              <SelectTrigger className="bg-secondary border-border text-foreground mt-1">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {["0", "1", "2", "3", "4", "5"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n === "0" ? "Studio/Shop" : `${n} BHK`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-foreground text-sm">Description *</Label>
          <Textarea
            required
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Describe the property — location highlights, amenities, nearby facilities..."
            rows={4}
            className="bg-secondary border-border text-foreground mt-1"
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
          Property Photos (up to {MAX_PHOTOS})
        </h3>

        {photoPreviews.length < MAX_PHOTOS && (
          <button
            type="button"
            className="w-full border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to upload photos (JPG, PNG — max {MAX_FILE_SIZE_MB}MB each)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {photoFiles.length}/{MAX_PHOTOS} photos added
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />
          </button>
        )}

        {photoPreviews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {photoPreviews.map((src, i) => (
              <div
                key={src}
                className="relative aspect-square rounded-lg overflow-hidden border border-border"
              >
                <img
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {photoPreviews.length < MAX_PHOTOS && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
              >
                <Image className="w-5 h-5 mb-1" />
                <span className="text-xs">Add</span>
              </button>
            )}
          </div>
        )}

        {isUploading && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Uploading photos...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Agreement */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
        <Checkbox
          id="agree"
          checked={agreed}
          onCheckedChange={(c) => setAgreed(c === true)}
          className="mt-0.5"
        />
        <Label
          htmlFor="agree"
          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
        >
          I confirm that the property details submitted by me are correct. I
          agree that if any buyer is introduced through Maharashtra Flats
          platform and the transaction is finalized directly or indirectly, I
          will pay a 1% service charge of the final transaction value to
          Maharashtra Flats as platform service fees. I also agree not to bypass
          Maharashtra Flats after buyer introduction.
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !agreed}
        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            {isUploading
              ? `Uploading photos (${uploadProgress}%)...`
              : "Submitting..."}
          </span>
        ) : (
          "Submit Property for Review"
        )}
      </Button>
    </form>
  );
}
