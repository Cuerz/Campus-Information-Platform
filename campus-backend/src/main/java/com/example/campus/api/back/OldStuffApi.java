package com.example.campus.api.back;

import cn.dev33.satoken.annotation.SaCheckLogin;
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
@RequestMapping("/api/admin/old")
@Slf4j
@Tag(name = "后台/二手交易")
public class OldStuffApi {

    @Resource
    private OldStuffService oldStuffService;

    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有二手物品")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "oldStuffName", required = false) String oldStuffName,
                             @RequestParam(value = "examine", required = false) Boolean examine) {
        return oldStuffService.queryAll(pageNum, pageSize, oldStuffName, examine);
    }

    @SaCheckLogin
    @PostMapping("/add")
    @Operation(summary = "新增二手物品记录")
    public SaResult addUser(@RequestBody OldStuff oldStuff) {
        return oldStuffService.insert(oldStuff);
    }


    @SaCheckLogin
    @DeleteMapping("/delete/{oldStuffId}")
    @Operation(summary = "删除二手物品记录")
    public SaResult delete(@PathVariable("oldStuffId") Integer oldStuffId) {
        return oldStuffService.delete(oldStuffId);
    }

    @SaCheckLogin
    @PostMapping("/updateExamine")
    @Operation(summary = "修改二手物品审核状态")
    public SaResult updateExamine(@RequestBody OldStuff oldStuff) {
        Integer oldStuffId = oldStuff.getOldStuffId();
        Boolean examine = oldStuff.getExamine();
        return oldStuffService.updateExamine(oldStuffId, examine);
    }


}