package com.example.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.LostItems;
import com.example.campus.mapper.LostItemsMapper;
import com.example.campus.mapper.SysUserMapper;
import com.example.campus.service.LostItemsService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LostItemsServiceImpl implements LostItemsService {

    @Resource
    private LostItemsMapper lostItemsMapper;

    @Resource
    private SysUserMapper sysUserMapper;


    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String itemName, Boolean examine) {
        if (pageNum == null || pageSize == null) {
            List<LostItems> lostItemsList = lostItemsMapper.queryAll(itemName, examine);
            return SaResult.data(lostItemsList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<LostItems> items = lostItemsMapper.queryAll(itemName, examine);
            PageInfo<LostItems> info = new PageInfo<>(items);
            return SaResult.data(info);
        }
    }

    @Override
    public SaResult insert(LostItems lostItems) {
        if (lostItems.getItemName() == null || lostItems.getItemPic() == null || lostItems.getDescription() == null || lostItems.getContactNumber() == null) {
            return SaResult.error("相关信息不能为空");
        }
        lostItems.setExamine(false);
        Integer userId = sysUserMapper.queryByName(StpUtil.getLoginId().toString()).getId();
        lostItems.setUserId(userId);
        lostItemsMapper.insert(lostItems);
        return SaResult.data(lostItemsMapper.queryById(lostItems.getLostId()));
    }

    @Override
    public SaResult delete(Integer lostId) {
        lostItemsMapper.deleteById(lostId);
        return SaResult.ok();
    }

    @Override
    public SaResult updateExamine(Integer lostId, Boolean examine) {
        lostItemsMapper.updateExamine(lostId, examine);
        return SaResult.ok();
    }
}
