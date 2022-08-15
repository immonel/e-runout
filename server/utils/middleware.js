const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {

  return response.status(500).json({ 
    error: error.message 
  })

}
  
module.exports = {
  unknownEndpoint,
  errorHandler
}