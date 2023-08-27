package com.sellent.web.Controller;


import com.sellent.web.Service.NaverService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class NaverController {

//    @Autowired
//    NaverService naverService;

//    @RequestMapping("/login/naver")
//    public String kakaoLogin(@RequestParam(value = "code") String code, HttpSession session) throws Exception {
//        String accecc_token = naverService.getToken(code, session);
//
//        return accecc_token;
//
//    }
}
