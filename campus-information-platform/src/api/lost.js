import request from "@/utils/request";

// 查询失物列表
export function listLostItems() {
  return request({
    url: "/lost/list",
    method: "get",
  });
}

// 新增记录
export function addItem(data) {
  return request({
    url: "/lost/add",
    method: "post",
    data: data,
  });
}
