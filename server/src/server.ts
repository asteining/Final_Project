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
  // Use process.cwd() to get the current working directory (project root)
  const projectRoot = process.cwd();
  // Build the absolute path to the client's dist folder
  const clientDistPath = path.join(projectRoot, 'client', 'dist');
  
  // Serve static files from the client/dist folder
  app.use(express.static(clientDistPath));
  
  // For any route not handled, send the index.html file from the client/dist folder
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: clientDistPath });
  });
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
