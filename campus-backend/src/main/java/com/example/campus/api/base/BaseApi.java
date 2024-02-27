package com.example.campus.api.base;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysRole;
import com.example.campus.domain.SysUser;
import com.example.campus.service.BaseService;
import com.example.campus.service.SysUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Tag(name = "基本接口")
@RequestMapping("/api")
public class BaseApi {

    @Resource
    private BaseService baseService;

    @Resource
    private SysUserService sysUserService;

    @PostMapping("/login")
    @Operation(summary = "前台登录")
    public SaResult login(@RequestBody SysUser sysUser) {
        return baseService.authCheck(sysUser.getUserName(), sysUser.getPassword());
    }

    @PostMapping("/admin/login")
    @Operation(summary = "后台登录")
    public SaResult adminLogin(@RequestBody SysUser sysUser) {
        return baseService.authCheck(sysUser.getUserName(), sysUser.getPassword());
    }

    @GetMapping("/logout")
    @Operation(summary = "注销")
    @SaCheckLogin
    public SaResult logout() {
        StpUtil.logout();
        return SaResult.ok();
    }

    @PostMapping("/register")
    @Operation(summary = "注册")
    public SaResult register(@RequestBody SysUser sysUser) {
        SysRole myRole = new SysRole();
        myRole.setRoleId(3);
        sysUser.setSysRole(myRole);
        return sysUserService.insert(sysUser);
    }

    @GetMapping("/loginInfo")
    @Operation(summary = "获取登录信息")
    @SaCheckLogin
    public SaResult loginInfo() {
        return baseService.getInfo();
    }

}
