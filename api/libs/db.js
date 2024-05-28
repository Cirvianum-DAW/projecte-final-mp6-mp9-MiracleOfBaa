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
    writeJsonFile(newData)
  } else {
    throw new Error(`Entry with id ${id} not found`)
  }
}

module.exports = { addEntry, editEntry, deleteEntry }
