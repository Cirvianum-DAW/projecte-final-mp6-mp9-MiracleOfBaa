const fs = require('fs')
const path = require('path')

function readJsonFile (file) {
  const filePath = path.join(__dirname, '..', 'db', file)
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function writeJsonFile (file, data) {
  const filePath = path.join(__dirname, '..', 'db', file)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}

module.exports = { readJsonFile, writeJsonFile }
