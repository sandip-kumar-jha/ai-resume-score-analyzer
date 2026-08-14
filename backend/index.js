const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

require('./conn');

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: true
}));

const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.use('/api/user', UserRoutes);
app.use('/api/resume', ResumeRoutes);

app.get('/', (req, res) => {
    res.send('AI Resume Score Backend is Running');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend is running on port ${PORT}`);
});