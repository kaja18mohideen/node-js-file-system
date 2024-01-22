const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js File System API');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.post('/createFile', (req, res) => {
    const currentDate = new Date().toISOString().replace(/:/g, '_');
    const fileName = `./files/${currentDate}.txt`;
  
    fs.writeFile(fileName, currentDate, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'File created successfully', fileName });
      }
    });
  });
  
  app.get('/getAllFiles', (req, res) => {
    const folderPath = './files/';
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ files });
      }
    });
  });
  