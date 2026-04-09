import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  CreditCard,
  IndianRupee,
  Phone,
  Shield,
  Star,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ListingFeeType, ListingPurpose, PaymentStatus } from "../backend.d";
import type { Property, PropertyStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";
import {
  useAllBuyerLeads,
  useAllProperties,
  useConfirmPayment,
  useDeleteProperty,
  useToggleFeatured,
  useUpdatePropertyStatus,
} from "../hooks/useQueries";
import { formatPrice } from "../lib/formatPrice";

const SKELETON_KEYS = ["sk1", "sk2", "sk3"];
const BROKERS_KEY = "maha_brokers";

// ── Broker Types ──────────────────────────────────────────────────────────────
interface Broker {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  createdAt: string;
  subscriptionStatus:
    | "pending_payment"
    | "pending_approval"
    | "active"
    | "expired"
    | "deactivated";
  utr?: string;
  utrSubmittedAt?: string;
  approvedAt?: string;
  expiresAt?: string;
}

// ── Broker Hook ───────────────────────────────────────────────────────────────
function useBrokers() {
  const [brokers, setBrokers] = useState<Broker[]>([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(BROKERS_KEY) ?? "[]");
      setBrokers(data);
    } catch {
      setBrokers([]);
    }
  }, []);

  const updateBroker = (updated: Broker) => {
    setBrokers((prev) => {
      const next = prev.map((b) => (b.id === updated.id ? updated : b));
      localStorage.setItem(BROKERS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const approveBroker = (id: string) => {
    const broker = brokers.find((b) => b.id === id);
    if (!broker) return;
    const approvedAt = new Date().toISOString();
    const expiresAt = new Date(
      Date.now() + 6 * 30 * 24 * 60 * 60 * 1000,
    ).toISOString();
    updateBroker({
      ...broker,
      subscriptionStatus: "active",
      approvedAt,
      expiresAt,
    });
    toast.success(`${broker.name}'s subscription activated for 6 months.`);
  };

  const rejectBroker = (id: string) => {
    const broker = brokers.find((b) => b.id === id);
    if (!broker) return;
    updateBroker({
      ...broker,
      subscriptionStatus: "pending_payment",
      utr: undefined,
      utrSubmittedAt: undefined,
    });
    toast.error(`${broker.name}'s payment rejected.`);
  };

  const deactivateBroker = (id: string) => {
    const broker = brokers.find((b) => b.id === id);
    if (!broker) return;
    updateBroker({ ...broker, subscriptionStatus: "deactivated" });
    toast.error(`${broker.name}'s account has been deactivated.`);
  };

  const reactivateBroker = (id: string) => {
    const broker = brokers.find((b) => b.id === id);
    if (!broker) return;
    const expiresAt = new Date(
      Date.now() + 6 * 30 * 24 * 60 * 60 * 1000,
    ).toISOString();
    updateBroker({
      ...broker,
      subscriptionStatus: "active",
      expiresAt,
      approvedAt: new Date().toISOString(),
    });
    toast.success(
      `${broker.name}'s account has been reactivated for 6 months.`,
    );
  };

  return {
    brokers,
    approveBroker,
    rejectBroker,
    deactivateBroker,
    reactivateBroker,
  };
}

// ── Seller Phone Cell ─────────────────────────────────────────────────────────
function SellerPhone({ propertyId }: { propertyId: bigint }) {
  const { actor } = useActor();
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPhone = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const result = await actor.getSellerPhone(propertyId);
      setPhone(result ?? "N/A");
    } finally {
      setLoading(false);
    }
  };

  if (phone) return <span className="font-mono text-green-400">{phone}</span>;
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={fetchPhone}
      disabled={loading}
      className="text-primary hover:text-primary/80 text-xs"
    >
      <Phone className="w-3 h-3 mr-1" />
      {loading ? "Loading..." : "View"}
    </Button>
  );
}

function statusBadge(status: string) {
  if (status === "approved")
    return (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
        Approved
      </Badge>
    );
  if (status === "rejected")
    return (
      <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
        Rejected
      </Badge>
    );
  return (
    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
      Pending
    </Badge>
  );
}

function paymentBadge(status: string) {
  if (status === "paid")
    return (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
        Paid
      </Badge>
    );
  return (
    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
      Pending
    </Badge>
  );
}

function purposeLabel(p: Property) {
  return p.listingPurpose === ListingPurpose.forRent ? "For Rent" : "For Sale";
}

function feeRuleLabel(p: Property) {
  if (p.sellerInfo.listingFeeType === ListingFeeType.twoMonthRentCommission) {
    const rent = p.rentAmount ? Number(p.rentAmount) : 0;
    return `2 months rent${rent ? ` (\u20b9${(rent * 2).toLocaleString("en-IN")})` : ""}`;
  }
  return "\u20b91,000/year";
}

