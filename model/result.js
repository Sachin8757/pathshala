const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Month Schema
const result = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    roll_no:String,
    Date:Date,
    Math: String,
    English:  String,
    Hindi:String
});

module.exports = mongoose.model("Result", result);
