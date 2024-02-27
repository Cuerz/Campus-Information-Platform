package com.example.campus.domain;


import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Alias("SysRole")
public class SysRole extends BaseEntity implements Serializable {

    private Integer roleId;

    private String roleName;

    private String description;

    private Boolean enable = true;

}
