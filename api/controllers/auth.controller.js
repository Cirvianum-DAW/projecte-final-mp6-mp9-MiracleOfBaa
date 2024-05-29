const { randomUUID } = require('node:crypto')
const { addEntry } = require('../libs/db.js')
const { readJsonFile } = require('../libs/json.js')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../secret.js')

function registerUser (req, res, next) {
  try {
    const username = req.body.username
    const password = req.body.password
    const users = readJsonFile('users.json')
    const repeated = users.find(
      user =>
        user.username.trim().toLowerCase() === username.trim().toLowerCase()
    )
    if (repeated) {
      return res.status(400).send({ error: 'Username already registered' })
    }
    addEntry('users.json', {
      id: randomUUID(),
      role: 'user',
      username,
      password
    })
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

function loginUser (req, res, next) {
  try {
    const username = req.body.username
    const password = req.body.password
    const users = readJsonFile('users.json')
    const foundUser = users.find(
      user =>
        user.username.trim().toLowerCase() === username.trim().toLowerCase()
    )
    if (!foundUser) {
      return res.status(400).send({ error: 'Cannot find this username' })
    }
    if (foundUser.password === password) {
      const token = jwt.sign(
        {
          id: foundUser.id,
          role: foundUser.role,
          username: foundUser.username
        },
        JWT_SECRET,
        {
          expiresIn: '30d'
        }
      )
      res.status(200).json({
        token
      })
    } else return res.status(400).send({ error: 'Wrong password' })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser }