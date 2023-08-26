package com.sellent.web.Service;

import com.sellent.web.Entiity.UserList;
import com.sellent.web.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class KakaoService {

    @Autowired
    UserRepository userRepository;

    // (카카오 로그인)
    // 프론트에서 보내준 코드로 카카오에서 인증 토큰 얻어오기
    public String getToken(String code) {
        String access_token = "";
        String refresh_token = "";
        // 인가코드로 토큰받기
        String host = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(host);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true); // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=ee24b35eca48daeea571fe2b7a9dbb54");
            sb.append("&redirect_uri=http://localhost:3000/login/kakao"); // 프 서버로 바꾸기
            sb.append("&code=" + code);

            bw.write(sb.toString());
            bw.flush();

            // 결과 코드 200이면 통신 성공임!
            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            // 요청 통해 얻은 JSON타입 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body = " + result);

            // Json 파싱 : Gson라이브러리에 포함된 클래스로 JSON 파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement elem = parser.parse(result);

            access_token = elem.getAsJsonObject().get("access_token").getAsString();
            refresh_token = elem.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("refresh_token = " + refresh_token);
            System.out.println("access_token = " + access_token);

            br.close();
            bw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_token;
    }

    public UserList getUserInfo(String token) {
        UserList userList = new UserList();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try {
            URL url = new URL(reqURL); // 1. url객체 만들기
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // 2. url에서 url connection 만들기
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + token);

            // 키값, 속성 적용
            int responseCode = conn.getResponseCode(); // 서버에서 보낸 http 상태 코드 반환
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            // 버퍼를 사용하여 읽은 것
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            String nick = properties.getAsJsonObject().get("nickname").getAsString();

            userList = userRepository.findByUserEmail(email);

            if (userList == null) {
                System.out.println("등록된 회원 아님");

                // userInfo 객체 생성 및 초기화
                userList = new UserList();

                userList.setUserEmail(email);
                userList.setUserNm(nick);

                userRepository.save(userList);

                return userList;
            }

            userList.setUserEmail(email);
            userList.setUserNm(nick);

            System.out.println("유저 정보 " + userList);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return userList;
    }
}
