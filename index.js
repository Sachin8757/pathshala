// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }
require('dotenv').config();
const express = require('express')
const mongoose = require("./model/connection.js")
const Student = require("./model/student.js")//student schema
const Month = require("./model/fee.js");//fee schema
const Result = require('./model/result.js');//result schema
var methodoverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const { defaultMaxListeners } = require('events');
const { error } = require('console');
const app = express();
const port = process.env.PORT || 3000;

//submit result
const SubmitR=require("./submitresult.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'));
app.set("views engin", "/views")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.engine("ejs", ejsMate);


// index route
app.get("/", async (req, res) => {
    res.render("home.ejs")
})

app.get("/pathsala", async (req, res) => {
    const allstudent = await Student.find();
    res.render("index.ejs", { allstudent })
})

// addmition
app.get("/addmition", (req, res) => {
    res.render("addmition.ejs")
})

app.post("/addmition", async (req, res) => {
    const { roll_no, student_name, join_date, fathers_name, fee, password } = req.body;
    const student = await Student.findOne({ roll_no: roll_no });
    if (student) {
        res.status(300).send("roll no exist")
    } else {

        if (password === process.env.PASSWORD) {
            try {

                const newStudent = new Student({
                    roll_no,
                    student_name,
                    join_date,
                    fathers_name,
                    fee
                });
                await newStudent.save();
                res.redirect("/")
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.error("password is worng")
        }
    }


})

// show in details 
app.get("/details/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id).populate("months");
        if (!student) {
            return res.status(404).send("Student not found");
        }
        res.render("details.ejs", { student });
    } catch (err) {
        res.status(500).send("Server error: " + err.message);
    }
});
//delete student
app.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.render("delete.ejs", { student })
})
app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const { adminPassword } = req.body;
    if (adminPassword === process.env.PASSWORD) {
        const stu = await Student.findByIdAndDelete(id);
        res.redirect("/pathsala")
    } else {
        return res.status(403).send("Incorrect admin password.");
    }

})
//payfee student
app.get("/payfee/:id", async (req, res) => {
    const { id } = req.params;
    const stu = await Student.findById(id);
    res.render("fee.ejs", { stu })
});

app.post("/payfee/:id", async (req, res) => {
    const { month, amount, password } = req.body;
    const { id } = req.params;
    if (password === process.env.PASSWORD) {
        try {
            const student = await Student.findById(id).populate("months");
            if (!student) {
                return res.status(404).send("Student not found");
            }

            let monthDoc;

            if (!student.months || student.months.length === 0) {
                monthDoc = new Month({ studentId: student._id });
                await monthDoc.save();

                student.months.push(monthDoc._id);
                await student.save();
            } else {
                monthDoc = student.months[0];
            }

            const validMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            const monthKey = month.toLowerCase();

            if (!validMonths.includes(monthKey)) {
                return res.status(400).send("Invalid month name");
            }

            await Month.findByIdAndUpdate(
                monthDoc._id,
                { $set: { [monthKey]: `Paid ₹${amount}` } },
                { new: true }
            );

            // ✅ Redirect to homepage after successful payment
            res.redirect(`/details/${id}`);

        } catch (error) {
            res.status(500).send("Error processing payment: " + error.message);
        }

    } else {
        return res.status(403).send("Incorrect admin password.");
    }
});

// GET edit page
app.get('/edit/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
  
    res.render('edit.ejs', { student });
});

// POST update
app.post("/edit/:id", async (req, res) => {
    const { password } = req.body;
    if (password === process.env.PASSWORD) {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/details/' + req.params.id);
    } else {
        return res.status(403).send("Incorrect admin password.");
    }

});

//about route
app.get('/about', async (req, res) => {
    res.render('about.ejs');
});
//search route
app.post("/search", async (req, res) => {
    const { roll } = req.body;
    const student = await Student.findOne({ roll_no: roll });
    if (student) {
        res.render("search.ejs", { student })
    } else {
        return res.status(403).send("Roll_No Not Exist");
    }

})

//result route
app.get('/result', async (req, res) => {
    // return res.status(500).send("Exam Not happend")
    res.render("exam.ejs")
});
app.post('/result', async (req, res) => {
    const { roll_no } = req.body;
    try {
        const student = await Student.findOne({ roll_no }).populate("result");
        if (!student) {
            return res.status(400).send("Roll number does not exist");
        }
        res.render("result.ejs", { student });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
app.get("/submit-result", async (req, res) => {
  const submitted = [];
  const errors = [];

  for (const result of SubmitR) {
    try {
      const student = await Student.findOne({ roll_no: result.roll_no });

      if (!student) {
        errors.push({ roll_no: result.roll_no, error: "Student not found" });
        continue;
      }

      const newResult = new Result({
        studentId: student._id,
        Date: result.Date || new Date(), // fallback if Date not provided
        Math: result.Math,
        English: result.English,
        Hindi: result.Hindi
      });

      const savedResult = await newResult.save();

      student.result.push(savedResult._id);
      await student.save();

      submitted.push({ roll_no: result.roll_no, student_name: student.student_name });
    } catch (err) {
      console.error("Error processing roll_no:", result.roll_no, err);
      errors.push({ roll_no: result.roll_no, error: "Server error" });
    }
  }

  // Optionally show a success page with details:
//   res.render("bulkResultStatus.ejs", { submitted, errors });
res.redirect("/")
});

app.listen(port, (req, res) => {
    console.log(`server runging on ${port}...`)
})