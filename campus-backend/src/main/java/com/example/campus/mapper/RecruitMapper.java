package com.example.campus.mapper;

import com.example.campus.domain.Recruit;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecruitMapper {
    List<Recruit> queryAll(String jobName, Boolean examine);

    Recruit queryById(Integer recruitId);

    int insert(Recruit recruit);

    int deleteById(Integer recruitId);

    int updateExamine(Integer recruitId, Boolean examine);
}
