import request from '@/utils/request';

// 查询二手列表
export function listOldStuff(query) {
  return request({
    url: '/admin/old/list',
    method: 'get',
    params: query,
  });
}

// 删除记录
export function delStuff(oldStuffId) {
    return request({
      url: '/admin/old/delete/' + oldStuffId,
      method: 'delete',
    });
  }


  // 审核
export function changeOldExamine(oldStuffId, examine) {
  const data = {
    oldStuffId,
    examine,
  };
  return request({
    url: '/admin/old/updateExamine',
    method: 'post',
    data: data,
  });
}

// 新增记录
export function addStuff(data) {
  return request({
    url: '/admin/old/add',
    method: 'post',
    data: data,
  });
}