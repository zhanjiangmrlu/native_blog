const {
	getList,
	getDetail,
	newBlog,
	updatedBlog,
	delBlog,
} = require('../controller/blog')
const { SucessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
	const { method, url, query, path } = req
	const { id = '' } = query || {}
	const API = '/api/blog'

	// 博客列表
	if (method === 'GET' && path === `${API}/list`) {
		const { author = '', keyword = '' } = query || {}
		const result = getList(author, keyword)

		return result.then(res => {
			return new SucessModel(res)
		})
	}

	// 博客详情
	if (method === 'GET' && path === `${API}/detail`) {
		const result = getDetail(id)

		return result.then(data => new SucessModel(data))
	}

	// 新增博客
	if (method === 'POST' && path === `${API}/new`) {
		const data = newBlog(req.body)

		return new SucessModel(data)
	}

	// 更新博客
	if (method === 'POST' && path === `${API}/updated`) {
		const result = updatedBlog(req.body)

		if (result && id) {
			return new SucessModel(result)
		} else {
			return new ErrorModel('更新博客失败')
		}
	}

	// 删除博客
	if (method === 'POST' && path === `${API}/del`) {
		const result = delBlog(req.body)

		if (result && id) {
			return new SucessModel(result)
		} else {
			return new ErrorModel('删除博客失败')
		}
	}
}

module.exports = handleBlogRouter
