const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const articlesRoutes = require('./Routes/articlesRoutes');
const lawyerRoutes = require('./Routes/lawyerRoutes');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/lawyers', lawyerRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));