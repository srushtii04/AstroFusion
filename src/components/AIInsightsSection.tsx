import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Shield, 
  Sparkles,
  Activity,
  Eye,
  Gauge
} from "lucide-react";

const aiFeatures = [
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "Automatically detect unusual events like brightness spikes, unexpected motion, or sensor errors in your datasets.",
    accentColor: "warning" as const,
  },
  {
    icon: Layers,
    title: "Object Clustering",
    description: "Group celestial objects based on brightness, distance, spectral features, and motion patterns using ML algorithms.",
    accentColor: "accent" as const,
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Analyze temporal data to detect trends, periodic behavior, and recurring stellar dimming for exoplanet research.",
    accentColor: "primary" as const,
  },
  {
    icon: Gauge,
    title: "Quality Scoring",
    description: "AI-powered quality scores based on completeness, consistency, and noise levels with confidence indicators.",
    accentColor: "success" as const,
  },
];

const insights = [
  {
    type: "Anomaly",
    icon: AlertTriangle,
    title: "Brightness spike detected",
    description: "Star HD-140283 showed 340% brightness increase",
    time: "2 hours ago",
    severity: "high",
  },
  {
    type: "Pattern",
    icon: Activity,
    title: "Periodic dimming found",
    description: "12.4 day cycle suggests planetary transit",
    time: "5 hours ago",
    severity: "medium",
  },
  {
    type: "Cluster",
    icon: Eye,
    title: "New cluster identified",
    description: "147 objects with similar spectral signatures",
    time: "1 day ago",
    severity: "low",
  },
];

export function AIInsightsSection() {
  return (
    <section id="ai-insights" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            AI-Powered Features
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Intelligent <span className="text-gradient-cosmic">Discovery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let AI uncover hidden patterns, detect anomalies, and provide actionable 
            insights from your astronomical data.
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aiFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Live Insights Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-display font-semibold mb-6 text-center">
            Live AI Insights
          </h3>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-cosmic rounded-xl p-4 flex items-center gap-4 group hover:border-primary/30 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  insight.severity === "high" 
                    ? "bg-warning/10 text-warning" 
                    : insight.severity === "medium"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                }`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      insight.severity === "high" 
                        ? "bg-warning/20 text-warning" 
                        : insight.severity === "medium"
                        ? "bg-primary/20 text-primary"
                        : "bg-accent/20 text-accent"
                    }`}>
                      {insight.type}
                    </span>
                    <h4 className="font-medium text-foreground truncate">{insight.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                </div>
                
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {insight.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
