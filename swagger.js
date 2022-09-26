const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/routes.js']

swaggerAutogen(outputFile, endpointsFiles)