const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Middleware to handle form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.get("/", function(req, res) {
  fs.readdir('./files', function(err, files) {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    res.render('index', { files: files });
  });
});



app.post("/create", function(req, res) {
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`,req.body.details,function(err){
        res.redirect('/');
    });
})

app.listen(5000, function() {
  console.log("Server is running on port 5000");
});

//part 8 and 9 is remaining