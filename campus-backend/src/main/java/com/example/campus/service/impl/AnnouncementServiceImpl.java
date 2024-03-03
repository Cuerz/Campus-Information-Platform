package com.example.campus.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Announcement;
import com.example.campus.mapper.AnnouncementMapper;
import com.example.campus.service.AnnouncementService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Resource
    private AnnouncementMapper announcementMapper;

    @Override
    public SaResult queryAll(Integer pageNum, Integer pageSize, String announcementTitle, String announcementContent) {
        if (pageNum == null || pageSize == null) {
            List<Announcement> announcementList = announcementMapper.queryAll(announcementTitle, announcementContent);
            return SaResult.data(announcementList);
        } else {
            PageHelper.startPage(pageNum, pageSize);
            List<Announcement> Announcements = announcementMapper.queryAll(announcementTitle, announcementContent);
            PageInfo<Announcement> info = new PageInfo<>(Announcements);
            return SaResult.data(info);
        }
    }

    @Override
    public SaResult insert(Announcement announcement) {
        if (announcement.getAnnouncementTitle() == null || announcement.getAnnouncementContent() == null) {
            return SaResult.error("相关信息不能为空");
        }
        announcementMapper.insert(announcement);
        return SaResult.data(announcementMapper.queryById(announcement.getAnnouncementId()));
    }

    @Override
    public SaResult delete(Integer announcementId) {
        announcementMapper.deleteById(announcementId);
        return SaResult.ok();
    }
}
