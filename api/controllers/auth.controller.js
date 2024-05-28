function registerUser (req, res, next) {
  try {
    const username = req.body.username
    const password = req.body.password
    // TODO: mirar username no existe y añadir usuario a users.json
    res.status(200).json({
      token: ''
    })
  } catch (error) {
    next(error)
  }
}

function loginUser (req, res, next) {
  try {
    const username = req.body.username
    const password = req.body.password
    // TODO: mirar username no existe y añadir usuario a users.json
    res.status(200).json({
      token: ''
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser }
