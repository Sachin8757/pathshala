const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Month Schema
const monthSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    jan: { type: String, default: "" },
    feb: { type: String, default: "" },
    mar: { type: String, default: "" },
    apr: { type: String, default: "" },
    may: { type: String, default: "" },
    jun: { type: String, default: "" },
    jul: { type: String, default: "" },
    aug: { type: String, default: "" },
    sep: { type: String, default: "" },
    oct: { type: String, default: "" },
    nov: { type: String, default: "" },
    dec: { type: String, default: "" }
});

module.exports = mongoose.model("Month", monthSchema);
