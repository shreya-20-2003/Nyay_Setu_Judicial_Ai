import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Use official cors package for easier CORS management
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse JSON body AFTER CORS
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://kundanaa2003_db_user:lZh6lt9qm985jQkH@cluster0.qfoz8hz.mongodb.net/myDatabase?tls=true&retryWrites=true&w=majority');

mongoose.connection.on('error', console.error.bind(console, '❌ MongoDB error:'));
mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
});


// Routes
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on ${PORT}`);
});
