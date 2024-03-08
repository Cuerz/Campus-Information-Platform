package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.Recruit;

public interface RecruitService {

    SaResult queryAll(Integer pageNum, Integer pageSize, String jobName, Boolean examine);

    SaResult insert(Recruit recruit);

    SaResult delete(Integer recruitId);

    SaResult updateExamine(Integer recruitId, Boolean examine);
}
