import mongoose from "mongoose";
console.log("Saving dataset metadata...");
const DatasetSchema = new mongoose.Schema({

  // Ownership
  userId: {
    type: String,
    required: true
  },

  // File info
  fileName: String,
  fileType: String,
  fileSize: Number,

  // Raw file
  rawFile: {
    bucket: { type: String, default: "datasets" },
    path: String,
    uploadedAt: { type: Date, default: Date.now }
  },

  // Processed file
  processedFile: {
    bucket: { type: String, default: "datasets" },
    path: { type: String, default: null },
    processedAt: { type: Date, default: null }
  },

  // ML / Data quality
  qualityScore: { type: Number, default: null },
  anomaliesDetected: { type: Boolean, default: false },
  anomalyCount: { type: Number, default: 0 }

}, { timestamps: true });

export default mongoose.model("Dataset", DatasetSchema, "metadata");
console.log("Saved dataset:", DatasetSchema);
