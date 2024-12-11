// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const path = require('path');

// // // Initialize express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // MongoDB connection
// // mongoose.connect('mongodb://localhost:27017/employeeDB', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // }).then(() => {
// //   console.log('MongoDB connected');
// // }).catch((err) => {
// //   console.log('MongoDB connection error:', err);
// // });

// // // Employee Schema
// // const employeeSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true },
// //   position: { type: String, required: true },
// //   department: { type: String, required: true },
// //   salary: { type: Number, required: true }
// // });

// // // Employee Model
// // const Employee = mongoose.model('Employee', employeeSchema);

// // // Routes

// // // Create an employee
// // app.post('/api/employees', async (req, res) => {
// //   const { name, email, position, department, salary } = req.body;
// //   const newEmployee = new Employee({ name, email, position, department, salary });
// //   await newEmployee.save();
// //   res.json(newEmployee);
// // });

// // // Get all employees
// // app.get('/api/employees', async (req, res) => {
// //   const employees = await Employee.find();
// //   res.json(employees);
// // });

// // // Get an employee by ID
// // app.get('/api/employees/:id', async (req, res) => {
// //   const employee = await Employee.findById(req.params.id);
// //   res.json(employee);
// // });

// // // Update an employee by ID
// // app.put('/api/employees/:id', async (req, res) => {
// //   const { name, email, position, department, salary } = req.body;
// //   const updatedEmployee = await Employee.findByIdAndUpdate(
// //     req.params.id,
// //     { name, email, position, department, salary },
// //     { new: true }
// //   );
// //   res.json(updatedEmployee);
// // });

// // // Delete an employee by ID
// // app.delete('/api/employees/:id', async (req, res) => {
// //   await Employee.findByIdAndDelete(req.params.id);
// //   res.json({ message: 'Employee deleted' });
// // });

// // // Serve React frontend in production
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../client/build')));
// //   app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// //   });
// // }

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/employeess", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  department: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

app.post("/api/employees", async (req, res) => {
  const { name, email, phone, department } = req.body;
  const newEmployee = new Employee({ name, email, phone, department });
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
