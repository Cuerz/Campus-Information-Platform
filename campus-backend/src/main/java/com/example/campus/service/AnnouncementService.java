package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Announcement;

public interface AnnouncementService {

    SaResult queryAll(Integer pageNum, Integer pageSize, String announcementTitle, String announcementContent);

    SaResult insert(Announcement announcement);

    SaResult delete(Integer announcementId);

}
