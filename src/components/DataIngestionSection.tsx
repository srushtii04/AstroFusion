import { motion } from "framer-motion";
import { Upload, FileJson, FileSpreadsheet, Globe, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fileFormats = [
  { name: "CSV", icon: FileSpreadsheet, color: "text-success" },
  { name: "JSON", icon: FileJson, color: "text-primary" },
  { name: "FITS", icon: Globe, color: "text-accent" },
  { name: "API", icon: Globe, color: "text-warning" },
];

const mockUploads = [
  { name: "gaia_dr3_catalog.fits", size: "2.4 GB", status: "completed", progress: 100 },
  { name: "kepler_exoplanets.csv", size: "156 MB", status: "processing", progress: 67 },
  { name: "hubble_deep_field.json", size: "89 MB", status: "validating", progress: 45 },
];

export function DataIngestionSection() {
  const [dragActive, setDragActive] = useState(false);

  return (
    <section id="upload" className="py-24 relative">
      <div className="container mx-auto px-4" >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Data Ingestion
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Import Your <span className="text-gradient-cosmic">Cosmic Data</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload astronomical datasets from any source. We support CSV, JSON, FITS, 
            and external APIs with automatic validation and format detection.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none" />
              
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6"
              >
                <Upload className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-xl font-display font-semibold mb-2">
                Drop your files here
              </h3>
              <p className="text-muted-foreground mb-6">
                or click to browse from your computer
              </p>
              
              <Button variant="glow">
                Select Files
              </Button>

              <div className="flex items-center justify-center gap-6 mt-8">
                {fileFormats.map((format) => (
                  <div key={format.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <format.icon className={`w-4 h-4 ${format.color}`} />
                    <span>{format.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upload Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-cosmic rounded-2xl p-6"
          >
            <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              Ingestion Status
            </h3>

            <div className="space-y-4">
              {mockUploads.map((upload, index) => (
                <motion.div
                  key={upload.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-secondary/50 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{upload.name}</p>
                        <p className="text-xs text-muted-foreground">{upload.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {upload.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : upload.status === "validating" ? (
                        <AlertCircle className="w-5 h-5 text-warning" />
                      ) : (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      )}
                      <span className="text-xs text-muted-foreground capitalize">
                        {upload.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${upload.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full ${
                        upload.status === "completed"
                          ? "bg-success"
                          : upload.status === "validating"
                          ? "bg-warning"
                          : "bg-primary"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
