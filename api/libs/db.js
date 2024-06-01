const { readJsonFile, writeJsonFile } = require('./json.js')

function addEntry (file, newEntry) {
  const data = readJsonFile(file)
  data.push(newEntry)
  writeJsonFile(file, data)
}

function editEntry (file, id, updatedEntry) {
  const data = readJsonFile(file)
  const index = data.findIndex(entry => entry.id === id)
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedEntry }
    writeJsonFile(data)
  } else {
    throw new Error(`Entry with id ${id} not found`)
  }
}

function deleteEntry (file, id) {
  const data = readJsonFile(file)
  const newData = data.filter(entry => entry.id !== id)
  if (newData.length !== data.length) {
    writeJsonFile(file, newData)
  } else {
    throw new Error(`Entry with id ${id} not found`)
  }
}

function likeAgent (file, userId, agentId) {
  const data = readJsonFile(file)
  const userIndex = data.findIndex(entry => entry.id === userId)
  if (userIndex !== -1) {
    if (!data[userIndex].likes.includes(agentId)) {
      data[userIndex].likes.push(agentId)
      writeJsonFile(file, data)
    } else {
      throw new Error(
        `Agent with id ${agentId} already liked by user ${userId}`
      )
    }
  } else {
    throw new Error(`User with id ${userId} not found`)
  }
}

function likedBy (file, agentId, userId) {
  const data = readJsonFile(file)
  const agentIndex = data.findIndex(entry => entry.id === agentId)
  if (agentIndex !== -1) {
    if (!data[agentIndex].likedBy.includes(userId)) {
      data[agentIndex].likedBy.push(userId)
      writeJsonFile(file, data)
    } else {
      throw new Error(
        `Agent with id ${agentId} already liked by user ${userId}`
      )
    }
  } else {
    throw new Error(`Agent with id ${userId} not found`)
  }
}

function unlikeAgent (file, userId, agentId) {
  const data = readJsonFile(file)
  const userIndex = data.findIndex(entry => entry.id === userId)
  if (userIndex !== -1) {
    const likesIndex = data[userIndex].likes.indexOf(agentId)
    if (likesIndex !== -1) {
      data[userIndex].likes.splice(likesIndex, 1)
      writeJsonFile(file, data)
    } else {
      throw new Error(`Agent with id ${agentId} not liked by user ${userId}`)
    }
  } else {
    throw new Error(`User with id ${userId} not found`)
  }
}

function unlikedBy (file, agentId, userId) {
  const data = readJsonFile(file)
  const agentIndex = data.findIndex(entry => entry.id === agentId)
  if (agentIndex !== -1) {
    const likesIndex = data[agentIndex].likedBy.indexOf(userId)
    if (likesIndex !== -1) {
      data[agentIndex].likedBy.splice(likesIndex, 1)
      writeJsonFile(file, data)
    } else {
      throw new Error(`Agent with id ${agentId} not liked by user ${userId}`)
    }
  } else {
    throw new Error(`Agent with id ${agentId} not found`)
  }
}

module.exports = {
  addEntry,
  editEntry,
  deleteEntry,
  likeAgent,
  likedBy,
  unlikeAgent,
  unlikedBy
}
