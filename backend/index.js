const dotenv = require("dotenv").config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { default: mongoose } = require("mongoose");
const errorHandler = require('./middlewares/errorMiddleware');
const protect = require('./middlewares/userMiddleware');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

// -------------- Middlewares --------------
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_URI],
    credentials: true
}));

// -------------- Routes Middlewares --------------
app.get("/", (req,res) => {
  res.status(200).send("Server is running");
});
app.use('/api/users', userRoutes);
app.use('/api/todos', protect, todoRoutes);

// -------------- Error Handler Middleware --------------
app.use(errorHandler);

// -------------- CONNECT DB AND RUN SERVER --------------
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })