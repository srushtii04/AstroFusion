import { motion } from "framer-motion";
import { Search, Filter, Download, Star, Orbit, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockDatasets = [
  {
    name: "Gaia DR3 Star Catalog",
    objects: "1.8 billion",
    type: "Stars",
    icon: Star,
    quality: 98,
    updated: "2 days ago",
  },
  {
    name: "Kepler Exoplanet Archive",
    objects: "5,500+",
    type: "Exoplanets",
    icon: Orbit,
    quality: 95,
    updated: "1 week ago",
  },
  {
    name: "SDSS Galaxy Survey",
    objects: "3.2 million",
    type: "Galaxies",
    icon: Sun,
    quality: 92,
    updated: "3 days ago",
  },
  {
    name: "NEO Asteroid Catalog",
    objects: "32,000+",
    type: "Asteroids",
    icon: Moon,
    quality: 89,
    updated: "12 hours ago",
  },
];

const filters = ["All Types", "Stars", "Planets", "Galaxies", "Asteroids"];

export function DataRepositorySection() {
  const [activeFilter, setActiveFilter] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section id="explore" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Data Repository
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Explore the <span className="text-gradient-cosmic">Universe</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access a unified, searchable library of standardized astronomical datasets. 
            Filter by object type, brightness, distance, and more.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search datasets, objects, or metadata..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="outline" className="h-12">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dataset Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {mockDatasets.map((dataset, index) => (
            <motion.div
              key={dataset.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="card-cosmic rounded-2xl p-6 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <dataset.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {dataset.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{dataset.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{dataset.objects}</strong> objects
                  </span>
                  <span className="text-muted-foreground">Updated {dataset.updated}</span>
                </div>
                
                {/* Quality Badge */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    dataset.quality >= 95 ? "bg-success" : dataset.quality >= 90 ? "bg-warning" : "bg-muted"
                  }`} />
                  <span className="text-xs text-muted-foreground">Q{dataset.quality}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
