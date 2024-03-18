package com.example.campus.api.back;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Announcement;
import com.example.campus.service.AnnouncementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/announcement")
@Slf4j
@Tag(name = "后台/公告管理")
public class AnnouncementApi {

    @Resource
    private AnnouncementService announcementService;


    @GetMapping("/list")
    @SaCheckRole("Admin")
    @Operation(summary = "查看所有公告")
    public SaResult queryAll(@RequestParam(value = "pageNum", required = false) Integer pageNum,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize,
                             @RequestParam(value = "announcementTitle", required = false) String announcementTitle,
                             @RequestParam(value = "announcementContent", required = false) String announcementContent) {
        return announcementService.queryAll(pageNum, pageSize, announcementTitle, announcementContent);
    }

    @PostMapping("/add")
    @SaCheckRole("Admin")
    @Operation(summary = "新增公告")
    public SaResult addUser(@RequestBody Announcement announcement) {
        return announcementService.insert(announcement);
    }


    @DeleteMapping("/delete/{announcementId}")
    @SaCheckRole("Admin")
    @Operation(summary = "删除公告")
    public SaResult delete(@PathVariable("announcementId") Integer announcementId) {
        return announcementService.delete(announcementId);
    }
}
