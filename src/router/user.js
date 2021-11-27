const { loginCheck } = require('../controller/user')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'POST' && path === '/api/blog/login') {
    const { username, password } = req.body
    const result = loginCheck(username, password)

    return result.then(data => {
      if (data.username) {
        return new SucessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter