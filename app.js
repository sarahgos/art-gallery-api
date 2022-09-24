const express = require('express');
//const Sequelize = require('sequelize');
const mariadb = require('mariadb');
const Artist = require('./models/artist');

const app = express()

app.get('/api/artist', function(request, response) {
    Artist.findAll().then((artist) => {
        response.json(artist)
    })
})

app.listen(8000);