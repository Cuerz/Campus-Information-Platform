package com.example.campus.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;


@EqualsAndHashCode(callSuper = true)
@Data
@Alias("Recruit")
public class Recruit extends BaseEntity implements Serializable {

    private Integer recruitId;

    private Integer userId;

    private String nickName;

    private String jobName;

    private String jobDescription;

    private String contactNumber;

    private Boolean examine = false;

}