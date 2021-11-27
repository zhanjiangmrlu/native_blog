const { exec } = require('../db/mysql')

// 列表
const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `

	if (author) {
		sql += `and author='${author}' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += `order by createtime desc;`

	return exec(sql)
}

// 详情
const getDetail = (id) => {
	return {
		id: 1,
		title: '标题1',
		content: '内容1',
		createTime: 1637477628420,
		author: '靓妹',
	}
}

// 新增
const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

// 更新
const updatedBlog = (id, blogData) => {
  // id 就是要更新博客的 ID
  // blogData 是一个博客对象，包含 title content 属性

  return true
}

// 删除
const delBlog = (id) => {
  return true
}

module.exports = {
	getList,
	getDetail,
  newBlog,
  updatedBlog,
  delBlog
}
