const express = require('express');
const env = require('dotenv').config();
const PORT = process.env.PORT;
const colors = require('colors');
const goalsRoute = require('./routes/goalRoutes');
const errorHandler = require('./midleware/errorMidleware');
const erroHandler = require('./midleware/errorMidleware');
const dbConnect = require('../server/config/db');

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalsRoute);
app.use(erroHandler);
app.listen(PORT, () => console.log('server listen to port '.green + PORT));
