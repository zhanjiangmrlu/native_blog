// 环境参数
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

// 测试
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
  }
}

// 生产
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}