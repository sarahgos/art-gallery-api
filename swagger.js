const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/artistRoutes.js', './routes/artefactRoutes']

swaggerAutogen(outputFile, endpointsFiles)