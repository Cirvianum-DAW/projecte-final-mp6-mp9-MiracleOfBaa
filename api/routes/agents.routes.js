const { Router } = require('express')
const Controller = require('../controllers/agents.controller.js')

const router = Router()

router.get('/', Controller.fetchAgents)

router.get('/:id', Controller.fetchAgent)

module.exports = router
