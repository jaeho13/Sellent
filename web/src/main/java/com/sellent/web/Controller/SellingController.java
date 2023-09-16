package com.sellent.web.Controller;

import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Service.SellingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Log4j2
@CrossOrigin(origins = "*")
public class SellingController {

    @Autowired
    SellingService sellingService;

    public UserList userSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        UserList user = (UserList) session.getAttribute("userList");
        return user;
    }

    // 전체 글 목록 조회하기
    @GetMapping("/list")
    public Map<String, Object> getList() {
        return sellingService.getList();
    }

    // Method : GET/selling
    // Param : sellIdx
    // 글 읽기
    @GetMapping("/sellent")
    public Map<String, Object> getContent(@RequestParam String sellIdx) throws Exception {
        Map<String, Object> result = sellingService.getContent(sellIdx);

        return result;
    }

    // Method : POST
    // Param : sellTitle, sellContent, userEmail, sellType, sellPrice, sellLocation, sellType
    // 글 작성
    @PostMapping("/sellent")
    public void postContent(@RequestBody Map<String, Object> content, HttpServletRequest request) throws ParseException {
        UserList userList = userSession(request);
        sellingService.postContent(content, userList);
    }
}