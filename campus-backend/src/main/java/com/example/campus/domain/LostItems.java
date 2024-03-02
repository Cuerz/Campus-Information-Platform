package com.example.campus.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;


@EqualsAndHashCode(callSuper = true)
@Data
@Alias("LostItems")
public class LostItems extends BaseEntity implements Serializable {

    private Integer lostId;

    private Integer userId;

    private String nickName;

    private String itemName;

    private String itemPic;

    private String description;

    private String contactNumber;

    private Boolean examine = false;

}