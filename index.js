const express = require('express');
const { PORT } = require('./config');
const authRoutes = require('./api/auth/auth.routes');
const error = require('./middlewares/error');

const app = express();

app.use('/auth', authRoutes);
app.use(error);

app.get('/', (req, res) => {
  res.json({ hello: 'world ' });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
