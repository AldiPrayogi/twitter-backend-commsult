// import dependencies and initialize express
const express = require('express');
const path = require('path');
const cors = require('cors');

let corsOptions = {
  origin: 'http://localhost:3000',
};

const db = require('./server/models');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
});

const healthRoutes = require('./server/routes/healthRoute');
const swaggerRoutes = require('./server/routes/swaggerRoute');
const userRoutes = require('./server/routes/userRoute');
const authRoutes = require('./server/routes/authRoute');
const tweetRoutes = require('./server/routes/tweetRoute');

const app = express();

// enable parsing of http request body
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes and api calls
app.use('/health', healthRoutes);
app.use('/swagger', swaggerRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tweets', tweetRoutes);

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './public', 'index.html'));
});

// start node server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});

// error handler for unmatched routes or api calls
app.use((req, res) => {
  res.status(500).send({
    message: 'Internal Server Error',
  });
});

module.exports = app;
