const express = require('express');
const postsRouter = require('./routers/posts');
const usersRouter = require('./routers/users');

require('./db/mongoose');

const app = express();
const port = 3000;

app.use(express.json());

app.use(postsRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log('Server started on port', port);
});
