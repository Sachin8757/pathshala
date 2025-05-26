if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express')
const mongoose = require("./model/connection.js")
const Student = require("./model/student.js")//student schema
const Month = require("./model/fee.js");//fee schema
var methodoverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const { defaultMaxListeners } = require('events');
const { error } = require('console');
const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'));
app.set("views engin", "/views")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.engine("ejs", ejsMate);


// index route
app.get("/", async (req, res) => {
    const allstudent = await Student.find();
    res.render("index.ejs", { allstudent })
})
// app.post("/", (req, res) => {
//     const { hello } = req.body;
//     console.log(hello)
// })



// addmition
app.get("/addmition", (req, res) => {
    res.render("addmition.ejs")
})

app.post("/addmition", async (req, res) => {
    const { username, student_name, join_date, fathers_name, fee, password } = req.body;
    if (password === process.env.PASSWORD) {
        try {

            const newStudent = new Student({
                username,
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
        res.redirect("/")
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
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/details/' + req.params.id);
});


app.listen(port, (req, res) => {
    console.log(`server runging on ${port}...`)
})