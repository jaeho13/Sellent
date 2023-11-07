package com.sellent.web.Controller;

import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.SellingCmt;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Service.SellingCmtService;
import com.sellent.web.Service.SellingService;
import com.sellent.web.Service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.text.ParseException;
import java.util.*;

@RequiredArgsConstructor
@RestController
@Log4j2
@CrossOrigin(origins = "*")
public class SellingController {

    @Autowired
    SellingService sellingService;
    @Autowired
    SellingCmtService sellingCmtService;
    @Autowired
    UserService userService;

    public UserList userSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserList userList = (UserList) session.getAttribute("userList");
            if (userList != null) {
                System.out.println("UserList found in session: " + userList);
                return userList;
            }
        }
        System.out.println("UserList not found in session.");
        return null;
    }

    // 전체 글 목록 조회하기
    @GetMapping("/list")
    public Map<String, Object> selectList()
            throws Exception {
        return sellingService.selectList();
    }

    // Method : GET/sellent
    // Param : sellIdx
    // 글 읽기
    @GetMapping("/sellent")
    public Map<String, Object> selectContent(@RequestParam String sellIdx, HttpServletRequest request)
            throws Exception {
        UserList userList = userSession(request);
        Map<String, Object> result = sellingService.selectContent(sellIdx);

        return result;
    }

    // Method : POST/sellent
    // Param : sellTitle, sellContent, sellType, sellPrice, sellLocation,
    // 글 작성
    // @PostMapping("/sellent")
    // public void insertContent(@RequestBody Map<String, Object> content,
    // HttpServletRequest request)
    // throws ParseException {
    // UserList userList = userSession(request);
    // sellingService.insertContent(content, userList);
    // }

    @PostMapping("/sellent")
    public void insertFile(@RequestParam("files") MultipartFile[] files,
            @RequestParam("sellTitle") String sellTitle,
            @RequestParam("sellContent") String sellContent,
            @RequestParam("sellType") String sellType,
            @RequestParam("sellPrice") String sellPrice,
            @RequestParam("sellLocation") String sellLocation,
            HttpServletRequest request) {
        // 다른 파라미터 처리 코드와 마찬가지로 파일 업로드 파라미터를 처리합니다.

        // 파일 업로드 및 저장
        List<String> uploadedFileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    // 파일 저장 경로 설정
                    // String uploadDir =
                    // "/Users/pizzay/Documents/sellent/sellent1/web/src/main/frontend/public/images";
                    // "/D:\Sellent\sellent\web\src\main\frontend\public\images"
                    // 저장 경로를 설정해야 합니다.
                    String uploadDir = "/Users/pizzay/Documents/sellent/sellent1/web/src/main/frontend/public/images";
                    System.out.println("1 : " + file.getSize());
                    System.out.println("2 : " + files.length);

                    File uploadPath = new File(uploadDir);
                    System.out.println("1:" + file.getSize());
                    System.out.println("2:" + files.length);

                    if (!uploadPath.exists()) {
                        uploadPath.mkdirs();
                    }

                    // 파일명 생성 (예시: 원본 파일명에 타임스탬프 추가)
                    String originalFileName = file.getOriginalFilename();
                    String timeStamp = String.valueOf(System.currentTimeMillis());
                    String uniqueFileName = timeStamp + "_" + originalFileName;

                    File dest = new File(uploadPath + File.separator + uniqueFileName);
                    file.transferTo(dest); // 파일 저장

                    uploadedFileNames.add(uniqueFileName); // 업로드한 파일 이름 저장

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // 나머지 데이터 처리 코드 (DB에 저장 등) 추가
        UserList userList = userSession(request);
        Map<String, String> map = new HashMap<>();
        map.put("sellTitle", sellTitle);
        map.put("sellContent", sellContent);
        map.put("sellType", sellType);
        map.put("sellPrice", sellPrice);
        map.put("sellLocation", sellLocation);

        // 업로드한 파일명을 데이터베이스에 저장하거나 다른 용도로 사용할 수 있습니다.

        sellingService.insertFile(userList, uploadedFileNames, map);
    }

    // Method : PATCH/sellent
    // Param : sellTitle, sellContent, sellPrice, sellLocation
    // 글 수정
    @PatchMapping("/sellent")
    public ResponseEntity<String> updateContent(@RequestBody Map<String, Object> content, HttpServletRequest request)
            throws ParseException {
        try {
            UserList userList = userSession(request);
            Boolean bool = sellingService.updateContent(content, userList);

            if (bool) {
                return ResponseEntity.ok("글이 성공적으로 수정되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자신이 작성한 글만 수정할 수 있습니다.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글 수정에 실패했습니다.");
        }
    }

    // Method : DELETE/sellent
    // Param : sellIdx
    // 글 삭제
    @DeleteMapping("/sellent")
    public ResponseEntity<String> deleteContent(@RequestParam String sellIdx, HttpServletRequest request) {
        try {
            UserList userList = userSession(request);
            Boolean isDeleted = sellingService.deleteContent(sellIdx, userList);

            if (isDeleted) {
                return ResponseEntity.ok("글이 성공적으로 삭제되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자신이 작성한 글만 삭제할 수 있습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글 삭제에 실패했습니다.");
        }
    }

    // ------------------------------------------------
    // 댓글 작성
    // Method : POST
    // Param : sellIdx, sellCmtContent
    @PostMapping("/sellntCmt")
    public void insertComment(@RequestBody Map<String, Object> comment, HttpServletRequest request)
            throws ParseException {
        UserList userList = userSession(request);
        int sellIdx = Integer.parseInt((String) comment.get("sellIdx"));

        Selling sellingVO = sellingService.findContent(sellIdx);
        UserList userListVO = userService.findUserVO(userList.getUserEmail());
        sellingCmtService.insertCmt(comment, sellingVO, userListVO);
    }

    // 댓글 삭제
    // Method : DELETE
    // Param : sellCmtIdx
    @DeleteMapping("/sellentCmt")
    public ResponseEntity<String> deleteComment(@RequestParam String sellCmtIdx, HttpServletRequest request) {
        UserList userList = userSession(request);
        int sellentCmtIdx = Integer.parseInt(sellCmtIdx);
        Boolean result = sellingCmtService.deleteCmt(sellentCmtIdx, userList);

        if (result) {
            return ResponseEntity.status(HttpStatus.OK).body("삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("삭제 실패하였습니다.");
        }
    }

    // 좋아요
    // Method : POST d
    // Param : sellIdx
    @GetMapping("/likeCount")
    public ResponseEntity<String> plusLikeCount(@RequestParam String likeCnt, HttpServletRequest request)
            throws ParseException {
        UserList userList = userSession(request);
        // sellingService.plusLikeCount(likeCnt, userList);
        return null;
    }
}