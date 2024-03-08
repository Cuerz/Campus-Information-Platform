import request from "@/utils/request";

// 查询失物列表
export function listRecruits() {
  return request({
    url: "/recruit/list",
    method: "get",
  });
}

// 新增记录
export function addRecruit(data) {
  return request({
    url: "/recruit/add",
    method: "post",
    data: data,
  });
}
