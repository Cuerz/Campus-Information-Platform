package com.example.campus.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;


@EqualsAndHashCode(callSuper = true)
@Data
@Alias("SysUser")
public class SysUser extends BaseEntity implements Serializable {

    private Integer id;

    private SysRole sysRole;

    private String userName;

    private String password;

    private String nickName;

    private String phoneNumber;

    private Boolean enable=true;
}
