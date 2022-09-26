const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/artistRoutes.js', './routes/artefactRoutes', './routes/exhibitionRoutes.js']

swaggerAutogen(outputFile, endpointsFiles)