import express from "express";
import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

// db
import db from "./db/database.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import CustomError from "./error.js";

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 201, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors({ ...corsOptions }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use(errorHandler.errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("Server is up!");
});

const startServer = async () => {
  try {
    await db.authenticate().then(() => console.log("Database connected..."));
    app.listen(process.env.PORT, () => {
      console.log(`Listening on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    throw new CustomError(error);
  }
};
startServer();
