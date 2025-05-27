// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Month Schema
// const result = new Schema({
//     studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
//     Date:Date,
//     Math: String,
//     English:  String,
//     Hindi:String
// });

// module.exports = mongoose.model("Result", result);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    Date: { type: Date, default: Date.now },
    Math: String,
    English: String,
    Hindi: String
});

// This should be "Result", not "result"
module.exports = mongoose.model("Result", resultSchema);
