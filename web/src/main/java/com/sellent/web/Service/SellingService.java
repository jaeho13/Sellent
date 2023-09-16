package com.sellent.web.Service;

import com.sellent.web.Dto.ContentDTO;
import com.sellent.web.Dto.ListDTO;
import com.sellent.web.Repository.SellingCmtRepository;
import com.sellent.web.Repository.SellingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SellingService {

    @Autowired
    SellingRepository sellingRepository;

    @Autowired
    SellingCmtRepository sellingCmtRepository;

    // 판매 글 전체 가져오기
    public Map<String, Object> getSellingList() {
        Map<String, Object> result = new HashMap<>();

        // 판매 글 목록 저장
        result.put("sellList" , sellingRepository.findBySelling());

        // 구매 글 목록 저장
        result.put("purList", sellingRepository.findByPurchase());

        // 판매글 중 좋아요 수 최상위 3개만 가져오기
        List<ListDTO> beforeLikeList = sellingRepository.findPopular();
        List<ListDTO> topLikeList = beforeLikeList.stream()
                .limit(3)
                .collect(Collectors.toList());

        result.put("likeList", topLikeList);

        // 글 댓글 수 저장
        //result.put("sellCmtCnt", sellingCmtRepository.countByCmt());

        return result;
    }

    public Map<String, Object> getSellingContent(String num) {
        Map<String, Object> map = new HashMap<>();
        int sellIdx = Integer.parseInt(num);

        try {
            ContentDTO sellingDTO = sellingRepository.getSellingContent(sellIdx);
            map.put("Content",sellingDTO);
            return map;
        }
        catch (NullPointerException e) {
            e.printStackTrace();
            throw e;
        }
    }
}
