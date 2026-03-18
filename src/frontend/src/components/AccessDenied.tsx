import { Button } from "@/components/ui/button";
import { Home, ShieldX } from "lucide-react";
import { motion } from "motion/react";

interface AccessDeniedProps {
  onBack: () => void;
}

export default function AccessDenied({ onBack }: AccessDeniedProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="w-12 h-12 text-destructive" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            This page is restricted to authorized personnel only. If you are the
            site owner, please use the correct access URL.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <Button
            onClick={onBack}
            size="lg"
            className="gap-2"
            data-ocid="access_denied.back_button"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
