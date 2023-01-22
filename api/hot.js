import request from '../utils/request2';
export function  getHotTabs(){
	return request({
		 url: '/course/getCourseList'
	});
}

export function getHotListFromTabType(type) {
  return request({
    url: '/blog/getBlogList',
    data: {
      type
    }
  });
}