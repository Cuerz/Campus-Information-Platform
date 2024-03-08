import request from '@/utils/request';

// 查询失物列表
export function listRecruit(query) {
  return request({
    url: '/admin/recruit/list',
    method: 'get',
    params: query,
  });
}

// 删除记录
export function delRecruit(recruitId) {
    return request({
      url: '/admin/recruit/delete/' + recruitId,
      method: 'delete',
    });
  }


  // 审核失物
export function changeRecruitExamine(recruitId, examine) {
  const data = {
    recruitId,
    examine,
  };
  return request({
    url: '/admin/recruit/updateExamine',
    method: 'post',
    data: data,
  });
}

// 新增记录
export function addRecruit(data) {
  return request({
    url: '/admin/recruit/add',
    method: 'post',
    data: data,
  });
}