// ── Listings Tab ──────────────────────────────────────────────────────────────
function ListingsTab({
  properties,
  isLoading,
  onApprove,
  onReject,
  onConfirmPayment,
  onToggleFeatured,
  onDelete,
}: {
  properties: Property[] | undefined;
  isLoading: boolean;
  onApprove: (id: bigint) => void;
  onReject: (id: bigint) => void;
  onConfirmPayment: (id: bigint) => void;
  onToggleFeatured: (id: bigint) => void;
  onDelete: (id: bigint) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = (properties ?? []).filter((p) => {
    if (statusFilter === "all") return true;
    return p.status === statusFilter;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {SKELETON_KEYS.map((key) => (
          <Skeleton key={key} className="h-12 w-full bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={statusFilter === s ? "default" : "outline"}
            onClick={() => setStatusFilter(s)}
            className={
              statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== "all" && (
              <span className="ml-1.5 text-xs">
                ({(properties ?? []).filter((p) => p.status === s).length})
              </span>
            )}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No properties in this category.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">
                  Property
                </TableHead>
                <TableHead className="text-muted-foreground">City</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Purpose</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((prop, i) => (
                <TableRow
                  key={prop.id.toString()}
                  className="border-border hover:bg-secondary/30"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <TableCell className="text-muted-foreground text-xs">
                    #{prop.id.toString()}
                  </TableCell>
                  <TableCell className="text-foreground font-medium max-w-[180px]">
                    <span className="truncate block">{prop.title}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {prop.city}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {prop.propertyType}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        prop.listingPurpose === ListingPurpose.forRent
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }
                    >
                      {purposeLabel(prop)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {formatPrice(prop.price)}
                  </TableCell>
                  <TableCell>{statusBadge(prop.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      {prop.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onApprove(prop.id)}
                            data-ocid={`admin.approve_button.${i + 1}`}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onReject(prop.id)}
                            data-ocid={`admin.reject_button.${i + 1}`}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {prop.sellerInfo.paymentStatus !== PaymentStatus.paid && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onConfirmPayment(prop.id)}
                          data-ocid={`admin.confirm_payment_button.${i + 1}`}
                          className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                          title="Confirm Payment"
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onToggleFeatured(prop.id)}
                        className={
                          prop.isFeatured
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }
                        title="Toggle Featured"
                      >
                        <Star
                          className="w-4 h-4"
                          fill={prop.isFeatured ? "currentColor" : "none"}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(prop.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Owner Contacts Tab ────────────────────────────────────────────────────────
function OwnerContactsTab({
  properties,
  isLoading,
}: {
  properties: Property[] | undefined;
  isLoading: boolean;
}) {
  const visible = (properties ?? []).filter(
    (p) => p.status === "pending" || p.status === "approved",
  );

  if (isLoading) {
    return (
      <div className="space-y-3">
        {SKELETON_KEYS.map((key) => (
          <Skeleton key={key} className="h-12 w-full bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
        <Shield className="w-4 h-4 flex-shrink-0" />
        <span>
          Owner phone numbers are confidential. Only visible to admin. Never
          shown to public users.
        </span>
      </div>
      {visible.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No owner contact records.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Title</TableHead>
                <TableHead className="text-muted-foreground">City</TableHead>
                <TableHead className="text-muted-foreground">
                  Seller Name
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Phone Number
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">
                  Submitted
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((prop, i) => (
                <TableRow
                  key={prop.id.toString()}
                  className="border-border hover:bg-secondary/30"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <TableCell className="text-muted-foreground text-xs">
                    #{prop.id.toString()}
                  </TableCell>
                  <TableCell className="text-foreground font-medium max-w-[180px]">
                    <span className="truncate block">{prop.title}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {prop.city}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {prop.sellerInfo.sellerName}
                  </TableCell>
                  <TableCell>
                    <SellerPhone propertyId={prop.id} />
                  </TableCell>
                  <TableCell>{statusBadge(prop.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {prop.submittedAt
                      ? new Date(
                          Number(prop.submittedAt) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Payments Tab ──────────────────────────────────────────────────────────────
function PaymentsTab({
  properties,
  isLoading,
  onConfirmPayment,
}: {
  properties: Property[] | undefined;
  isLoading: boolean;
  onConfirmPayment: (id: bigint) => void;
}) {
  const [payFilter, setPayFilter] = useState<string>("all");

  const filtered = (properties ?? []).filter((p) => {
    if (payFilter === "all") return true;
    if (payFilter === "pending")
      return p.sellerInfo.paymentStatus === PaymentStatus.pending;
    if (payFilter === "paid")
      return p.sellerInfo.paymentStatus === PaymentStatus.paid;
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {SKELETON_KEYS.map((key) => (
          <Skeleton key={key} className="h-12 w-full bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "paid"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={payFilter === s ? "default" : "outline"}
            onClick={() => setPayFilter(s)}
            className={
              payFilter === s
                ? "bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No payment records.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Title</TableHead>
                <TableHead className="text-muted-foreground">
                  Seller Name
                </TableHead>
                <TableHead className="text-muted-foreground">Purpose</TableHead>
                <TableHead className="text-muted-foreground">
                  Fee Rule
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Payment Status
                </TableHead>
                <TableHead className="text-muted-foreground">
                  UTR / Ref
                </TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((prop, i) => (
                <TableRow
                  key={prop.id.toString()}
                  className="border-border hover:bg-secondary/30"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <TableCell className="text-muted-foreground text-xs">
                    #{prop.id.toString()}
                  </TableCell>
                  <TableCell className="text-foreground font-medium max-w-[160px]">
                    <span className="truncate block">{prop.title}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {prop.sellerInfo.sellerName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        prop.listingPurpose === ListingPurpose.forRent
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }
                    >
                      {purposeLabel(prop)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3 text-primary" />
                      {feeRuleLabel(prop)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {paymentBadge(prop.sellerInfo.paymentStatus)}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {prop.sellerInfo.paymentRef ?? (
                      <span className="opacity-40">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {prop.sellerInfo.paymentStatus !== PaymentStatus.paid && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onConfirmPayment(prop.id)}
                        data-ocid={`admin.confirm_payment_button.${i + 1}`}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10 text-xs px-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Confirm
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Brokers Tab ───────────────────────────────────────────────────────────────
function BrokersTab() {
  const {
    brokers,
    approveBroker,
    rejectBroker,
    deactivateBroker,
    reactivateBroker,
  } = useBrokers();

  if (brokers.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No broker registrations yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Email</TableHead>
            <TableHead className="text-muted-foreground">Phone</TableHead>
            <TableHead className="text-muted-foreground">UTR</TableHead>
            <TableHead className="text-muted-foreground">Submitted</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brokers.map((broker, i) => (
            <TableRow
              key={broker.id}
              className="border-border hover:bg-secondary/30"
              data-ocid={`admin.row.${i + 1}`}
            >
              <TableCell className="text-foreground font-medium">
                {broker.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {broker.email}
              </TableCell>
              <TableCell className="text-foreground font-mono">
                {broker.phone}
              </TableCell>
              <TableCell className="text-muted-foreground font-mono text-xs">
                {broker.utr ?? <span className="opacity-40">—</span>}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {broker.utrSubmittedAt ? (
                  new Date(broker.utrSubmittedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                ) : (
                  <span className="opacity-40">—</span>
                )}
              </TableCell>
              <TableCell>
                {broker.subscriptionStatus === "pending_approval" && (
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                    Pending
                  </Badge>
                )}
                {broker.subscriptionStatus === "active" && (
                  <div className="flex flex-col gap-0.5">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      Active
                    </Badge>
                    {broker.expiresAt && (
                      <span className="text-xs text-green-400">
                        Until{" "}
                        {new Date(broker.expiresAt).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </span>
                    )}
                  </div>
                )}
                {broker.subscriptionStatus === "expired" && (
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    Expired
                  </Badge>
                )}
                {broker.subscriptionStatus === "deactivated" && (
                  <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                    Deactivated
                  </Badge>
                )}
                {broker.subscriptionStatus === "pending_payment" && (
                  <Badge variant="secondary" className="text-muted-foreground">
                    Unpaid
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {broker.subscriptionStatus === "pending_approval" && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => approveBroker(broker.id)}
                      className="text-green-400 hover:text-green-300 hover:bg-green-500/10 text-xs px-2"
                      data-ocid={`admin.approve_button.${i + 1}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => rejectBroker(broker.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs px-2"
                      data-ocid={`admin.reject_button.${i + 1}`}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
                {broker.subscriptionStatus === "active" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deactivateBroker(broker.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs px-2"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Deactivate
                  </Button>
                )}
                {(broker.subscriptionStatus === "deactivated" ||
                  broker.subscriptionStatus === "expired") && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => reactivateBroker(broker.id)}
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10 text-xs px-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Reactivate
                  </Button>
                )}
                {broker.subscriptionStatus === "pending_payment" && (
                  <span className="text-xs text-muted-foreground">
                    Awaiting payment
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { data: properties, isLoading: propsLoading } = useAllProperties();
  const { data: leads, isLoading: leadsLoading } = useAllBuyerLeads();
  const updateStatus = useUpdatePropertyStatus();
  const confirmPayment = useConfirmPayment();
  const deleteProperty = useDeleteProperty();
  const toggleFeatured = useToggleFeatured();
  const { brokers } = useBrokers();

  const handleApprove = (id: bigint) => {
    updateStatus.mutate(
      { propertyId: id, status: "approved" as PropertyStatus },
      {
        onSuccess: () => toast.success("Property approved."),
        onError: () => toast.error("Action failed."),
      },
    );
  };

  const handleReject = (id: bigint) => {
    updateStatus.mutate(
      { propertyId: id, status: "rejected" as PropertyStatus },
      {
        onSuccess: () => toast.success("Property rejected."),
        onError: () => toast.error("Action failed."),
      },
    );
  };

  const handleConfirmPayment = (id: bigint) => {
    confirmPayment.mutate(id, {
      onSuccess: () =>
        toast.success("Payment confirmed and property approved."),
      onError: () => toast.error("Failed to confirm payment."),
    });
  };

  const handleDelete = (id: bigint) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    deleteProperty.mutate(id, {
      onSuccess: () => toast.success("Property deleted."),
      onError: () => toast.error("Failed to delete."),
    });
  };

  const handleToggleFeatured = (id: bigint) => {
    toggleFeatured.mutate(id, {
      onSuccess: () => toast.success("Featured status updated."),
      onError: () => toast.error("Failed to update."),
    });
  };

  const allProps = properties ?? [];
  const pending = allProps.filter((p) => p.status === "pending");
  const pendingPayments = allProps.filter(
    (p) => p.sellerInfo.paymentStatus === PaymentStatus.pending,
  );
  const pendingBrokers = brokers.filter(
    (b) => b.subscriptionStatus === "pending_approval",
  );
  const activeBrokers = brokers.filter(
    (b) => b.subscriptionStatus === "active",
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage property listings, payments, broker accounts, and buyer
            inquiries.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            {
              label: "Pending Props",
              count: pending.length,
              color: "text-amber-400",
            },
            {
              label: "Total Props",
              count: allProps.length,
              color: "text-green-400",
            },
            {
              label: "Pending Payments",
              count: pendingPayments.length,
              color: "text-orange-400",
            },
            {
              label: "Buyer Leads",
              count: (leads ?? []).length,
              color: "text-primary",
            },
            {
              label: "Pending Brokers",
              count: pendingBrokers.length,
              color: "text-amber-400",
            },
            {
              label: "Active Brokers",
              count: activeBrokers.length,
              color: "text-green-400",
            },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className={`text-2xl font-display font-bold ${color}`}>
                {count}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="bg-secondary mb-6 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="listings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Listings ({allProps.length})
              {pending.length > 0 && (
                <span className="ml-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold inline-flex items-center justify-center">
                  {pending.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Owner Contacts
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Payments
              {pendingPayments.length > 0 && (
                <span className="ml-1.5 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold inline-flex items-center justify-center">
                  {pendingPayments.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Buyer Leads ({(leads ?? []).length})
            </TabsTrigger>
            <TabsTrigger
              value="brokers"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Brokers ({brokers.length})
              {pendingBrokers.length > 0 && (
                <span className="ml-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold inline-flex items-center justify-center">
                  {pendingBrokers.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="listings"
            className="bg-card border border-border rounded-xl p-6"
          >
            <ListingsTab
              properties={properties}
              isLoading={propsLoading}
              onApprove={handleApprove}
              onReject={handleReject}
              onConfirmPayment={handleConfirmPayment}
              onToggleFeatured={handleToggleFeatured}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent
            value="contacts"
            className="bg-card border border-border rounded-xl p-6"
          >
            <OwnerContactsTab
              properties={properties}
              isLoading={propsLoading}
            />
          </TabsContent>

          <TabsContent
            value="payments"
            className="bg-card border border-border rounded-xl p-6"
          >
            <PaymentsTab
              properties={properties}
              isLoading={propsLoading}
              onConfirmPayment={handleConfirmPayment}
            />
          </TabsContent>

          <TabsContent
            value="leads"
            className="bg-card border border-border rounded-xl p-6"
          >
            {leadsLoading ? (
              <div className="space-y-3">
                {SKELETON_KEYS.map((key) => (
                  <Skeleton key={key} className="h-12 w-full bg-muted" />
                ))}
              </div>
            ) : !leads || leads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No buyer leads yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">
                        Buyer
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Phone
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Email
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Property ID
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Message
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead, i) => (
                      <TableRow
                        key={lead.id.toString()}
                        className="border-border hover:bg-secondary/30"
                        data-ocid={`admin.row.${i + 1}`}
                      >
                        <TableCell className="text-foreground">
                          {lead.buyerName}
                        </TableCell>
                        <TableCell className="text-foreground font-mono">
                          {lead.buyerPhone}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lead.buyerEmail}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          #{lead.propertyId.toString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-[200px] truncate">
                          {lead.message}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {lead.createdAt
                            ? new Date(
                                Number(lead.createdAt) / 1_000_000,
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="brokers"
            className="bg-card border border-border rounded-xl p-6"
          >
            <BrokersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
