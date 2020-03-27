const express = require("express")

const routes = express.Router()

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


routes.post('/sessions', SessionController.create)

// Listando os dados no banco de dados
routes.get('/ongs', OngController.index)
    // Criando os dados informados no Banco
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)


routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)



module.exports = routes