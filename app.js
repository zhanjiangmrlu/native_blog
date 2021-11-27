const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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

	// 处理 post data
	getPostData(req).then(postData => {
		req.body = postData

		// 处理 blog 路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			return blogResult.then(blogData => res.end(JSON.stringify(blogData)))
		}

		// 处理 user 路由
		const userResult  = handleUserRouter(req, res)
		if (userResult) {
			return userResult.then(userData => res.end(JSON.stringify(userData)))
		}

		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.write('404 Not Found\n')
		res.end()
	})
}

module.exports = handleServer
