// import express from 'express';
// import db from './config/connection.js';
// import routes from './routes/index.js';
// import dotenv from 'dotenv';
// dotenv.config();

// await db();

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../client/dist'));
//   app.get('*', (_req, res) => {
//     res.sendFile('../client/dist/index.html');
//   });
// }

// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}!`);
// });

import express from 'express';
import path from 'path';
import db from './config/connection.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  // Serve static files from the client/dist directory using an absolute path
  app.use(express.static(path.join(__dirname, 'client/dist')));
  // For any other route, send the index.html file from the client/dist directory
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'client/dist') });
  });
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
