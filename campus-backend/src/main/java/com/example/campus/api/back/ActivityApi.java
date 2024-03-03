package com.example.campus.api.back;

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
@RequestMapping("/api/admin/activity")
@Slf4j
@Tag(name = "后台/活动管理")
public class ActivityApi {

    @Resource
    private ActivityService activityService;


    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有活动")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "activityTitle", required = false) String activityTitle,
                             @RequestParam(value = "activityLabel", required = false) String activityLabel,
                             @RequestParam(value = "examine", required = false) Boolean examine) {
        return activityService.queryAll(pageNum, pageSize, activityTitle,activityLabel, examine);
    }

    @SaCheckLogin
    @PostMapping("/add")
    @Operation(summary = "新增活动记录")
    public SaResult addUser(@RequestBody Activity activity) {
        return activityService.insert(activity);
    }

    @SaCheckLogin
    @DeleteMapping("/delete/{activityId}")
    @Operation(summary = "删除活动")
    public SaResult delete(@PathVariable("activityId") Integer activityId) {
        return activityService.delete(activityId);
    }

    @SaCheckLogin
    @PostMapping("/updateExamine")
    @Operation(summary = "修改活动审核状态")
    public SaResult updateExamine(@RequestBody Activity activity) {
        Integer activityId = activity.getActivityId();
        Boolean examine = activity.getExamine();
        return activityService.updateExamine(activityId, examine);
    }

}
