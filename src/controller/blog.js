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
const getDetail = id => {
	const sql = `select * from blogs where id='${id}'`

	return exec(sql).then(rows => rows[0])
}

// 新增
const newBlog = (blogData = {}) => {
	const { title, content, author = '张三' } = blogData
	const createTime = Date.now()

	const sql = `
		insert into blogs (title, content, createTime, author)
		values ('${title}', '${content}', ${createTime}, '${author}')
	`

	return exec(sql).then(insertData => {
		return {
			id: insertData.insertID 
		}
	})

	// return {
	// 	id: 3,
	// }
}

// 更新
const updatedBlog = (id, blogData) => {
	// id 就是要更新博客的 ID
	// blogData 是一个博客对象，包含 title content 属性

	return true
}

// 删除
const delBlog = id => {
	return true
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updatedBlog,
	delBlog,
}
