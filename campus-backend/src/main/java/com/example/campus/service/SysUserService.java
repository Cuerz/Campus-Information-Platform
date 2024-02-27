package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SysUserService {

    SaResult queryAll(Integer pageNum, Integer pageSize,String userName,String phoneNumber,Boolean enable);

    SaResult queryById(Integer id);


    SaResult insert(SysUser sysUser);

    SaResult delete(Integer id);

    SaResult updatePassword(String oldPassword, String newPassword, String confirmPassword);

    SaResult resetPassword(Integer id);

    SaResult updateEnable(Integer id, Boolean enable);

    SaResult updateBasicInfo(SysUser sysUser);
}
