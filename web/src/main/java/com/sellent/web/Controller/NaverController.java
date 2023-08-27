package com.sellent.web.Controller;


import com.sellent.web.Entiity.UserList;
import com.sellent.web.Service.NaverService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class NaverController {

    @Autowired
    NaverService naverService;

    @RequestMapping("/login/naver/sellent")
    public String naverLogin(@RequestParam(value = "code") String code, HttpSession session) throws Exception {
        String accecc_token = naverService.getToken(code, session);

        return accecc_token;

    }

    @RequestMapping("/login/naver/userList")
    public Map<String, Object> naverUserInfo(@RequestParam(value = "token", required = false) String token,
            HttpServletRequest request) throws Exception {
        Map<String, Object> map = new HashMap<>();
        UserList userList = naverService.getNaverUserList(token);
        log.info("userInfo ={}", userList);

        if (userList != null) {
            HttpSession session = request.getSession();
            session.setAttribute("userInfo", userList);
            map.put("userList", userList);

            log.info("로그인 성공!!!, userinfo={}", userList);
            return map;
        }
        map.put("status", HttpStatus.BAD_REQUEST.toString());

        return map;
    }
}