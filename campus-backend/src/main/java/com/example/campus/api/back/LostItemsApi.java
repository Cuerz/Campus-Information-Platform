package com.example.campus.api.back;

import cn.dev33.satoken.annotation.SaCheckRole;
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
@RequestMapping("/api/admin/lost")
@Slf4j
@Tag(name = "后台/失物认领")
public class LostItemsApi {

    @Resource
    private LostItemsService lostItemsService;

    @GetMapping("/list")
    @SaCheckRole("Admin")
    @Operation(summary = "查看所有失物")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "itemName", required = false) String itemName,
                             @RequestParam(value = "examine", required = false) Boolean examine) {
        return lostItemsService.queryAll(pageNum, pageSize, itemName, examine);
    }

    @PostMapping("/add")
    @SaCheckRole("Admin")
    @Operation(summary = "新增失物认领记录")
    public SaResult addUser(@RequestBody LostItems lostItems) {
        return lostItemsService.insert(lostItems);
    }


    @DeleteMapping("/delete/{lostId}")
    @SaCheckRole("Admin")
    @Operation(summary = "删除失物认领记录")
    public SaResult delete(@PathVariable("lostId") Integer lostId) {
        return lostItemsService.delete(lostId);
    }


    @PostMapping("/updateExamine")
    @SaCheckRole("Admin")
    @Operation(summary = "修改失物认领审核状态")
    public SaResult updateExamine(@RequestBody LostItems lostItems) {
        Integer lostId = lostItems.getLostId();
        Boolean examine = lostItems.getExamine();
        return lostItemsService.updateExamine(lostId, examine);
    }


}