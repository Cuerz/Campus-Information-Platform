package com.example.campus.api.front;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Recruit;
import com.example.campus.service.RecruitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/recruit")
@Slf4j
@Tag(name = "前台/招聘中心")
public class FrontRecruitApi {

    @Resource
    private RecruitService recruitService;

    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有招聘需求")
    public SaResult queryAll() {
        return recruitService.queryAll(null, null, null, true);
    }

    @SaCheckLogin
    @PostMapping("/add")
    @Operation(summary = "新增招聘需求")
    public SaResult addUser(@RequestBody Recruit recruit) {
        return recruitService.insert(recruit);
    }
}
