package com.example.campus.mapper;

import com.example.campus.domain.Activity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ActivityMapper {
    List<Activity> queryAll(String activityTitle,String activityLabel, Boolean examine);

    Activity queryById(Integer activityId);

    int insert(Activity activity);

    int deleteById(Integer activityId);

    int updateExamine(Integer activityId, Boolean examine);
}
