package com.example.campus.exception;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;
import cn.dev33.satoken.util.SaResult;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ResponseBody
    @ExceptionHandler
    public SaResult handlerException(Exception e, HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        // 打印堆栈，以供调试
        System.out.println("全局异常---------------");
        e.printStackTrace();

        String message = "";
        if (e instanceof NotLoginException) {
            message = "Token 无效";
        } else if (e instanceof NotPermissionException || e instanceof NotRoleException) {
            message = "无此权限";
        } else {
            message = e.getMessage();
        }

        // 返回给前端
        return SaResult.error(message);
    }

}
