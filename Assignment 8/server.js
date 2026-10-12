const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Rahul", age: 20 },
    { id: 2, name: "Priya", age: 21 },
    { id: 3, name: "Amit", age: 19 }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
    const newStudent = req.body;

    students.push(newStudent);

    res.json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT API
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE API
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter((s) => s.id !== id);

    res.json({
        message: "Student deleted successfully",
        student: student
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
