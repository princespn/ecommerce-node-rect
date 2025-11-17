import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import connectDB from "./db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes placeholder (uncomment when routes ready)
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"
import authRoute from "./routes/auth.js";
app.use("/api/v1/list", productRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/user", authRoute);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/build");
    app.use(express.static(frontendPath));
  
    app.use((req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  }

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
