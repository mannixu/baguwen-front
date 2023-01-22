import request from '../utils/request2';

/**
 * 获取文章详情
 */
export function getArticleDetail(data) {
  return request({
    url: '/blog/getBlogDetail',
    data
  });
}

/**
 * 获取文章评论列表
 */
export function getArticleCommentList(data) {
  return request({
    url: '/blog/getCommentListByBlog',
    data
  });
}
