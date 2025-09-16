require('dotenv').config();
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
const Question = require("./model/question.js"); // Your Mongoose model
const port = process.env.PORT || 3000;
// const exam=require("./routes/exam.js")
//submit result
const SubmitR = require("./submitresult.js")
//
const sampleQuestions = require("./submitquestion.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'));
app.set("views engin", "/views")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.engine("ejs", ejsMate);


// index route
app.get("/", async (req, res) => {
    // res.redirect("/result")
    res.render("home.ejs")
})
// adminq route
app.get("/admin", async (req, res) => {
    try {
        res.render("admin.ejs");
    } catch (error) {
        res.status(404).send("Page not found");
    }
});

app.get("/pathsala", async (req, res) => {
    const allstudent = await Student.find().sort({ roll_no: 1 }); // Ascending order
    res.render("index.ejs", { allstudent })
})

// addmition
app.get("/addmition", (req, res) => {
    try {
        res.render("addmition.ejs");
    } catch (error) {
        res.status(404).send("Page not found");
    }
});


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

    try {
        res.render("delete.ejs", { student })
    } catch (error) {
        res.status(404).send("Page not found");
    }
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
    try {
        res.render("fee.ejs", { stu })

    } catch (error) {
        res.status(404).send("Page not found");
    }
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

    try {
        res.render('edit.ejs', { student });

    } catch (error) {
        res.status(404).send("Page not found");
    }
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
//offline result route
app.post('/offlineresult', async (req, res) => {
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
//online result route
app.post('/onlineresult', async (req, res) => {
    const { roll_no } = req.body;
    try {
        const student = await Student.findOne({ roll_no }).populate("result");
        if (!student) {
            return res.status(400).send("Roll number does not exist");
        }
        res.render("online_result.ejs", { student });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
//submit result route
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

            // Parse subject marks (safely convert to integers)
            const math = parseInt(result.Math) || 0;
            const english = parseInt(result.English) || 0;
            const hindi = parseInt(result.Hindi) || 0;
            const behaviour = parseInt(result.Behaviour) || 0;

            const totalMarks = math + english + hindi + behaviour;
            const percentage = (totalMarks / 200) * 100;

            // Determine division
            let division = "Fail";
            if (percentage >= 95) division = "Topper";
            else if (percentage >= 80) division = "First";
            else if (percentage >= 70) division = "Second";
            else if (percentage >= 60) division = "Third";

            // Save result to student
            student.result = {
                roll_no: result.roll_no,
                Division: division,
                Math: math,
                English: english,
                Hindi: hindi,
                Behaviour: behaviour
            };

            await student.save();

            submitted.push({ roll_no: result.roll_no, student_name: student.student_name });
        } catch (err) {
            console.error("Error processing roll_no:", result.roll_no, err);
            errors.push({ roll_no: result.roll_no, error: "Server error" });
        }
    }

    res.redirect("/");
});



//submit question route
app.get("/online", async (req, res) => {
    try {
        await Question.insertMany(sampleQuestions);
        console.log("✅ Questions added successfully!");
        res.redirect("/");
    } catch (error) {
        console.error("❌ Error adding questions:", error);
        res.status(500).send("Error seeding questions");
    }
});

//online test route
app.get("/test", async (req, res) => {
  try {
    const questions = await Question.find(); // get all questions
    const duration = questions.length * 60;  // 1 min per question (in seconds)

    res.render("online.ejs", { questions, duration });
  } catch (err) {
    console.error("Error loading test:", err);
    res.status(500).send("Error loading test");
  }
});


app.post("/submit-test", async (req, res) => {
    try {
        const { rollNo, userName, totalQuestions, correctAnswers } = req.body;
        
        // 2️⃣ Find student
        const student = await Student.findOne({ roll_no: rollNo });
        if (!student) {
            return res.status(400).send("Roll number does not exist.");
        }


        // 4️⃣ Check if already submitted
        const examDate = new Date(student.online_test.exam_date).getDate();
        const currentDate = new Date().getDate() // Normalize to midnight

        if (examDate === currentDate) {
            return res.status(400).send("You have already submitted the test.");
        }


        //  Save test result
        student.online_test = {
            total_marks: totalQuestions,
            marks: correctAnswers,
            exam_date: new Date()
        };

        await student.save();

        // 6️⃣ Redirect or render success page
        res.redirect("/");

    } catch (err) {
        console.error("Error submitting test:", err);
        res.status(500).send("An error occurred while submitting the test.");
    }
});
//delete question route (for testing purposes)
app.get("/delete-questions", async (req, res) => {
    try {
        await Question.deleteMany({});
        console.log("✅ All questions deleted successfully!");
        res.redirect("/");
    } catch (error) {
        console.error("❌ Error deleting questions:", error);
        res.status(500).send("Error deleting questions");
    }
});


//server
app.listen(port, (req, res) => {
    console.log(`server runging on ${port}...`)
})
