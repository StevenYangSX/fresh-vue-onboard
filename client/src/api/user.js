import request from "@/plugins/request";

/**
 * @description 用户管理--列表
 * @param {Object} param data {Object} 传值参数
 */
export function userRegisterApi(data) {
  return request({
    url: "/users",
    method: "post",
    data,
  });
}

// TODO
// 用户登录接口

// 增加一个商品 至 当前登录用户的购物车 by id

// 删除一个商品 从 当前登录用户的购物车 by id
