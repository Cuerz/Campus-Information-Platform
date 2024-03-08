package com.example.campus.api.front;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Activity;
import com.example.campus.service.ActivityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/activity")
@Slf4j
@Tag(name = "前台/校园活动")
public class FrontActivityApi {


    @Resource
    private ActivityService activityService;


    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有活动")
    public SaResult queryAll() {
        return activityService.queryAll(null, null, null,null, true);
    }

    @SaCheckLogin
    @PostMapping("/add")
    @Operation(summary = "新增活动记录")
    public SaResult addUser(@RequestBody Activity activity) {
        return activityService.insert(activity);
    }
}
