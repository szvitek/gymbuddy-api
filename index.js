const express = require('express');
const { port } = require('./config');

const app = express();

require('./boot/passport-local')(app);
require('./boot/routes')(app);
require('./boot/db')();

// test route, kinda healthcheck
app.get('/', (req, res) => {
  res.json({ hello: 'world ' });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
