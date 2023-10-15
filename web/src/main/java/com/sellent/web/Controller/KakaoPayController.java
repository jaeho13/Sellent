package com.sellent.web.Controller;

import com.sellent.web.Entiity.SellingList;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Log
public class KakaoPayController {

    @Setter(onMethod_ = @Autowired)
    private KakaoPayService kakaoPay;

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

    @GetMapping("/kakaoPay")
    public Map<String, Object> kakaoPay(@RequestParam String sellIdx, HttpServletRequest request)
            throws Exception {
        System.out.println("카카오페이 Get 요청 성공!!");

        Map<String, Object> map = new HashMap<>();

        UserList userList = userSession(request);
        String userEmail = userList.getUserEmail();
        String resultUrl = kakaoPay.kakaoPayReady(sellIdx, userEmail);

        map.put("Url", resultUrl);

        return map;
    }

    @GetMapping("/kakaoPaySuccess")
    public List<SellingList> kakaoPaySuccess(@RequestParam("pg_token") String pg_token
            , HttpServletRequest request)
            throws Exception {

        log.info("kakaoPay Success get................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);


        UserList userList = userSession(request);
        String userEmail = userList.getUserEmail();

        return kakaoPay.kakaoPayInfo(pg_token, userEmail);
    }
}