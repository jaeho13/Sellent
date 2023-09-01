package com.sellent.web.Service;

import com.sellent.web.Dto.SellingDTO;
import com.sellent.web.Entiity.Selling;
import com.sellent.web.Repository.SellingCmtRepository;
import com.sellent.web.Repository.SellingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SellingService {

    @Autowired
    SellingRepository sellingRepository;

    @Autowired
    SellingCmtRepository sellingCmtRepository;

    // 판매 글 전체 가져오기
    public Map<String, Object> getSellingList() {
        Map<String, Object> result = new HashMap<>();

        // 글 목록 저장
        result.put("sellList", sellingRepository.findBySelling());
        // 글 댓글 수 저장
        result.put("sellCmtCnt", sellingCmtRepository.countByCmt());

        return result;
    }

    public Map<String, Object> getSellingContent(String num) {
        Map<String, Object> map = new HashMap<>();
        int sellIdx = Integer.parseInt(num);

        SellingDTO sellingDTO = sellingRepository.getSellingContentWithSellIdx(sellIdx);

        map.put("sellingContent",sellingDTO);
        return map;
    }
}