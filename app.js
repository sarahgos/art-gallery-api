const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const bodyParser = require('body-parser');
const artefactRoutes = require('./routes/artefactRoutes');
const artistRoutes = require('./routes/artistRoutes');
const exhibitionRoutes = require('./routes/exhibitionRoutes');
const { auth } = require('express-openid-connect');
const cors = require("cors")

const app = express()

app.use(bodyParser.json());
app.use(cors())

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'Ws2wGY5Cm7Itahdpzt5zwJSvrX5AhFXP',
    issuerBaseURL: 'https://dev-itj9qm13.us.auth0.com',
    secret: 'LONG_RANDOM_STRING'
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));
 
app.use("/", artistRoutes);
app.use("/", artefactRoutes);
app.use("/", exhibitionRoutes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
app.listen(3000, () => {
    console.log("server listening on port 3000!");
});