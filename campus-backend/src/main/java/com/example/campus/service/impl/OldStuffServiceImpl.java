package com.example.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.OldStuff;
import com.example.campus.mapper.OldStuffMapper;
import com.example.campus.mapper.SysUserMapper;
import com.example.campus.service.OldStuffService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OldStuffServiceImpl implements OldStuffService {

    @Resource
    private OldStuffMapper oldStuffMapper;

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String oldStuffName, Boolean examine) {
        if (pageNum == null || pageSize == null) {
            List<OldStuff> oldStuffList = oldStuffMapper.queryAll(oldStuffName, examine);
            return SaResult.data(oldStuffList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<OldStuff> oldStuffs = oldStuffMapper.queryAll(oldStuffName, examine);
            PageInfo<OldStuff> info = new PageInfo<>(oldStuffs);
            return SaResult.data(info);
        }
    }

    @Override
    public SaResult insert(OldStuff oldStuff) {
        if (oldStuff.getOldStuffName() == null || oldStuff.getOldStuffPic() == null || oldStuff.getDescription() == null || oldStuff.getContactNumber() == null) {
            return SaResult.error("相关信息不能为空");
        }
        oldStuff.setExamine(false);
        Integer userId = sysUserMapper.queryByName(StpUtil.getLoginId().toString()).getId();
        oldStuff.setUserId(userId);
        oldStuffMapper.insert(oldStuff);
        return SaResult.data(oldStuffMapper.queryById(oldStuff.getOldStuffId()));
    }

    @Override
    public SaResult delete(Integer oldStuffId) {
        oldStuffMapper.deleteById(oldStuffId);
        return SaResult.ok();
    }

    @Override
    public SaResult updateExamine(Integer oldStuffId, Boolean examine) {
        oldStuffMapper.updateExamine(oldStuffId, examine);
        return SaResult.ok();
    }
}
