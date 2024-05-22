const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const inputDir = path.join(
  __dirname,
  'Prueba paralax',
  'Agents',
  'FotosAgentes'
)
const outputDir = path.join(
  __dirname,
  'Prueba paralax',
  'Agents',
  'FotosAgentes',
  'optimized'
)

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file)
  const outputFileName = file.replace(/\.(png|jpg|jpeg)$/, '.webp')
  const outputPath = path.join(outputDir, outputFileName)

  sharp(inputPath).webp({ quality: 20 }).toFile(outputPath, err => {
    if (err) {
      console.error(`Error processing ${file}. ${err}`)
    } else {
      console.log(`Processed ${file} to ${outputFileName}`)
    }
  })
})
