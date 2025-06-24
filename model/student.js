const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Student Schema
const studentSchema = new Schema({
     roll_no: { 
    type: String, 
    required: true, 
    unique: true, // Ensures uniqueness
    index: true   // Improves query performance
  },
    student_name: { type: String, required: true },
    join_date: { type: Date, default: Date.now },
    fathers_name: { type: String, required: true },
    fee: { type: Number, required: true },

    // Array of references to Month documents
    months: [{ type: Schema.Types.ObjectId, ref: 'Month' }],
    //result section
    result:{
    roll_no:Number,
    Division:String,
    Math: Number,
    English:  Number,
    Hindi:Number,
    Behaviour:Number
    }
});

module.exports = mongoose.model("Student", studentSchema);
