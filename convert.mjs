import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import path from 'path'
import fs from 'fs'

// Establecer la ruta de FFmpeg
ffmpeg.setFfmpegPath(ffmpegPath)

// Rutas de entrada y salida de los archivos multimedia
const inputPath = './resources/input'
const outputPath = './resources/output'
const htmlOutputPath = './result.html'

// Configuración de imágenes
const imageConfig = {
  plugins: [
    imageminWebp({
      quality: 50 // Calidad de la imagen en formato WebP
    })
  ]
}

// Configuración de videos
const videoOptions = {
  videoCodec: 'libx264',
  audioCodec: 'aac',
  outputOptions: ['-preset', 'fast', '-crf', '22', '-b:a', '192k']
}

// Limitar el número máximo de procesos de optimización simultáneos
const maxConcurrentProcesses = 2 // Puedes ajustar este valor según tus necesidades

// Mantener un seguimiento de los procesos en ejecución
let runningProcesses = 0

// Función para obtener el tamaño de un archivo en bytes
function getFileSize (filePath) {
  const stats = fs.statSync(filePath)
  return stats.size
}

// Función para optimizar una sola imagen
async function optimizeImage (imagePath, relativePath, htmlStream) {
  try {
    // Obtener tamaño de la imagen original
    const originalSize = getFileSize(imagePath)

    const result = await imagemin([imagePath], {
      destination: path.join(outputPath, path.dirname(relativePath)),
      ...imageConfig
    })

    // Obtener la ruta de la imagen optimizada
    const optimizedImagePath = result[0].destinationPath

    // Obtener tamaño de la imagen optimizada
    const optimizedSize = getFileSize(optimizedImagePath)

    // Escribir información en el archivo HTML
    htmlStream.write(`<div class="image-info">`)
    htmlStream.write(
      `<p class="image-name">Imagen: ${path.basename(imagePath)}</p>`
    )
    htmlStream.write(
      `<p class="original-size">Tamaño original: ${originalSize} bytes</p>`
    )
    htmlStream.write(
      `<p class="optimized-size">Tamaño optimizado: ${optimizedSize} bytes</p>`
    )
    htmlStream.write('</div>')

    console.log(`Imagen optimizada: ${path.basename(imagePath)}`)
    console.log(`Tamaño original: ${originalSize} bytes`)
    console.log(`Tamaño optimizado: ${optimizedSize} bytes`)
  } catch (error) {
    console.error(
      `Error al optimizar la imagen ${path.basename(imagePath)}:`,
      error
    )
  }
}

// Función para optimizar un video
function optimizeVideo (videoPath, relativePath, htmlStream) {
  try {
    console.log(`Optimizando video: ${videoPath}`)

    const optimizedVideoPath = path.join(outputPath, relativePath)

    ffmpeg(videoPath)
      .videoCodec(videoOptions.videoCodec)
      .audioCodec(videoOptions.audioCodec)
      .outputOptions(videoOptions.outputOptions)
      .save(optimizedVideoPath)
      .on('end', () => {
        console.log(`Video optimizado: ${path.basename(optimizedVideoPath)}`)
        runningProcesses-- // Decrementar el contador de procesos en ejecución
      })
      .on('error', error => {
        console.error(
          `Error al optimizar el video ${path.basename(videoPath)}:`,
          error
        )
        runningProcesses-- // Decrementar el contador de procesos en ejecución en caso de error
      })

    runningProcesses++ // Incrementar el contador de procesos en ejecución
  } catch (error) {
    console.error(
      `Error al optimizar el video ${path.basename(videoPath)}:`,
      error
    )
    runningProcesses-- // Decrementar el contador de procesos en ejecución en caso de error
  }
}

// Función para procesar los archivos multimedia de forma recursiva
async function processMediaRecursively (
  directoryPath,
  relativePath,
  htmlStream
) {
  const files = fs.readdirSync(directoryPath)
  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      if (/\.(jpg|jpeg|png)$/i.test(filePath)) {
        await optimizeImage(
          filePath,
          path.join(relativePath, file),
          htmlStream
        )
      } else if (/\.(mp4|mov|avi)$/i.test(filePath)) {
        // Verificar si se ha alcanzado el límite de procesos simultáneos
        // while (runningProcesses >= maxConcurrentProcesses) {
        //  await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de verificar nuevamente
        // }
        // Optimizar el video
        // optimizeVideo(filePath, path.join(relativePath, file), htmlStream);
      }
    } else if (stats.isDirectory()) {
      await processMediaRecursively(
        filePath,
        path.join(relativePath, file),
        htmlStream
      )
    }
  }
}

// Función principal
async function main () {
  try {
    // Crear un archivo HTML
    const htmlStream = fs.createWriteStream(htmlOutputPath)
    htmlStream.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resultados de Optimización de Imágenes</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .image-info {
              border: 1px solid #ccc;
              padding: 10px;
              margin-bottom: 10px;
            }
            .image-name {
              font-weight: bold;
              margin-top: 0;
            }
            .original-size,
            .optimized-size {
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
    `)

    // Procesar archivos multimedia
    await processMediaRecursively(inputPath, '', htmlStream)

    // Cerrar etiquetas HTML
    htmlStream.write(
      '<script src="src/components/Navbar.js"></script></body></html>'
    )
    htmlStream.end()

    console.log('Archivo HTML generado con éxito.')
  } catch (error) {
    console.error('Error al generar el archivo HTML:', error)
  }
}

// Llamar a la función principal
main().catch(error => console.error('Error en la función principal:', error))
