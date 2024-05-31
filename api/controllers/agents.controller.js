const { readJsonFile } = require('../libs/json.js')

function fetchAgents (req, res, next) {
  try {
    const agents = readJsonFile('agents.json')
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

module.exports = { fetchAgents, fetchAgent }
