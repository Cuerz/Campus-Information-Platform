import request from "@/utils/request"

// 查询公告列表
export function listAnnouncement(query) {
	return request({
		url: "/admin/announcement/list",
		method: "get",
		params: query,
	})
}

// 删除记录
export function delAnnouncement(announcementId) {
	return request({
		url: "/admin/announcement/delete/" + announcementId,
		method: "delete",
	})
}

// 新增记录
export function addAnnouncement(data) {
	return request({
		url: "/admin/announcement/add",
		method: "post",
		data: data,
	})
}
