package com.example.campus.api.front;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.LostItems;
import com.example.campus.service.LostItemsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/lost")
@Slf4j
@Tag(name = "前台/失物认领")
public class FrontLostApi {

    @Resource
    private LostItemsService lostItemsService;

    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有失物")
    public SaResult queryAll() {
        return lostItemsService.queryAll(null, null, null,true );
    }


    @PostMapping("/add")
    @SaCheckRole(value = {"Teacher", "Student"}, mode = SaMode.OR)
    @Operation(summary = "新增失物认领记录")
    public SaResult addUser(@RequestBody LostItems lostItems) {
        return lostItemsService.insert(lostItems);
    }
}
