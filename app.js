const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

//Addin logger to the middleware stack

app.use((req, res, next) => {
  console.log(`Request IP: ${req.url}`);
  console.log(`Request date: ${new Date()}`);
  next();
});

//Adding stattic file middleware to the middleware stack

app.use((req, res, next) => {
  //Uses path.join to find the path where the file should be
  let filePath = path.join(__dirname, 'static', req.url);
  //Built-in fs.stat gets info about a file
  fs.stat(filePath, (err, fileInfo) => {
    //If fs.stat fails continue to the next middleware
    if (err) {
      next();
      return;
    }
    //If the file exists call res.sendFile
    if (fileInfo.isFile()) res.sendFile(filePath);
    //Otherwise continues to next middleware
    else next();
  });
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
