const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Student Schema
const studentSchema = new Schema({
    roll_no: { type: String, required: true },
    student_name: { type: String, required: true },
    join_date: { type: Date, default: Date.now },
    fathers_name: { type: String, required: true },
    fee: { type: Number, required: true },

    // Array of references to Month documents
    months: [{ type: Schema.Types.ObjectId, ref: 'Month' }]
});

module.exports = mongoose.model("Student", studentSchema);
