const mongoose = require("mongoose");

const arraySchema = new mongoose.Schema({
name: {
type: String,
required: true
},
elements: {
type: [Number],
required: true
}
});

module.exports = mongoose.model("Array", arraySchema);
