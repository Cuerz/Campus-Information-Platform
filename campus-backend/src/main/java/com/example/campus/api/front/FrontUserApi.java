package com.example.campus.api.front;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysUser;
import com.example.campus.service.SysUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
@Slf4j
@Tag(name = "前台/用户类接口")
public class FrontUserApi {

    @Resource
    private SysUserService sysUserService;

    @PostMapping("/updatePassword")
    @SaCheckLogin
    @Operation(summary = "修改密码")
    public SaResult updatePassword(@RequestBody Map<String, Object> map) {
        if (!map.containsKey("oldPassword") || !map.containsKey("newPassword") || !map.containsKey("confirmPassword")) {
            return SaResult.error("旧密码、新密码或确认密码不能为空");
        }
        String oldPassword = map.get("oldPassword").toString();
        String newPassword = map.get("newPassword").toString();
        String confirmPassword = map.get("confirmPassword").toString();
        if ("".equals(oldPassword) || "".equals(newPassword) || "".equals(confirmPassword)) {
            return SaResult.error("旧密码、新密码或确认密码不能为空");
        }
        return sysUserService.updatePassword(oldPassword,newPassword,confirmPassword);
    }

    @PostMapping("/update")
    @SaCheckLogin
    @Operation(summary = "更新用户信息")
    public SaResult updateBasciInfo(@RequestBody SysUser sysUser) {
        sysUser.setSysRole(null);
        return sysUserService.updateBasicInfo(sysUser);
    }
}

