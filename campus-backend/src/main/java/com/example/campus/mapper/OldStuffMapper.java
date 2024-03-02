package com.example.campus.mapper;

import com.example.campus.domain.OldStuff;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface OldStuffMapper {

    List<OldStuff> queryAll(String oldStuffName, Boolean examine);

    OldStuff queryById(Integer oldStuffId);

    int insert(OldStuff oldStuff);

    int deleteById(Integer oldStuffId);

    int updateExamine(Integer oldStuffId, Boolean examine);
}
