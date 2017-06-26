/**
 * Created by pis on 2017/6/8.
 */
export const FetchUrl = {
    loginUrl: 'http://devapi.jiaj.com.cn:8080/jiajian-service/api/v1.1/offline/contact/user/signin'
}

export const PostHeader = {
    header: {
        method: 'POST',
        headers: {
            //我向服务器端接受的数据类型（json）
            'Accept': 'application/json',
            //我给服务器端的数据类型（json）
            'Content-Type': 'application/json'
        }
    }
};