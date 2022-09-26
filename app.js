const express = require('express');
const Sequelize = require('sequelize');
const Artefact = require('./models/artefact');
const Exhibition = require('./models/exhibition');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');


const app = express()
/*
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Art Gallery API',
            version: '1.0.0'
        }
    },
    apis: ['app.js'],
};*/

//const swaggerDocs = swaggerJSDoc(swaggerOptions);
//console.log(swaggerDocs);

app.use(bodyParser.json());
app.use("/", routes);

/**
 * @swagger
 * /api/artists:
 *  get:
 *      description: Get all artists
 *      responses:
 *          200:
 *              description: Success
 *  
 *  post: 
 *      description: Create a new book
 *      parameters:
 *          -name: first_name
 *          description: First name of artist
 *          in: formData
 *          required: true
 *          type: String
 *      responses:
 *          201:
 *              description: Created
 */



// Returns artefact by id.
app.get('/api/artefacts/:id', function(request, response) {
    let { id } = request.params;
    Artefact.findByPk(id).then((artefact) => {
        if (artefact) {
            response.json(artefact)
        }
        else {
            response.status(404).send();
        }
    })
})

// Returns exhibition by id.
app.get('/api/exhibitions/:id', function(request, response) {
    let { id } = request.params;
    Exhibition.findByPk(id).then((exhibition) => {
        if (exhibition) {
            response.json(exhibition)
        }
        else {
            response.status(404).send();
        }
    })
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
app.listen(3000, () => {
    console.log("server listening on port 3000!");
});