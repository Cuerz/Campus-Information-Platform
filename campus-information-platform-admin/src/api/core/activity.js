import request from '@/utils/request';

// 查询活动列表
export function listActivity(query) {
  return request({
    url: '/admin/activity/list',
    method: 'get',
    params: query,
  });
}

// 删除记录
export function delActivity(activityId) {
  return request({
    url: '/admin/activity/delete/' + activityId,
    method: 'delete',
  });
}

// 审核
export function changeActivityExamine(activityId, examine) {
  const data = {
    activityId,
    examine,
  };
  return request({
    url: '/admin/activity/updateExamine',
    method: 'post',
    data: data,
  });
}

// 新增记录
export function addActivity(data) {
  return request({
    url: '/admin/activity/add',
    method: 'post',
    data: data,
  });
}
