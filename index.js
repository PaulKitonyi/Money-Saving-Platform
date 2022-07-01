const express = require('express');
const mongoose = require('mongoose');
const accounts = require('./routes/accounts');
//App
const app = express();

//Database connection
mongoose
  .connect('mongodb://localhost/money-saving-platform')
  .then(() => console.log('Connected to mongodb...'))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use('/api/create-account', accounts);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server running on port ${port}`));
