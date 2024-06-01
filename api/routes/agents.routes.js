const { Router } = require('express')
const Controller = require('../controllers/agents.controller.js')
const checkToken = require('../middlewares/checkToken.js')

const router = Router()

router.get('/', Controller.fetchAgents)

router.get('/:id', Controller.fetchAgent)

router.post('/like', checkToken, Controller.toggleLike)

router.delete('/:id', Controller.deleteAgent)

module.exports = router
