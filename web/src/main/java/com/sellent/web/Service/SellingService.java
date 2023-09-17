package com.sellent.web.Service;

import com.sellent.web.Dto.CommentDTO;
import com.sellent.web.Dto.ContentDTO;
import com.sellent.web.Dto.ListDTO;
import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.SellingCmtRepository;
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
    SellingCmtRepository sellingCmtRepository;
    @Autowired
    UserService userService;

    // 판매 글 전체 가져오기
    public Map<String, Object> selectList() {
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

    public Map<String, Object> selectContent(String num) {
        Map<String, Object> map = new HashMap<>();
        int sellIdx = Integer.parseInt(num);

        try {
            ContentDTO contentDTO = sellingRepository.getSellingContent(sellIdx);
            List<CommentDTO> commentDTO = sellingCmtRepository.getSellingComment(sellIdx);

            map.put("Content",contentDTO);
            map.put("Comment",commentDTO);

            return map;
        }
        catch (NullPointerException e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void insertContent(Map<String, Object> content, UserList userList) {
        Selling selling = new Selling();

        String userEmail = (String) userList.getUserEmail();

        selling.setUserListVO(userService.findUserVO(userEmail));
        selling.setSellTitle((String) content.get("sellTitle"));
        selling.setSellContent((String) content.get("sellContent"));
        selling.setSellDate(new Date());
        selling.setSellLocation((String) content.get("sellLocation"));
        selling.setSellType(Integer.parseInt((String) content.get("sellType")));
        selling.setSellPrice(Integer.parseInt((String) content.get("sellPrice")));
        selling.setSellLike(0);

        sellingRepository.save(selling);
    }

    public void updateContent(Map<String, Object> content, UserList userList) {
        int sellIdx = (int) content.get(Integer.parseInt((String) "sellIdx"));
        Selling selling = sellingRepository.findContent(sellIdx);

    }

    //원 글 찾기
    public Selling findContent(int sellIdx) {
        Selling selling = sellingRepository.findContent(sellIdx);
        return selling;
    }
}










