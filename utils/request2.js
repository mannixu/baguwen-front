
import store from '../store';
const BASE_URL = 'http://menglong.love:8080/baguwen';
function request({url, data, method}){
	return new Promise((resolve, reject)=>{
		
		uni.request({
			url:BASE_URL+url,
			data,
			method,
			header: {
					Authorization: '7_https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
			},
			success({ data }) {
				if(data.success){
					
					resolve(data);
				}else{
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration:3000
					})
					
					 reject(data.message);
				}
			},
			fail({error}) {
				rejects(error)
			},
			complete: () => {
				// 关闭加载
				uni.hideLoading();
			}
		});
	});
}
export default request;