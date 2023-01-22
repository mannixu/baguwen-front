const BASE_URL = 'http://43.139.60.104:8080/baguwen';
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
	  
      success: ({ data }) => {
        if (data.code==1) {
          resolve(data);
        } else {
          uni.showToast({
            title: data.msg,
            icon: 'none',
            mask: true,
            duration: 3000
          });
          reject(data.msg);
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

export default request;  //加上default就可以不加{}import request from '../utils/request';  正常是import {request} from '../utils/request';
