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
  Phone,
  Star,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
    const result = await actor.getSellerPhone(propertyId);
    setPhone(result ?? "N/A");
    setLoading(false);
  };

  if (phone) return <span className="font-mono text-foreground">{phone}</span>;
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={fetchPhone}
      disabled={loading}
      className="text-primary hover:text-primary/80"
    >
      <Phone className="w-3.5 h-3.5 mr-1" />
      {loading ? "Loading..." : "View Phone"}
    </Button>
  );
}

interface PropertyTableProps {
  items: Property[] | undefined;
  showPhone?: boolean;
  propsLoading: boolean;
  onApprove: (id: bigint) => void;
  onReject: (id: bigint) => void;
  onConfirmPayment: (id: bigint) => void;
  onToggleFeatured: (id: bigint) => void;
  onDelete: (id: bigint) => void;
}

function PropertyTable({
  items,
  showPhone,
  propsLoading,
  onApprove,
  onReject,
  onConfirmPayment,
  onToggleFeatured,
  onDelete,
}: PropertyTableProps) {
  if (propsLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.loading_state">
        {SKELETON_KEYS.map((key) => (
          <Skeleton key={key} className="h-12 w-full bg-muted" />
        ))}
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div
        className="text-center py-12 text-muted-foreground"
        data-ocid="admin.empty_state"
      >
        No properties in this category.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <Table data-ocid="admin.table">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Property</TableHead>
            <TableHead className="text-muted-foreground">City</TableHead>
            <TableHead className="text-muted-foreground">Price</TableHead>
            <TableHead className="text-muted-foreground">Seller</TableHead>
            {showPhone && (
              <TableHead className="text-muted-foreground">Phone</TableHead>
            )}
            <TableHead className="text-muted-foreground">Payment</TableHead>
            <TableHead className="text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((prop, i) => (
            <TableRow
              key={prop.id.toString()}
              className="border-border hover:bg-secondary/30"
              data-ocid={`admin.row.${i + 1}`}
            >
              <TableCell className="text-foreground font-medium max-w-[200px] truncate">
                {prop.title}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {prop.city}
              </TableCell>
              <TableCell className="text-foreground">
                {formatPrice(prop.price)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {prop.sellerInfo.sellerName}
              </TableCell>
              {showPhone && (
                <TableCell>
                  <SellerPhone propertyId={prop.id} />
                </TableCell>
              )}
              <TableCell>
                <Badge
                  variant={
                    prop.sellerInfo.paymentStatus === "paid"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    prop.sellerInfo.paymentStatus === "paid"
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {prop.sellerInfo.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 flex-wrap">
                  {prop.status === "pending" && (
                    <>
                      <Button
                        data-ocid={`admin.approve_button.${i + 1}`}
                        size="sm"
                        variant="ghost"
                        onClick={() => onApprove(prop.id)}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button
                        data-ocid={`admin.reject_button.${i + 1}`}
                        size="sm"
                        variant="ghost"
                        onClick={() => onReject(prop.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {prop.sellerInfo.paymentStatus !== "paid" && (
                    <Button
                      data-ocid={`admin.confirm_payment_button.${i + 1}`}
                      size="sm"
                      variant="ghost"
                      onClick={() => onConfirmPayment(prop.id)}
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
      <div
        className="text-center py-12 text-muted-foreground"
        data-ocid="admin.empty_state"
      >
        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No broker registrations yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table data-ocid="admin.table">
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
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
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
                {broker.subscriptionStatus === "deactivated" && (
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
                {broker.subscriptionStatus === "expired" && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-red-400">Expired</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => reactivateBroker(broker.id)}
                      className="text-green-400 hover:text-green-300 hover:bg-green-500/10 text-xs px-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Reactivate
                    </Button>
                  </div>
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
      onSuccess: () => toast.success("Payment confirmed."),
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

  const pending = (properties ?? []).filter((p) => p.status === "pending");
  const approved = (properties ?? []).filter((p) => p.status === "approved");
  const rejected = (properties ?? []).filter((p) => p.status === "rejected");

  const pendingBrokers = brokers.filter(
    (b) => b.subscriptionStatus === "pending_approval",
  );
  const activeBrokers = brokers.filter(
    (b) => b.subscriptionStatus === "active",
  );

  const tableProps = {
    propsLoading,
    onApprove: handleApprove,
    onReject: handleReject,
    onConfirmPayment: handleConfirmPayment,
    onToggleFeatured: handleToggleFeatured,
    onDelete: handleDelete,
  };

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
              label: "Approved Props",
              count: approved.length,
              color: "text-green-400",
            },
            {
              label: "Rejected Props",
              count: rejected.length,
              color: "text-red-400",
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

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="bg-secondary mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Pending ({pending.length})
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Approved ({approved.length})
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Rejected ({rejected.length})
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.tab"
            >
              Buyer Leads
            </TabsTrigger>
            <TabsTrigger
              value="brokers"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
              data-ocid="admin.tab"
            >
              Brokers ({brokers.length})
              {pendingBrokers.length > 0 && (
                <span className="ml-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center inline-flex">
                  {pendingBrokers.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="pending"
            className="bg-card border border-border rounded-xl p-6"
          >
            <PropertyTable items={pending} showPhone {...tableProps} />
          </TabsContent>
          <TabsContent
            value="approved"
            className="bg-card border border-border rounded-xl p-6"
          >
            <PropertyTable items={approved} {...tableProps} />
          </TabsContent>
          <TabsContent
            value="rejected"
            className="bg-card border border-border rounded-xl p-6"
          >
            <PropertyTable items={rejected} {...tableProps} />
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
