require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const {PORT = 3000} = process.env;

app.use(morgan('dev'));
app.use(express.json());





app.listen(PORT, () => console.log('Listening on Port', PORT));