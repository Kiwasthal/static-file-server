const express = require('express');
const path = require('path');
const morgan = require('morgan');

const morganMiddleware = morgan('short');
const staticPath = path.join(__dirname, 'static');

const app = express();

//Adding logger to the middleware stack

// app.use((req, res, next) => {
//   console.log(`Request IP: ${req.url}`);
//   console.log(`Request date: ${new Date()}`);
//   next();
// });

//Use morgan insead of custom logger

app.use(morganMiddleware);

//Adding static file middleware to the middleware stack

// app.use((req, res, next) => {
//   //Uses path.join to find the path where the file should be
//   let filePath = path.join(__dirname, 'static', req.url);
//   //Built-in fs.stat gets info about a file
//   fs.stat(filePath, (err, fileInfo) => {
//     //If fs.stat fails continue to the next middleware
//     if (err) {
//       next();
//       return;
//     }
//     //If the file exists call res.sendFile
//     if (fileInfo.isFile()) res.sendFile(filePath);
//     //Otherwise continues to next middleware
//     else next();
//   });
// });

//Using the express static Middleware function

app.use(express.static(staticPath));

//Express's error-handling middleware does not handle errors that are thrown with the
//throw keyword, only when you call next with an argument

//The 404 handler (ommited next since it's always the last fn in the middleware stack)
app.use((err, req, res, next) => {
  //Logs the error
  console.error(err);
  //Continues to the next error-handling middleware
  next(err);
});

//In error handling we need an extra arg to specify the err
app.use((err, req, res, next) => {
  //Sets the status code to 500
  res.status(500);
  //Sends the error text
  res.send('internal sever error');
});

app.use((req, res) => {
  //Set appropriate status code
  res.status(404);
  //Sends the error "File not found"
  res.send('File not found!');
});

//Moving the error handler in another place of the app is recipe for failure.
//The error handler should always be the last call on the middleware stack

app.listen(3000, () => {
  console.log('App started on port 3000');
});
