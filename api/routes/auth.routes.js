const { Router } = require('express')
const Controller = require('../controllers/auth.controller.js')

const router = Router()

router.post('/register', Controller.registerUser)

router.post('/login', Controller.loginUser)

module.exports = router
