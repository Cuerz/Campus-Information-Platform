package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import com.example.campus.domain.LostItems;

public interface LostItemsService {

    SaResult queryAll(Integer pageNum, Integer pageSize, String itemName, Boolean examine);

    SaResult insert(LostItems lostItems);

    SaResult delete(Integer lostId);

    SaResult updateExamine(Integer lostId, Boolean examine);
}
