package com.example.campus.api.base;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.SysRole;
import com.example.campus.domain.SysUser;
import com.example.campus.service.BaseService;
import com.example.campus.service.SysUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Objects;
import java.util.UUID;

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
        if ("admin".equals(sysUser.getUserName()))
            return SaResult.error("无权限");
        else
            return baseService.authCheck(sysUser.getUserName(), sysUser.getPassword());
    }

    @PostMapping("/admin/login")
    @Operation(summary = "后台登录")
    public SaResult adminLogin(@RequestBody SysUser sysUser) {
        if (!"admin".equals(sysUser.getUserName()))
            return SaResult.error("无权限");
        else
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


    @PostMapping("/upload")
    @Operation(summary = "上传通用接口")
    public SaResult upload(@RequestParam("imgFile") MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            return SaResult.error("上传文件不能为空");
        }
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID().toString();
        String filetype = originalFilename.split("\\.")[1];


        if (filetype.indexOf("jpg") < 0 && filetype.indexOf("png") < 0) {
            return SaResult.error("仅支持图片格式");
        }

        String targetFileName = filename + "." + filetype;
        // 设置上传至项目文件夹下的uploadFile文件夹中，没有文件夹则创建
        File dir = new File("images");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        file.transferTo(new File(dir.getAbsolutePath() + File.separator + targetFileName));
        return SaResult.data("http://localhost:8080/images/" + targetFileName);
    }


}
