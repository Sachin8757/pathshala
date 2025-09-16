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
        res.render("online.ejs", { questions, duration: 1200 }); // 1200 seconds (20 min)
    } catch (err) {
        res.status(500).send("Error loading test");
    }
});

app.post("/submit-test", async (req, res) => {
  try {
    const { rollNo, userName, totalQuestions, correctAnswers } = req.body;

    // 1️⃣ Validate required fields
    if (!rollNo || !userName) {
      return res.status(400).send("Roll number and name are required.");
    }

    // 2️⃣ Find student
    const student = await Student.findOne({ roll_no: rollNo });
    if (!student) {
      return res.status(400).send("Roll number does not exist.");
    }

    // 3️⃣ Time validation (Only allow between 6:00 AM - 6:00 PM)
    const currentHour = new Date().getHours(); // ✅ Correct way
    if (currentHour < 6 || currentHour >= 18) {
      return res
        .status(400)
        .send("Online test can only be submitted between 6:00 AM and 6:00 PM.");
    }

    // 4️⃣ Check if already submitted
    if (student.online_test && student.online_test.exam_date) {
      return res.status(400).send("You have already submitted the test.");
    }

    //  Save test result
    student.online_test = {
        total_marks:totalQuestions,
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