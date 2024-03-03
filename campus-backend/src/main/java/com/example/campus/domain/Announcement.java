package com.example.campus.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@Alias("Announcement")
public class Announcement extends BaseEntity implements Serializable {

    private Integer announcementId;

    private String announcementTitle;

    private String announcementContent;
}
