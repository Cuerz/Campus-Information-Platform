package com.example.campus.mapper;

import com.example.campus.domain.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysUserMapper {


    SysUser queryByName(String userName);

    SysUser queryById(Integer id);

    int insert(SysUser sysUser);

    int deleteById(Integer id);

    int updateEnable(Integer id, Boolean enable);

    int updatePassword(Integer id, String password);

    int updateBasicInfo(SysUser sysUser);


    List<SysUser> queryAll(String userName, String phoneNumber, Boolean enable);

}
