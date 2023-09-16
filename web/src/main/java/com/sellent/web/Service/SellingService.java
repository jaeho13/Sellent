package com.sellent.web.Service;

import com.sellent.web.Dto.ContentDTO;
import com.sellent.web.Dto.ListDTO;
import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.SellingRepository;
import com.sellent.web.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SellingService {

    @Autowired
    SellingRepository sellingRepository;

    @Autowired
    UserRepository userRepository;

    // 판매 글 전체 가져오기
    public Map<String, Object> getList() {
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

        return result;
    }

    public Map<String, Object> getContent(String num) {
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

    public void postContent(Map<String, Object> content, UserList userList) {
        Selling selling = new Selling();

        String userEmail = (String) userList.getUserEmail();
        UserList userVO = userRepository.findByUserEmail(userEmail);

        selling.setUserListVO(userVO);
        selling.setSellTitle((String) content.get("sellTitle"));
        selling.setSellContent((String) content.get("sellContent"));
        selling.setSellDate(new Date());
        selling.setSellLocation((String) content.get("sellLocation"));
        selling.setSellType((int) content.get("sellType"));
        selling.setSellPrice((int) content.get("sellPrice"));
        selling.setSellLike(0);

        sellingRepository.save(selling);
    }
}










