import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, CartesianGrid } from "recharts";

// Mock data for charts
const timeSeriesData = [
  { time: "Jan", brightness: 1.0, baseline: 1.0 },
  { time: "Feb", brightness: 0.98, baseline: 1.0 },
  { time: "Mar", brightness: 0.85, baseline: 1.0 },
  { time: "Apr", brightness: 0.95, baseline: 1.0 },
  { time: "May", brightness: 1.02, baseline: 1.0 },
  { time: "Jun", brightness: 0.88, baseline: 1.0 },
  { time: "Jul", brightness: 0.92, baseline: 1.0 },
  { time: "Aug", brightness: 0.78, baseline: 1.0 },
  { time: "Sep", brightness: 0.96, baseline: 1.0 },
  { time: "Oct", brightness: 1.01, baseline: 1.0 },
  { time: "Nov", brightness: 0.89, baseline: 1.0 },
  { time: "Dec", brightness: 0.94, baseline: 1.0 },
];

const scatterData = Array.from({ length: 50 }, (_, i) => ({
  distance: Math.random() * 1000,
  luminosity: Math.random() * 10,
  size: Math.random() * 100 + 20,
}));

const spectrumData = Array.from({ length: 30 }, (_, i) => ({
  wavelength: 380 + i * 15,
  intensity: Math.sin(i * 0.5) * 0.5 + Math.random() * 0.3 + 0.5,
}));

export function VisualizationSection() {
  return (
    <section id="visualizations" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Visualizations
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            See Your <span className="text-gradient-cosmic">Data Come Alive</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive charts, sky maps, and time-series visualizations for 
            comprehensive astronomical data exploration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Light Curve Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-cosmic rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold mb-2">Stellar Light Curve</h3>
            <p className="text-sm text-muted-foreground mb-6">Periodic dimming indicates potential exoplanet transit</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="brightnessGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(187 80% 55%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(187 80% 55%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
                  <XAxis dataKey="time" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} domain={[0.7, 1.1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 10%)",
                      border: "1px solid hsl(222 30% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="baseline" stroke="hsl(215 20% 55%)" strokeDasharray="5 5" dot={false} />
                  <Area type="monotone" dataKey="brightness" stroke="hsl(187 80% 55%)" fill="url(#brightnessGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* H-R Diagram Scatter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-cosmic rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold mb-2">H-R Diagram</h3>
            <p className="text-sm text-muted-foreground mb-6">Luminosity vs. Distance clustering</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
                  <XAxis type="number" dataKey="distance" name="Distance" unit=" pc" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis type="number" dataKey="luminosity" name="Luminosity" unit=" L☉" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 10%)",
                      border: "1px solid hsl(222 30% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Scatter name="Stars" data={scatterData} fill="hsl(265 60% 55%)" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Spectrum Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-cosmic rounded-2xl p-6 lg:col-span-2"
          >
            <h3 className="font-display font-semibold mb-2">Spectral Analysis</h3>
            <p className="text-sm text-muted-foreground mb-6">Electromagnetic spectrum intensity distribution</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spectrumData}>
                  <defs>
                    <linearGradient id="spectrumGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(280 80% 50%)" stopOpacity={0.8}/>
                      <stop offset="25%" stopColor="hsl(240 80% 50%)" stopOpacity={0.8}/>
                      <stop offset="50%" stopColor="hsl(120 80% 50%)" stopOpacity={0.8}/>
                      <stop offset="75%" stopColor="hsl(60 80% 50%)" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="hsl(0 80% 50%)" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 20%)" />
                  <XAxis dataKey="wavelength" stroke="hsl(215 20% 55%)" fontSize={12} unit="nm" />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222 47% 10%)",
                      border: "1px solid hsl(222 30% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="intensity" stroke="hsl(187 80% 55%)" fill="url(#spectrumGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
