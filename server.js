var express = require('express');
var app     = express();
var path    = require('path');

app.use('/static', express.static(__dirname + '/static', {extensions: ['html', 'js']}));
app.use('/src', express.static(__dirname + '/src', {extensions: ['html', 'js']}));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(1234);
