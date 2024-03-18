package com.example.campus.api.front;

import cn.dev33.satoken.annotation.SaCheckLogin;
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
@RequestMapping("/api/announcement")
@Slf4j
@Tag(name = "前台/公告类接口")
public class FrontAnnouncementApi {

    @Resource
    private AnnouncementService announcementService;


    @SaCheckLogin
    @GetMapping("/list")
    @Operation(summary = "查看所有公告")
    public SaResult queryAll() {
        return announcementService.queryAll(null, null, null, null);
    }


}
