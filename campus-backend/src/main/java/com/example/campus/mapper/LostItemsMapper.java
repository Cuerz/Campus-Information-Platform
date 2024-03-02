package com.example.campus.mapper;

import com.example.campus.domain.LostItems;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LostItemsMapper {

    List<LostItems> queryAll(String itemName, Boolean examine);

    LostItems queryById(Integer lostId);

    int insert(LostItems lostItems);

    int deleteById(Integer lostId);

    int updateExamine(Integer lostId, Boolean examine);

}
