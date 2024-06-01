const { Router } = require('express')
const Controller = require('../controllers/auth.controller.js')
const checkToken = require('../middlewares/checkToken.js')

const router = Router()

router.post('/register', Controller.registerUser)

router.post('/login', Controller.loginUser)

router.post('/profile', checkToken, Controller.updateProfile)

module.exports = router
