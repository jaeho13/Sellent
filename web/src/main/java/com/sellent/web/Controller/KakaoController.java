package com.sellent.web.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
public class KakaoController {
    @Autowired
    KakaoService kakaoService;

    // 카카오 로그인
    // 1. 카카오 인가코드 받기
    @RequestMapping("login/kakao/sellent") // 확인 필요
    public String kakaoLogin(@RequestParam(value = "code", required = false) String code) throws Exception {
        System.out.println("요청 성공");
        String access_token = kakaoService.getToken(code);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        return access_token;
    }

    // 2.
    @RequestMapping("/login/kakao/userList")
    public Map<String, Object> kakaoUserInfo(@RequestParam(value = "token") String token,
            HttpServletRequest request) throws Exception {
        Map<String, Object> map = new HashMap<>();
        UserList user = kakaoService.getKakaoUserList(token);
        log.info("userList ={}", user);

        if (user != null) {
            // Set the user information in the session
            HttpSession session = request.getSession();
            session.setAttribute("userList", user);

            // Populate the response map
            map.put("userList", user);
            System.out.println("로그인 성공!!" + user);
            return map;
        }

        map.put("status", HttpStatus.BAD_REQUEST.toString());
        return map;
    }
}