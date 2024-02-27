package com.example.campus.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysRole;
import com.example.campus.domain.SysUser;
import com.example.campus.mapper.SysRoleMapper;
import com.example.campus.service.SysRoleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysRoleServiceImpl implements SysRoleService {

    @Resource
    private SysRoleMapper sysRoleMapper;

    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String roleName, String description) {
        if (pageNum == null || pageSize == null) {
            List<SysRole> sysRoleList = sysRoleMapper.queryAll(roleName, description);
            return SaResult.data(sysRoleList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<SysRole> roles = sysRoleMapper.queryAll(roleName, description);
            PageInfo<SysRole> info = new PageInfo<>(roles);
            return SaResult.data(info);
        }
    }
}
