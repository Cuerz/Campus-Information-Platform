package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Activity;

public interface ActivityService {
    SaResult queryAll(Integer pageNum, Integer pageSize, String activityTitle, String activityLabel, Boolean examine);

    SaResult insert(Activity activity);

    SaResult delete(Integer activityId);

    SaResult updateExamine(Integer activityId, Boolean examine);
}
