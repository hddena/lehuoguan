import qs from 'qs'
export default {

    detail(self, id ) { // （带参数测试）
    // let dataStr = qs.stringify( {newsID:id});
    let post = ()=>{
        return new Promise(resolve => {
            self.$dataApi({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'post',
                // url: '/api/news/getdetail',
                url: 'api/news/getdetail?newsID='+id,
                data: {
                    newsID:id
                }
            }).then(response => {
                resolve(response.data);
            })
        });
    }
    let result = post();
    return result;
  },

  testData(self, classID ) { // 资讯列表（分类）
    let post = ()=>{
        return new Promise(resolve => {
            self.$dataApi({
                headers: {'Content-Type': 'multipart/form-data'},
                method: 'post',
                url: '/api/product/getclassList',
                //url: '/mobile/index.php?m=console&c=view&a=view',
                params: {
                    CID:classID
                }
            }).then(response => {
                resolve(response.data);
            })
        });
    }
    let result = post();
    return result;
  },

}
