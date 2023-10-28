package com.sellent.web.Service;

import com.sellent.web.Dto.CommentDTO;
import com.sellent.web.Dto.ContentDTO;
import com.sellent.web.Dto.ListDTO;
import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.SellingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SellingService {

    @Autowired
    SellingRepository sellingRepository;
    @Autowired
    UserService userService;
    @Autowired
    AddressService addressService;
    @Autowired
    SellingCmtService sellingCmtService;

    // 글 전체 가져오기
    public Map<String, Object> selectList() {
        Map<String, Object> result = new HashMap<>();

        // 판매 글 목록 저장
        result.put("sellList", sellingRepository.findBySelling());

        // 구매 글 목록 저장
        result.put("purList", sellingRepository.findByPurchase());

        // 판매글 중 좋아요 수 최상위 3개만 가져오기
        List<ListDTO> beforeLikeList = sellingRepository.findPopular();
        List<ListDTO> topLikeList = beforeLikeList.stream()
                .limit(6)
                .collect(Collectors.toList());

        result.put("likeList", topLikeList);

        return result;
    }

    // 글 읽기
    public Map<String, Object> selectContent(String num) {
        Map<String, Object> map = new HashMap<>();
        int sellIdx = Integer.parseInt(num);

        try {
            // 원 글 내용 가져오기
            ContentDTO contentDTO = sellingRepository.getSellingContent(sellIdx);

            // 댓글 리스트 가져오기
            List<CommentDTO> commentDTO = sellingCmtService.getSellingCmt(sellIdx);

            // 이미지 이름 가져오기
            String imageRelativePath = contentDTO.getUploadedFileNames();

            // 이미지 절대경로 + 이미지 이름
            // String imageUrl =
            // "/Users/pizzay/Documents/sellent/sellent/web/src/main/frontend/src/image"+
            // imageRelativePath;
            String imageUrl = "/image" + imageRelativePath;

            // map > put
            map.put("Content", contentDTO);
            map.put("Comment", commentDTO);
            map.put("Location", addressService.getAddress(contentDTO.getSellLocation()));
            map.put("Image", imageUrl);

            return map;

        } catch (NullPointerException e) {
            e.printStackTrace();
            throw e;
        }
    }

    // 글 작성
    public void insertContent(Map<String, Object> content, UserList userList) {
        Selling selling = new Selling();
        System.out.println("들어오긴 하는거니 ^^ㅣ발");

        System.out.println(content.get("files") + "@@@@@@@@@");
        String userEmail = (String) userList.getUserEmail();

        selling.setUserListVO(userService.findUserVO(userEmail));
        selling.setSellTitle((String) content.get("sellTitle"));
        selling.setSellContent((String) content.get("sellContent"));
        selling.setSellDate(new Date());
        selling.setSellLocation((String) content.get("sellLocation"));
        selling.setSellType(Integer.parseInt((String) content.get("sellType")));
        selling.setSellPrice(Integer.parseInt((String) content.get("sellPrice")));

        sellingRepository.save(selling);
    }

    // 글 수정
    // sellTitle, sellContent, sellPrice, sellLocation
    public Boolean updateContent(Map<String, Object> content, UserList userList) {

        int sellIdx = Integer.parseInt((String) content.get("sellIdx"));
        Selling selling = sellingRepository.findContent(sellIdx);

        // 작성자 확인
        String oldWriter = selling.getUserListVO().getUserEmail();
        String newWriter = userList.getUserEmail();

        if (!oldWriter.equals(newWriter)) {

            return false;
        } else {
            selling.setSellTitle((String) content.get("sellTitle"));
            selling.setSellContent((String) content.get("sellContent"));

            Object typeCheck = content.get("sellPrice");
            if (typeCheck instanceof String) {
                selling.setSellPrice(Integer.parseInt((String) content.get("sellPrice")));
            } else if (typeCheck instanceof Integer) {
                selling.setSellPrice((Integer) content.get("sellPrice"));
            }

            sellingRepository.save(selling);

            return true;
        }
    }

    // 글 삭제
    public Boolean deleteContent(String param, UserList userList) {
        int sellIdx = Integer.parseInt(param);

        try {
            // 원 글쓴이 확인
            String userVO = sellingRepository.findContent(sellIdx).getUserListVO().getUserEmail();

            if (userList.getUserEmail().equals(userVO)) {
                // 댓글 먼저 지우기
                sellingCmtService.deleteAllCmt(sellIdx);

                // 글 지우기
                sellingRepository.deleteById(sellIdx);

                return true;
            }

            return false;
        } catch (NullPointerException e) {
            e.printStackTrace();
            throw e;
        }
    }

    // 원 글 찾기
    public Selling findContent(int sellIdx) {
        Selling selling = sellingRepository.findContent(sellIdx);

        return selling;
    }

    // 댓글 작성
    public void insertCmt(Map<String, Object> comment, UserList userList) {
        int sellIdx = Integer.parseInt((String) comment.get("sellIdx"));

        Selling sellingVO = findContent(sellIdx);
        UserList userVO = userService.findUserVO(userList.getUserEmail());

        sellingCmtService.insertCmt(comment, sellingVO, userVO);
    }

    public void plusLikeCount(String likeCnt, UserList userList) {
        // int LikeCnt = Integer.parseInt((String) )
    }

    public void insertFile(UserList userList, List<String> uploadedFileNames, Map<String, String> map) {

        Selling selling = new Selling();
        String userEmail = (String) userList.getUserEmail();

        selling.setUserListVO(userService.findUserVO(userEmail));
        selling.setSellTitle((String) map.get("sellTitle"));
        selling.setSellContent((String) map.get("sellContent"));
        selling.setSellDate(new Date());
        selling.setSellLocation((String) map.get("sellLocation"));
        selling.setSellType(Integer.parseInt((String) map.get("sellType")));
        selling.setSellPrice(Integer.parseInt((String) map.get("sellPrice")));

        // 업로드한 파일 이름을 설정
        selling.setUploadedFileNames(String.join(",", uploadedFileNames)); // 업로드한 파일 이름을 쉼표로 구분하여 저장합니다.

        sellingRepository.save(selling); // 데이터베이스에 저장
    }
}
