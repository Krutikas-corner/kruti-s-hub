const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const arrayRoutes = require("./routes/arrayRoutes");

app.get("/", (req, res) => {
res.send("Array API Server is Running!");
});

app.use("/api/arrays", arrayRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected Successfully");


    app.listen(process.env.PORT || 5000, () => {
        console.log("Server running on port 5000");
    });
})
.catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
});

