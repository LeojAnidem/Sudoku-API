import sudokuRouter from "./routes/sudokuRoute.js";
import express from "express";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

// EndPoints
app.use(express.static(path.join(__dirname, '../../client/dist')))
app.use("/api", sudokuRouter);

// Server Running
app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});
