const { readJsonFile } = require('../libs/json.js')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../secret.js')
const {
  deleteEntry,
  likeAgent,
  likedBy,
  unlikeAgent,
  unlikedBy
} = require('../libs/db.js')

function fetchAgents (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const filter = req.query.filter
    let agents = readJsonFile('agents.json')
    if (filter === 'liked' && token) {
      const data = jwt.verify(token, JWT_SECRET)
      agents = agents.filter(agent => agent.likedBy.includes(data.id))
    } else if (filter && filter !== 'liked') {
      agents = agents.filter(agent => agent.type === filter)
    }
    res.status(200).json({
      agents
    })
  } catch (error) {
    next(error)
  }
}

function fetchAgent (req, res, next) {
  try {
    const id = req.params.id
    const agents = readJsonFile('agents.json')
    res.status(200).json({
      agent: agents.filter(agent => agent.id === id)[0]
    })
  } catch (error) {
    next(error)
  }
}

function createAgent (req, res, next) {
  try {
    const id = req.params.id
    const agents = readJsonFile('agents.json')
    res.status(200).json({
      agent: agents.filter(agent => agent.id === id)[0]
    })
  } catch (error) {
    next(error)
  }
}

function toggleLike (req, res, next) {
  try {
    const userId = req.user.id
    const agentId = req.body.agentId
    const users = readJsonFile('users.json')
    if (users.find(user => user.id === userId).likes.includes(agentId)) {
      unlikeAgent('users.json', userId, agentId)
      unlikedBy('agents.json', agentId, userId)
    } else {
      likeAgent('users.json', userId, agentId)
      likedBy('agents.json', agentId, userId)
    }
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

function deleteAgent (req, res, next) {
  try {
    const id = req.params.id
    deleteEntry('agents.json', id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  fetchAgents,
  fetchAgent,
  createAgent,
  toggleLike,
  deleteAgent
}
