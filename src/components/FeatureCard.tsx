import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  accentColor?: "primary" | "accent" | "success" | "warning";
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
  accentColor = "primary",
}: FeatureCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="card-cosmic rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:border-primary/30"
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${colorClasses[accentColor]} mb-4 transition-all duration-300 group-hover:scale-110`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
