package com.example.campus.api.back;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.service.SysRoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/role")
@Slf4j
@Tag(name = "后台/角色管理")
public class SysRoleApi {

    @Resource
    private SysRoleService sysRoleService;

    @GetMapping("/list")
    @SaCheckRole("Admin")
    @Operation(summary = "查看所有角色")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "roleName", required = false) String roleName,
                             @RequestParam(value = "description", required = false) String description) {
        return sysRoleService.queryAll(pageNum, pageSize, roleName, description);
    }
}
