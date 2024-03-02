import request from '@/utils/request';

// 查询失物列表
export function listLostItems(query) {
  return request({
    url: '/admin/lost/list',
    method: 'get',
    params: query,
  });
}

// 删除记录
export function delItems(lostId) {
    return request({
      url: '/admin/lost/delete/' + lostId,
      method: 'delete',
    });
  }


  // 审核失物
export function changeLostExamine(lostId, examine) {
  const data = {
    lostId,
    examine,
  };
  return request({
    url: '/admin/lost/updateExamine',
    method: 'post',
    data: data,
  });
}

// 新增记录
export function addItem(data) {
  return request({
    url: '/admin/lost/add',
    method: 'post',
    data: data,
  });
}