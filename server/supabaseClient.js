// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// );

// export default supabase;

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 LOAD .env HERE (CRITICAL)
dotenv.config({ path: path.join(__dirname, ".env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

console.log("SUPABASE_URL in client =", supabaseUrl);
console.log("SERVICE KEY loaded =", !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase env variables not loaded");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

