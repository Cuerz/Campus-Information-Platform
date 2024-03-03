package com.example.campus.mapper;

import com.example.campus.domain.Announcement;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnnouncementMapper {
    List<Announcement> queryAll(String announcementTitle, String announcementContent);

    Announcement queryById(Integer announcementId);

    int insert(Announcement announcement);

    int deleteById(Integer announcementId);
}
