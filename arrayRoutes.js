const express = require("express");
const router = express.Router();

const ArrayModel = require("../models/Array");

// 1. Get all arrays
router.get("/", async (req, res) => {
try {
const arrays = await ArrayModel.find();
res.json(arrays);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

// 2. Add a new array
router.post("/", async (req, res) => {
try {
const newArray = new ArrayModel({
name: req.body.name,
elements: req.body.elements
});

``
    const savedArray = await newArray.save();
    res.status(201).json(savedArray);
} catch (error) {
    res.status(400).json({ message: error.message });
}
``

});

// 3. Update an array
router.put("/:id", async (req, res) => {
try {
const updatedArray = await ArrayModel.findByIdAndUpdate(
req.params.id,
{
name: req.body.name,
elements: req.body.elements
},
{ new: true, runValidators: true }
);

``
    if (!updatedArray) {
        return res.status(404).json({ message: "Array not found" });
    }

    res.json(updatedArray);
} catch (error) {
    res.status(400).json({ message: error.message });
}
``

});

// 4. Delete an array
router.delete("/:id", async (req, res) => {
try {
const deletedArray = await ArrayModel.findByIdAndDelete(req.params.id);

``
    if (!deletedArray) {
        return res.status(404).json({ message: "Array not found" });
    }

    res.json({ message: "Array deleted successfully" });
} catch (error) {
    res.status(400).json({ message: error.message });
}
``

});

module.exports = router;
