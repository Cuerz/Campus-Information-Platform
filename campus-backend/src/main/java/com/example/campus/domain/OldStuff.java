package com.example.campus.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@Alias("OldStuff")
public class OldStuff extends BaseEntity implements Serializable {

    private Integer oldStuffId;

    private Integer userId;

    private String nickName;

    private String oldStuffName;

    private String oldStuffPic;

    private String description;

    private String contactNumber;

    private Boolean examine = false;

}