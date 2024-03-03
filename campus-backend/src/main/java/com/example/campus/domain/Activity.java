package com.example.campus.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@Alias("Activity")
public class Activity extends BaseEntity implements Serializable {

    private Integer activityId;

    private Integer userId;

    private String nickName;

    private String activityTitle;

    private String activityLabel;

    private String activityLocale;

    private String activityDescription;

    private Boolean examine = false;

}
