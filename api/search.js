import request from '../utils/request2';

/**
 * 热搜搜索列表
 */
export function getSearchHotList() {
  return request({
    url: '/blog/getHotBlogList'
  });
} 	

/**
 * 搜索结果
 */
export function getSearchResult(data) {
  return request({
    url: '/blog/getBlogListByLike',
    data
  });
}