package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;

public interface SysRoleService {

    SaResult queryAll(Integer pageNum, Integer pageSize, String roleName, String description);
}
