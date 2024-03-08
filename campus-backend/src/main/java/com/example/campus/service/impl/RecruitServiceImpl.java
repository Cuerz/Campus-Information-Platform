package com.example.campus.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Recruit;
import com.example.campus.mapper.RecruitMapper;
import com.example.campus.mapper.SysUserMapper;
import com.example.campus.service.RecruitService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruitServiceImpl implements RecruitService {

    @Resource
    private RecruitMapper recruitMapper;

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String jobName, Boolean examine) {
        if (pageNum == null || pageSize == null) {
            List<Recruit> recruitList = recruitMapper.queryAll(jobName, examine);
            return SaResult.data(recruitList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<Recruit> recruit = recruitMapper.queryAll(jobName, examine);
            PageInfo<Recruit> info = new PageInfo<>(recruit);
            return SaResult.data(info);
        }
    }

    @Override
    public SaResult insert(Recruit recruit) {
        if (recruit.getJobName() == null || recruit.getJobDescription() == null || recruit.getContactNumber() == null) {
            return SaResult.error("相关信息不能为空");
        }
        recruit.setExamine(false);
        Integer userId = sysUserMapper.queryByName(StpUtil.getLoginId().toString()).getId();
        recruit.setUserId(userId);
        recruitMapper.insert(recruit);
        return SaResult.data(recruitMapper.queryById(recruit.getRecruitId()));
    }

    @Override
    public SaResult delete(Integer recruitId) {
        recruitMapper.deleteById(recruitId);
        return SaResult.ok();
    }

    @Override
    public SaResult updateExamine(Integer recruitId, Boolean examine) {
        recruitMapper.updateExamine(recruitId, examine);
        return SaResult.ok();
    }
}
