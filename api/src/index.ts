import cors from "cors";
import express from "express";
import path from "path";
import sudokuRouter from "./routes/sudokuRoute.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors())

// EndPoints
// app.use(express.static(path.join(__dirname, '../../client/dist')))
// app.use("/api", sudokuRouter);
app.use("/", sudokuRouter);

// Server Running
app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});
