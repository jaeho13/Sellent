package com.sellent.web.Controller;


import com.sellent.web.Entiity.UserList;
import com.sellent.web.Service.NaverService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Log4j2
@CrossOrigin(origins = "*")
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
        log.info("userList ={}", userList);

        if (userList != null) {
            HttpSession session = request.getSession();
            session.setAttribute("userList", userList);
            map.put("userList", userList);

            log.info("로그인 성공!!!, userList={}", userList);
            return map;
        }
        map.put("status", HttpStatus.BAD_REQUEST.toString());

        return map;
    }
}
