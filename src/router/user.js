const { loginCheck } = require('../controller/user')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'POST' && path === '/api/blog/login') {
    const { username, password } = req.body
    const reult = loginCheck(username, password)

    if (reult) {
      return new SucessModel()
    } else {
      return new ErrorModel()
    }
  }
}

module.exports = handleUserRouter