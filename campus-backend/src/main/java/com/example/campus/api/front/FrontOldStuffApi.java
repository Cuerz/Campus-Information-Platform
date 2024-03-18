package com.example.campus.api.front;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.OldStuff;
import com.example.campus.service.OldStuffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/old")
@Slf4j
@Tag(name = "前台/二手交易")
public class FrontOldStuffApi {

    @Resource
    private OldStuffService oldStuffService;

    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有二手物品")
    public SaResult queryAll() {
        return oldStuffService.queryAll(null, null, null,true);
    }


    @PostMapping("/add")
    @SaCheckRole(value = {"Teacher", "Student"}, mode = SaMode.OR)
    @Operation(summary = "新增二手物品记录")
    public SaResult addUser(@RequestBody OldStuff oldStuff) {
        return oldStuffService.insert(oldStuff);
    }

}
