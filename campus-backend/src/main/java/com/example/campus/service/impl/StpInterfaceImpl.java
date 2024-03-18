package com.example.campus.service.impl;

import cn.dev33.satoken.stp.StpInterface;
import com.example.campus.domain.SysUser;
import com.example.campus.mapper.SysUserMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class StpInterfaceImpl implements StpInterface {

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public List<String> getPermissionList(Object o, String s) {
        return null;
    }


    /**
     * 返回一个账号所拥有的角色标识集合 (权限与角色可分开校验)
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        SysUser sysUser = sysUserMapper.queryByName(loginId.toString());
        List<String> roleList = new ArrayList<>();
        roleList.add(sysUser.getSysRole().getRoleName());
        return roleList;
    }
}
