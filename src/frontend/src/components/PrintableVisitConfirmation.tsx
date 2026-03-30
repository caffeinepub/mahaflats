import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Printer } from "lucide-react";
import { useEffect } from "react";

interface Props {
  buyerName: string;
  propertyName: string;
  visitDate: string;
  onBack: () => void;
}

function generateRefNumber(): string {
  const today = new Date();
  const ymd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MHF-${ymd}-${rand}`;
}

const REF = generateRefNumber();

const TABLE_ROWS = [
  { key: "confirmation-number", label: "Confirmation Number" },
  { key: "date-of-agreement", label: "Date of Agreement" },
  { key: "buyer-name", label: "Buyer Name" },
  { key: "owner-name", label: "Owner Name" },
  { key: "property-details", label: "Property Details" },
  { key: "visit-date", label: "Scheduled Visit Date" },
];

const SIG_BLOCKS = [
  { key: "buyer", title: "Buyer" },
  { key: "owner", title: "Owner" },
  { key: "mahaflats", title: "Mahaflats Representative" },
];

export default function PrintableVisitConfirmation({
  buyerName,
  propertyName,
  visitDate,
  onBack,
}: Props) {
  const todayFormatted = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const tableValues: Record<string, string> = {
    "confirmation-number": REF,
    "date-of-agreement": todayFormatted,
    "buyer-name": buyerName || "__________________________",
    "owner-name": "__________________________",
    "property-details": propertyName || "__________________________",
    "visit-date": visitDate || "__________________________",
  };

  const sigNames: Record<string, string> = {
    buyer: buyerName || "",
    owner: "",
    mahaflats: "",
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "print-styles";
    style.textContent = `
      @media print {
        body * { visibility: hidden; }
        #printable-area, #printable-area * { visibility: visible; }
        #printable-area { position: fixed; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
        @page { size: A4 portrait; margin: 15mm; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Action bar — hidden on print */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            data-ocid="print_agreement.back_button"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <Button
            onClick={() => window.print()}
            data-ocid="print_agreement.print_button"
            className="bg-blue-700 text-white hover:bg-blue-800 gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Agreement
          </Button>
        </div>
      </div>

      {/* A4 Sheet */}
      <div className="py-8 px-4">
        <div
          id="printable-area"
          className="bg-white shadow-lg mx-auto p-10 text-gray-900"
          style={{
            width: "210mm",
            minHeight: "297mm",
            fontFamily: "Georgia, serif",
          }}
        >
          {/* Letterhead */}
          <div className="flex items-center justify-between pb-5 border-b-2 border-blue-800 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: "#1e3a5f" }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl" style={{ color: "#1e3a5f" }}>
                  MahaFlats<span className="text-gray-500">.com</span>
                </div>
                <div className="text-xs text-gray-500">
                  Maharashtra’s Trusted Property Platform
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-gray-500">
              <div>Ref: {REF}</div>
              <div>Date: {todayFormatted}</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-xl font-bold uppercase tracking-wider mb-1"
              style={{ color: "#1e3a5f" }}
            >
              Mahaflats Property Site Visit
            </h1>
            <h2 className="text-lg font-semibold text-gray-700">
              Confirmation Agreement
            </h2>
            <div className="mt-2 mx-auto w-24 h-0.5 bg-blue-800" />
          </div>

          {/* Details Table */}
          <table className="w-full mb-8 text-sm border-collapse">
            <tbody>
              {TABLE_ROWS.map(({ key, label }, idx) => (
                <tr
                  key={key}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2.5 px-4 font-semibold text-gray-700 w-48 border border-gray-200">
                    {label}
                  </td>
                  <td className="py-2.5 px-4 text-gray-900 border border-gray-200">
                    {tableValues[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Agreement Paragraph */}
          <div
            className="border border-gray-300 rounded p-5 mb-8 bg-blue-50"
            style={{ borderLeft: "4px solid #1e3a5f" }}
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              This document serves as an official record that the
              above-mentioned buyer has been introduced to the property through{" "}
              <strong>Mahaflats platform</strong>. By proceeding with this site
              visit, both parties acknowledge that Mahaflats acted as the
              introducer and a <strong>1% platform service charge</strong> will
              be applicable on the final transaction value if the property is
              purchased. This agreement is binding and the parties agree not to
              bypass Mahaflats after the introduction arranged through this
              platform.
            </p>
          </div>

          {/* Signature Blocks */}
          <div className="mt-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
              Signatures
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {SIG_BLOCKS.map(({ key, title }) => (
                <div key={key} className="border border-gray-300 rounded p-4">
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-4"
                    style={{ color: "#1e3a5f" }}
                  >
                    {title}
                  </div>
                  <div className="h-12 border-b border-dashed border-gray-400 mb-3" />
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="border-b border-gray-400 flex-1 ml-2 min-w-0">
                        {sigNames[key] || ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="border-b border-gray-400 flex-1 ml-2 min-w-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Mahaflats.com | Maharashtra’s Trusted Property Platform |
              WhatsApp: +91 7447428486
            </p>
            <p className="text-xs text-gray-400 mt-1">
              This is an official platform-introduction record. Ref: {REF}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
