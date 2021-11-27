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
}

// 更新
const updatedBlog = (id, blogData) => {
	// id 就是要更新博客的 ID
	// blogData 是一个博客对象，包含 title content 属性
	const { title, content } = blogData
	const sql = `
		update blogs set title='${title}', content='${content}' where id=${id}
	`

	return exec(sql).then(updateData => {
		if (updateData.affectedRows > 0) {
			return true
		}
		return false
	})
}

// 删除
const delBlog = (id, blogData) => {
	const author = blogData.author
	const sql = `delete from blogs where id='${id}' and author='${author}';`

	return exec(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true
		}
		return false
	})
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updatedBlog,
	delBlog,
}
