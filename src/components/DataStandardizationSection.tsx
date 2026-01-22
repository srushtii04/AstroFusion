import { motion } from "framer-motion";
import { ArrowRight, Zap, RefreshCw, CheckCircle2 } from "lucide-react";

const transformations = [
  { from: "15,000 km", to: "0.0001 AU", type: "Distance" },
  { from: "RA: 12h 30m", to: "187.5°", type: "Coordinates" },
  { from: "5.2 Msun", to: "1.03e31 kg", type: "Mass" },
  { from: "Vega", to: "α Lyrae", type: "Designation" },
];

const features = [
  {
    icon: RefreshCw,
    title: "Unit Conversion",
    description: "km → AU → light-years, automatic detection",
  },
  {
    icon: Zap,
    title: "Coordinate Transform",
    description: "RA/DEC ↔ Galactic ↔ Ecliptic systems",
  },
  {
    icon: CheckCircle2,
    title: "Metadata Cleanup",
    description: "Normalize field names, remove duplicates",
  },
];

export function DataStandardizationSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Data Standardization
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Harmonize Your <span className="text-gradient-cosmic">Data</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Automatically convert units, transform coordinate systems, and normalize 
            metadata across all your datasets for seamless analysis.
          </p>
        </motion.div>

        {/* Transformation Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-cosmic rounded-2xl p-8 mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-display font-semibold mb-6 text-center">
            Real-time Transformation Preview
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground font-medium mb-4">Original Data</div>
              {transformations.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-3"
                >
                  <span className="text-xs text-muted-foreground">{t.type}</span>
                  <code className="text-sm font-mono text-foreground">{t.from}</code>
                </motion.div>
              ))}
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <ArrowRight className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            {/* After */}
            <div className="space-y-3">
              <div className="text-sm text-primary font-medium mb-4">Standardized Data</div>
              {transformations.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg px-4 py-3"
                >
                  <span className="text-xs text-muted-foreground">{t.type}</span>
                  <code className="text-sm font-mono text-primary">{t.to}</code>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h4 className="font-display font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
