import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";

const FAQS = [
  {
    id: "search",
    question: "How do I search for properties on Mahaflats?",
    answer:
      "Simply use the city filter on the homepage or browse the All Listings section. You can filter by city — Mumbai, Pune, Thane, Nagpur, and Nashik — to find properties in your preferred location.",
  },
  {
    id: "contact",
    question: "How do I contact a seller?",
    answer:
      "Click the 'Contact for Details' button on any property card to submit an inquiry. Our team will connect you with the seller within 24 hours. Seller phone numbers are kept private for your safety.",
  },
  {
    id: "cost",
    question: "How much does it cost to list a property?",
    answer:
      "Mahaflats charges a flat ₹1,000 per year to list your property. This is a one-time annual fee with no commission, no hidden charges, and no surprises.",
  },
  {
    id: "payment",
    question: "How does payment work for listing?",
    answer:
      "After filling in your property details, you'll be directed to our payment page. Pay ₹1,000 via UPI to our ID '7447428486@ibl' and submit your UTR/transaction reference number. Your listing goes live within 24 hours of payment verification.",
  },
  {
    id: "privacy",
    question: "Is my phone number visible to buyers?",
    answer:
      "No. Your phone number is completely private and only visible to our admin team. Buyers submit inquiries through our system, and we facilitate the connection without exposing your personal details publicly.",
  },
  {
    id: "duration",
    question: "How long will my listing stay active?",
    answer:
      "Your property listing remains active for 12 months from the date of approval. You'll receive a reminder before expiry so you can renew at the same ₹1,000 annual rate.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about buying, selling, and listing on
            Mahaflats.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                data-ocid={`faq.item.${i + 1}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-foreground font-medium hover:no-underline py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
