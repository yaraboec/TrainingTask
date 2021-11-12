require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth.router');
const taskRouter = require('./routes/task.router');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const corsOpts = {
  origin: process.env.clientUrl,

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
};

app.use(cors(corsOpts));

app.use('/api', taskRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.dbConString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (err) { console.error(err); }
};

start();
