import request from "@/utils/request";

// 查询列表
export function listActivities() {
  return request({
    url: "/activity/list",
    method: "get",
  });
}

// 新增记录
export function addActivity(data) {
  return request({
    url: "/activity/add",
    method: "post",
    data: data,
  });
}
