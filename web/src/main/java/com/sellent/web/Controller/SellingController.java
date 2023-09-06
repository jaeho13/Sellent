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

    // 글 목록 조회하기
    @GetMapping("/list")
    public Map<String, Object> getSellingList() {
        return sellingService.getSellingList();
    }

    // 글 읽기
    @GetMapping("/selling")
    public Map<String, Object> getSellingContent(@RequestParam String sellIdx) throws Exception {
        Map<String, Object> result = sellingService.getSellingContent(sellIdx);

        return result;
    }


}
