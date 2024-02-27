package com.example.campus.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysUser;
import com.example.campus.mapper.SysUserMapper;
import com.example.campus.service.SysUserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysUserServiceImpl implements SysUserService {

    private static final String PASSWD = "Nuist123456";
    @Resource
    private SysUserMapper sysUserMapper;


    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String userName, String phoneNumber, Boolean enable) {
        if (pageNum == null || pageSize == null) {
            List<SysUser> sysUserList = sysUserMapper.queryAll(userName, phoneNumber, enable);
            return SaResult.data(sysUserList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<SysUser> users = sysUserMapper.queryAll(userName, phoneNumber, enable);
            PageInfo<SysUser> info = new PageInfo<>(users);
            return SaResult.data(info);
        }
    }

    @Override
    public SaResult queryById(Integer id) {
        return SaResult.data(sysUserMapper.queryById(id));
    }

    @Override
    public SaResult insert(SysUser sysUser) {
        if (sysUser.getUserName() == null || sysUser.getPassword() == null || sysUser.getNickName() == null) {
            return SaResult.error("用户名、密码或昵称不可为空");
        }
        SysUser myUser = sysUserMapper.queryByName(sysUser.getUserName());
        if (myUser != null) {
            return SaResult.error("用户名已存在");
        }
        if (sysUser.getPhoneNumber() != null && !"".equals(sysUser.getPhoneNumber())) {
            myUser.setPhoneNumber(sysUser.getPhoneNumber());
        }
        myUser = new SysUser();
        myUser.setSysRole(sysUser.getSysRole());
        myUser.setUserName(sysUser.getUserName());
        myUser.setPassword(SaSecureUtil.sha256(sysUser.getPassword()));
        myUser.setNickName(sysUser.getNickName());
        sysUserMapper.insert(myUser);
        return SaResult.data(sysUserMapper.queryById(myUser.getId()));
    }

    @Override
    public SaResult delete(Integer id) {
        sysUserMapper.deleteById(id);
        return SaResult.ok();
    }

    @Override
    public SaResult updatePassword(String oldPassword, String newPassword, String confirmPassword) {
        SysUser sysUser = sysUserMapper.queryByName(StpUtil.getLoginId().toString());
        if (!newPassword.equals(confirmPassword)) {
            return SaResult.error("两次输入密码不一致");
        }
        if (oldPassword.equals(newPassword)) {
            return SaResult.error("新密码与原密码一样");
        }
        if (!SaSecureUtil.sha256(oldPassword).equals(sysUser.getPassword())) {
            return SaResult.error("原密码不正确");
        }
        sysUserMapper.updatePassword(sysUser.getId(), SaSecureUtil.sha256(newPassword));
        return SaResult.ok();
    }

    @Override
    public SaResult resetPassword(Integer id) {
        sysUserMapper.updatePassword(id, SaSecureUtil.sha256(PASSWD));
        return SaResult.ok();
    }

    @Override
    public SaResult updateEnable(Integer id, Boolean enable) {
        sysUserMapper.updateEnable(id, enable);
        return SaResult.ok();
    }

    @Override
    public SaResult updateBasicInfo(SysUser sysUser) {
        if (sysUser.getNickName() == null) {
            return SaResult.error("用户昵称不能为空");
        }
        // 取出用户
        SysUser myUser = sysUserMapper.queryById(sysUser.getId());
        if (myUser == null) {
            return SaResult.error("用户不存在");
        }
        // 判断有无更换角色
        if (sysUser.getSysRole() == null) {
            sysUser.setSysRole(myUser.getSysRole());
        }
        sysUserMapper.updateBasicInfo(sysUser);
        return SaResult.ok();
    }

}
