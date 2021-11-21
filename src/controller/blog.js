// 列表
const getList = () => {
	return [
		{
			id: 1,
			title: '标题1',
			content: '内容1',
			createTime: 1637477628420,
			author: '靓妹',
		},
		{
			id: 2,
			title: '标题2',
			content: '内容2',
			createTime: 1637477660699,
			author: '靓仔',
		},
	]
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
