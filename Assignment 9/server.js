const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to My First API!"
    });
});

app.get("/about", (req, res) => {
    res.json({
        message: "This is my Simple API Assignment."
    });
});

app.get("/contact", (req, res) => {
    res.json({
        message: "Contact us at example@gmail.com"
    });
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
