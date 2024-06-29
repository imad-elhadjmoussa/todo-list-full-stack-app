
const express = require('express');
const app = express();

const { verfiyToken } = require('./middleware/auth');

const authRoutes = require('./routes/auth');

const userRoutes = require('./routes/user');

const taskRoutes = require('./routes/tasks');

const statusRoutes = require('./routes/status');

const categoriesRoutes = require('./routes/categories');

const cros = require('cors');
app.use(cros({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.use('/', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/tasks', taskRoutes);

app.use('/api/status', statusRoutes);

app.use('/api/categories', categoriesRoutes);




app.listen(5000, () => {
    console.log('Server is running on port 5000');
});