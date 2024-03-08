import request from "@/utils/request";

// 查询列表
export function listOldStuff() {
  return request({
    url: "/old/list",
    method: "get",
  });
}

// 新增记录
export function addStuff(data) {
  return request({
    url: "/old/add",
    method: "post",
    data: data,
  });
}
