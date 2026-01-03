import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"; // or user.route.js
import tokenRoute from "./routes/token.route.js";
import adminRoute from "./routes/admin.route.js";
import authRoute from "./routes/auth.route.js";
import adminAuthRoute from "./routes/adminAuth.route.js";



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/token", tokenRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin-auth", adminAuthRoute);



app.get("/", (req, res) => {
  res.send("Hospital Queue Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
