package com.example.campus.api.back;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.LostItems;
import com.example.campus.domain.Recruit;
import com.example.campus.service.RecruitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/recruit")
@Slf4j
@Tag(name = "后台/招聘需求")
public class RecruitApi {

    @Resource
    private RecruitService recruitService;

    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有招聘需求")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "jobName", required = false) String jobName,
                             @RequestParam(value = "examine", required = false) Boolean examine) {
        return recruitService.queryAll(pageNum, pageSize, jobName, examine);
    }

    @SaCheckLogin
    @PostMapping("/add")
    @Operation(summary = "新增招聘需求")
    public SaResult addUser(@RequestBody Recruit recruit) {
        return recruitService.insert(recruit);
    }


    @SaCheckLogin
    @DeleteMapping("/delete/{recruitId}")
    @Operation(summary = "删除招聘需求")
    public SaResult delete(@PathVariable("recruitId") Integer recruitId) {
        return recruitService.delete(recruitId);
    }

    @SaCheckLogin
    @PostMapping("/updateExamine")
    @Operation(summary = "修改招聘需求审核状态")
    public SaResult updateExamine(@RequestBody Recruit recruit) {
        Integer recruitId = recruit.getRecruitId();
        Boolean examine = recruit.getExamine();
        return recruitService.updateExamine(recruitId, examine);
    }
}
