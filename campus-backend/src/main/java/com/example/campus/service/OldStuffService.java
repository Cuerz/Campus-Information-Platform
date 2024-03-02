package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.OldStuff;

public interface OldStuffService {

    SaResult queryAll(Integer pageNum, Integer pageSize, String oldStuffName, Boolean examine);

    SaResult insert(OldStuff oldStuff);

    SaResult delete(Integer oldStuffId);

    SaResult updateExamine(Integer oldStuffId, Boolean examine);
}
