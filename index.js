const express = require('express');
const path = require('path'); 
const app = express();
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files});
    })    
})

app.get("/file/:fileName", (req, res) => {
    fs.readFile(`./Files/${req.params.fileName}`, "utf-8", function(err, filedata){
        res.render('show', {fileName: req.params.fileName, data: filedata})
    }) 
})

app.get("/edit/:fileName", (req, res) => {
    res.render('edit', {filename: req.params.fileName}) 
})

app.post('/edit', (req, res) => {
    fs.rename(`./Files/${req.body.previous}`, `./Files/${req.body.new}`, (err) => {
            res.redirect('/');
    });
})

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/');
    })
})

app.listen(3000);