const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// session 数据
const SESSION_DATA = {}

// 获取 cookie 的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	// console.log('cookie的过期时间:', d.toGMTString())
	return d.toGMTString()
}

// 处理 post data
const getPostData = req => {
	const promise = new Promise((resolve, reject) => {
		if (
			req.method !== 'POST' ||
			req.headers['content-type'] !== 'application/json'
		) {
			return resolve({})
		}

		let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if (!postData) {
				return resolve({})
			}

			resolve(JSON.parse(postData))
		})
	})

	return promise
}

const handleServer = (req, res) => {
	// 设置返回格式 JSON
	res.setHeader('Content-type', 'application/json')

	// 获取 path
	const url = req.url
	req.path = url.split('?')[0]

	// 解析 query
	req.query = querystring.parse(url.split('?')[1])

	// 解析 cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3
	// console.log('cookieStr',cookieStr);
	cookieStr.split(';').forEach(item => {
		if (!item) return
		const arr = item.split('=')
		const key = arr[0].trim()
		const val = arr[1].trim()
		req.cookie[key] = val
		// console.log('req.cookie', req.cookie);
	})

	// 解析 session （使用Redis）
	let needSetCookie = false
	let userId = req.cookie.userId
	if (userId) {
		if (!SESSION_DATA[userId]) {
			SESSION_DATA[userId] = {}
		}
	} else {
		userId = `${Date.now}_${Math.random()}`
		SESSION_DATA[userId] = {}
	}
	req.session = SESSION_DATA[userId]
	// if (!userId) {
	// 	needSetCookie = true
	// 	userId = `${Date.now}_${Math.random()}`
	// }

	// // 获取 session
	// req.sessionId = userId

	// console.log('req.session', req.session);

	// 处理 post data
	getPostData(req).then(postData => {
		req.body = postData

		// 处理 blog 路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			return blogResult.then(blogData => {
				if (needSetCookie) {
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				}

				res.end(JSON.stringify(blogData))
			})
		}

		// 处理 user 路由
		const userResult  = handleUserRouter(req, res)
		if (userResult) {
			return userResult.then(userData => {
				// if (needSetCookie) {
				// 	console.log('needSetCookie', needSetCookie);
				console.log('userId', userId);
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				// }
				res.end(JSON.stringify(userData))
			})
		}

		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.write('404 Not Found\n')
		res.end()
	})
}

module.exports = handleServer
