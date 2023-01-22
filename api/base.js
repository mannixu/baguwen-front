import request from '../utils/request';

/**
 * 默认搜索内容
 */
export function getTopicList(data) {
  return request({
    url: '/topic/order',
	data
  });
}


