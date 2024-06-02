const { Router } = require('express')
const multer = require('multer')
const { join } = require('path')
const Controller = require('../controllers/agents.controller.js')
const checkToken = require('../middlewares/checkToken.js')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = ''
    if (path.extname(file.originalname) === '.mp4') {
      uploadPath = join(__dirname, '..', 'videos')
    } else {
      uploadPath = join(__dirname, '..', 'images')
    }
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/', Controller.fetchAgents)

router.get('/:id', Controller.fetchAgent)

router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'wallpaper', maxCount: 1 },
    { name: 'q_video', maxCount: 1 },
    { name: 'e_video', maxCount: 1 },
    { name: 'c_video', maxCount: 1 },
    { name: 'x_video', maxCount: 1 }
  ]),
  Controller.createAgent
)

router.post('/like', checkToken, Controller.toggleLike)

router.delete('/:id', Controller.deleteAgent)

module.exports = router
