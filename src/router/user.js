const { login } = require('../controller/user')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'GET' && path === '/api/blog/login') {
    const { username, password } = req.query
    // const { username, password } = req.body
    const result = login(username, password)

    return result.then(data => {
      if (data.username) {
        // 操作 cookie
        res.setHeader('Set-Cookie', `username=${data.username}; path=/`)
        return new SucessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  if (method === 'GET' && path === '/api/blog/login-test') {
    console.log('req', req.cookie);
    if (req?.cookie?.username) {
      return Promise.resolve(
        new SucessModel({
          session: req.session
        })
      )
    }

    return Promise.resolve(new ErrorModel('登录失败'))
  }
}

module.exports = handleUserRouter