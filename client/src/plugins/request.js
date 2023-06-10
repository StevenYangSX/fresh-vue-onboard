// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import axios from "axios";
// 创建一个 axios 实例
const service = axios.create({
  baseURL: "http://localhost:8088/api/",
  timeout: 300000, // 请求超时时间
});

// 请求拦截器
// service.interceptors.request.use(
//   async (config) => {
//     if (config.kefu) {
//       let baseUrl = Setting.apiBaseURL.replace(/adminapi/, "kefuapi");
//       config.baseURL = baseUrl;
//     } else {
//       config.baseURL = Setting.apiBaseURL;
//     }
//     if (config.url === "delivery/route" || config.url === "delivery/admin/task/history") {
//       config.baseURL = Setting.apiStagingURL;
//     }
//     if (config.option_server === "freshfresh") {
//       config.baseURL = Setting.apiStagingURL;
//     }
//     // if(config.url.indexOf('unique-prefix')!==-1){
//     //     config.url = config.url.split('unique-prefix')[1];
//     //     config.baseURL = Setting.apiStagingURL;
//     // }else{
//     //     console.log('false')
//     // }
//     const token = util.cookies.get("token");
//     const kefuToken = util.cookies.kefuGet("token");

//     if (token || kefuToken) {
//       config.headers["Authori-zation"] = config.kefu ? "Bearer " + kefuToken : "Bearer " + token;
//     }
//     if (config.url.indexOf("delivery/route") !== -1 || config.url.indexOf("task/history") !== -1) {
//       delete config.headers["Authori-zation"];
//       config.headers["adminToken"] = "cxwBI1cdN!Duvjp51ey6RvTi+ZCaXvd6";
//     }

//     // 开启loading
//     showFullScreenLoading();
//     return config;
//   },
//   (error) => {
//     // 发送失败
//     Promise.reject(error);
//   }
// );
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 获取返回码
    const code = response.status;

    switch (code) {
      case 200:
        return response.data;
      case 400:
      case 400011:
      case 400012:
      case 100214:
        return Promise.reject(response.data || { msg: "未知错误" });
      // [ 示例 ] 其它和后台约定的 code
      // errorCreate(response.data.msg);
      // break;
      case 410000:
      case 410001:
      case 410002:
        window.router.replace("/admin1520/login");
        break;
      case 410003:
        window.router.replace("/kefu");
        break;
      default:
        // 不是正确的 code
        // errorCreate(`${dataAxios.msg}: ${response.config.url}`);
        return Promise.reject(response.data || { msg: "未知错误" });
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    //errorLog(error);
    return Promise.reject(error.response.data);
  }
);

export default service;
