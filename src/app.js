import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import statisticRoutes from './routes/statisticRoutes.js';
import prisma from '../prisma/prisma.js';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/statistics', statisticRoutes);

// Exemple de route test
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})


app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Server is running on http://localhost:3000')
});
