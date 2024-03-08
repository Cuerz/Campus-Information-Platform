package com.example.campus.api.back;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysUser;
import com.example.campus.service.SysUserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/user")
@Slf4j
@Tag(name = "后台/用户管理")
public class SysUserApi {

    @Resource
    private SysUserService sysUserService;

    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有用户")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "userName", required = false) String userName,
                             @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
                             @RequestParam(value = "enable", required = false) Boolean enable) {
        return sysUserService.queryAll(pageNum, pageSize, userName, phoneNumber, enable);
    }

    @SaCheckLogin
    @GetMapping("/getUser")
    @Operation(summary = "查看用户信息")
    public SaResult queryById(
            @RequestParam(value = "id", required = true) Integer id) {
        return sysUserService.queryById(id);
    }

    @SaCheckLogin
    @PostMapping("/add")
    @Operation(summary = "新增用戶")
    public SaResult addUser(@RequestBody SysUser sysUser) {
        return sysUserService.insert(sysUser);
    }


    @SaCheckLogin
    @DeleteMapping("/delete/{id}")
    @Operation(summary = "删除用户")
    public SaResult deleteUSer(@PathVariable("id") Integer id) {
        return sysUserService.delete(id);
    }


    @SaCheckLogin
    @PostMapping("/updateEnable")
    @Operation(summary = "修改用户启用")
    public SaResult updateEnable(@RequestBody SysUser sysUser) {
        Integer id = sysUser.getId();
        Boolean enable = sysUser.getEnable();
        return sysUserService.updateEnable(id, enable);
    }

    @PostMapping("/resetPassword")
    @SaCheckLogin
    @Operation(summary = "重置密码")
    public SaResult resetPassword(@RequestBody SysUser sysUser) {
        Integer id = sysUser.getId();
        return sysUserService.resetPassword(id);
    }

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
        return sysUserService.updateBasicInfo(sysUser);
    }
}
