package com.example.campus.service;

import cn.dev33.satoken.util.SaResult;

public interface BaseService {

    SaResult authCheck(String userName, String password);


    SaResult getInfo();
}
