package com.example.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Activity;
import com.example.campus.mapper.ActivityMapper;
import com.example.campus.mapper.SysUserMapper;
import com.example.campus.service.ActivityService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Resource
    private ActivityMapper activityMapper;

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String activityTitle, String activityLabel, Boolean examine) {
        if (pageNum == null || pageSize == null) {
            List<Activity> activityList = activityMapper.queryAll(activityTitle, activityLabel, examine);
            return SaResult.data(activityList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<Activity> activities = activityMapper.queryAll(activityTitle, activityLabel, examine);
            PageInfo<Activity> info = new PageInfo<>(activities);
            return SaResult.data(info);
        }
    }

    @Override
    public SaResult insert(Activity activity) {
        if (activity.getActivityTitle() == null || activity.getActivityLabel() == null || activity.getActivityLocale() == null || activity.getActivityDescription() == null) {
            return SaResult.error("相关信息不能为空");
        }
        activity.setExamine(false);
        Integer userId = sysUserMapper.queryByName(StpUtil.getLoginId().toString()).getId();
        activity.setUserId(userId);
        activityMapper.insert(activity);
        return SaResult.data(activityMapper.queryById(activity.getActivityId()));
    }

    @Override
    public SaResult delete(Integer activityId) {
        activityMapper.deleteById(activityId);
        return SaResult.ok();
    }

    @Override
    public SaResult updateExamine(Integer activityId, Boolean examine) {
        activityMapper.updateExamine(activityId, examine);
        return SaResult.ok();
    }
}
