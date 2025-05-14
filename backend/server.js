require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const leadRoutes = require('./routes/lead.routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error Handler Middleware
app.use(errorMiddleware);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(`Error: ${err}`);
    }
    console.log(`Server running on port ${PORT}`);
});
