const http = require('http');
const express = require("express")
const app = express();
const path = require("path")
const fs = require('fs');
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use('/static', express.static(path.join(__dirname, 'wordle.html')))

//app.use(`/`,express.static(`${__dirname}`));
app.use(express.static(__dirname));
app.get(`/`,(req,res) => {
    console.log("user connected")
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile(`${__dirname}/wordle.html`, (err) => {
        if (err) {res.end(err.message)}
    })
});
app.post(`/dictionary`, (req,res) => {
    const file = fs.readFileSync('dictionary.json');
    const dictionary = JSON.parse(file);
    const word = req.body.word;

    
    res.send(word in dictionary)
    
})
app.get(`/word`, (req,res) => {
    const word = fs.readFileSync('word_of_day.txt','utf8');
    console.log(word)
    
    res.send(word)
    
})
//const server = http.createServer(requestListener);
const server = app.listen(8080)
  