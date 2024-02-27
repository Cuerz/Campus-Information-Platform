package com.example.campus.mapper;

import com.example.campus.domain.SysRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysRoleMapper {

    SysRole queryById(Integer roleId);

    SysRole queryByRoleName(String roleName);

    List<SysRole> queryAll(String roleName, String description);
//
//    int insert(SysRole sysRole);
//
//    int update(SysRole sysRole);
//
//    int updateEnable(Integer roleId, Boolean enable);
//
//    int deleteById(Integer roleId);
//
//    int addPower(Integer roleId, Integer powerId);
//
//    int deletePower(Integer roleId, Integer powerId);

}
