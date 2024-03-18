import request from "@/utils/request";

// 查询公告列表
export function listAnnouncement() {
  return request({
    url: "/announcement/list",
    method: "get",
  });
}
