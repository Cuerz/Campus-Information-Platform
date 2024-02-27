package com.example.campus.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.SaLoginConfig;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysUser;
import com.example.campus.mapper.SysUserMapper;
import com.example.campus.service.BaseService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BaseServiceImpl implements BaseService {

    @Resource
    private SysUserMapper sysUserMapper;


    @Override
    public SaResult authCheck(String userName, String password) {
        SysUser sysUser = sysUserMapper.queryByName(userName);
        if (sysUser == null) {
            return SaResult.error("用户不存在");
        }
        if (!sysUser.getEnable()) {
            return SaResult.error("用户被冻结");
        }
        if (!sysUser.getPassword().equals(SaSecureUtil.sha256(password))) {
            return SaResult.error("密码不正确");
        }
        StpUtil.login(userName);
        return SaResult.data(StpUtil.getTokenInfo());
    }

    @Override
    public SaResult getInfo() {
        SysUser sysUser = sysUserMapper.queryByName(StpUtil.getLoginId().toString());
        return SaResult.data(sysUser);
    }
}
