import request from '../utils/request2';

/**
 * 用户登录
 */
export function login(data) {
  return request({
    url: '/blog/getLoginToken',
    method: 'POST',
    data
  });
}

/**
 * 关注用户
 */
export function userFollow(data) {
  return request({
    url: '/blog/concernUser',
    data
  });
}

/**
 * 发表评论
 */
export function userArticleComment(data) {
  return request({
    url: '/blog/articlecomment',
    method: 'POST',
    data
  });
}
