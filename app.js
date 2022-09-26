const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const bodyParser = require('body-parser');
const artefactRoutes = require('./routes/artefactRoutes');
const artistRoutes = require('./routes/artistRoutes');
const exhibitionRoutes = require('./routes/exhibitionRoutes');

const app = express()

app.use(bodyParser.json());
app.use("/", artistRoutes);
app.use("/", artefactRoutes);
app.use("/", exhibitionRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
app.listen(3000, () => {
    console.log("server listening on port 3000!");
});