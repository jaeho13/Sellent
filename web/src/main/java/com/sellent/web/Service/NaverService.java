package com.sellent.web.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class NaverService {
    @Autowired
    UserRepository userRepository;

    public String getToken(String code, HttpSession session) {
        String host = "https://nid.naver.com/oauth2.0/token";
        String access_token = "";
        String refresh_token = "";

        /* 세션 유효성 검증을 위하여 난수를 생성 */
        String state = UUID.randomUUID().toString();

        /* 생성한 난수 값을 session에 저장 */
        session.setAttribute("state",state);
        try {
            URL url = new URL(host);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true); // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=uFF96bkwIoIU1ZNfOobf");
            sb.append("&client_secret=6qC4U0iUqS");
            sb.append("&code=" + code);
            sb.append("&state=" + state);

//            sb.append("&redirect_uri=http://localhost:4000/oauth/login/kakao"); //프 서버로 바꾸기


            bw.write(sb.toString());
            bw.flush();
            System.out.println("통신 요청 전");
            //결과 코드 200이면 통신 성공임!
            int responseCode = urlConnection.getResponseCode();
            log.info("responseCode = ", responseCode);

            //요청 통해 얻은 JSON타입 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.info("response body ={}", result);

            //Json 파싱 : Gson라이브러리에 포함된 클래스로 JSON 파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement elem = parser.parse(result);

            access_token = elem.getAsJsonObject().get("access_token").getAsString();
            refresh_token = elem.getAsJsonObject().get("refresh_token").getAsString();

            log.info("refresh_token ={}", refresh_token);
            log.info("access_token ={}", access_token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_token;
    }

    public UserList getNaverUserList(String token) {
        UserList userList = new UserList();

        String reqURL = "https://openapi.naver.com/v1/nid/me";

        try{
            URL url = new URL(reqURL);  // 1. url객체 만들기
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // 2. url에서 url connection 만들기
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + token);

            // 키값, 속성 적용
            int responseCode = conn.getResponseCode();  // 서버에서 보낸 http 상태 코드 반환
            log.info("responseCode 확인 ={}", responseCode);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            // 버퍼를 사용하여 읽은 것
            String line = "";
            String result = "";
            while((line = br.readLine()) != null){
                result += line;
            }
            log.info("respone body ={}", result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject response = element.getAsJsonObject().get("response").getAsJsonObject();

            String nickname = response.get("nickname").getAsString();
            String email = response.get("email").getAsString();

            userList.setUserEmail(email);
            userList.setUserNm(nickname);

            UserList findUser = userRepository.findByUserEmail(email);

            if(findUser == null){
                System.out.println("등록된 회원 아님");
                userRepository.save(userList);
            }

        } catch(Exception e){
            e.printStackTrace();
        }

        return userList;
    }
}
