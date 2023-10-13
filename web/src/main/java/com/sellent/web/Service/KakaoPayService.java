package com.sellent.web.Service;

import com.sellent.web.Dto.KakaoPayReadyDTO;
import com.sellent.web.Dto.KakaoPayResultDTO;
import com.sellent.web.Entiity.Selling;
import com.sellent.web.Entiity.SellingList;
import com.sellent.web.Repository.SellingListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Log
public class KakaoPayService {

    @Autowired
    SellingService sellingService;

    @Autowired
    SellingListRepository sellingListRepository;

    private static final String Host = "https://kapi.kakao.com";

    @Value("#{sellentProperty['kakao.admin']}")
    private String kakaoAdminKey;

    private KakaoPayReadyDTO kakaoPayReadyDTO;
    private KakaoPayResultDTO kakaoPayResultDTO;

    public String kakaoPayReady(String num, String userEmail) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory()); // 정확한 에러 파악을 위해 생성

        int sellIdx = Integer.parseInt(num);
        Selling selling = sellingService.findContent(sellIdx);
        String price = String.valueOf(selling.getSellPrice());
        String sellIdxToString = String.valueOf(sellIdx);

        // Server Request Header : 서버 요청 헤더
        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "KakaoAK " + kakaoAdminKey); // 어드민 키
        headers.add("Accept", "application/json");
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Server Request Body : 서버 요청 본문
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();

        params.add("cid", "TC0ONETIME"); // 가맹점 코드 - 테스트용
        params.add("partner_order_id", sellIdxToString); // 주문 번호
        params.add("partner_user_id", userEmail); // 회원 아이디 uNick
        params.add("item_name", "sellent"); // 상품 명
        params.add("quantity", "1"); // 상품 수량
        params.add("total_amount", price); // 상품 가격 ---- sPrice
        params.add("tax_free_amount", "1000"); // 상품 비과세 금액
        params.add("approval_url", "http://localhost:3000/buylist"); // 성공시 url
        params.add("cancel_url", "http://localhost:3000/"); // 실패시 url -- 실패했습니다 > 뒤로가기
        params.add("fail_url", "http://localhost:3000/"); // 실패시 url --

        // 헤더와 바디 붙이기
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            kakaoPayReadyDTO = restTemplate.postForObject(new URI(Host + "/v1/payment/ready"), body,
                    KakaoPayReadyDTO.class);

            log.info("받은 정보 1 " + kakaoPayReadyDTO);
            String result = kakaoPayReadyDTO.getNext_redirect_pc_url();

            return result;
        } catch (RestClientException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }


    public KakaoPayResultDTO kakaoPayInfo(String pg_token, String userEmail, String num) {

        log.info("KakaoPayInfoVO............................................");

        RestTemplate restTemplate = new RestTemplate();

        int sellIdx = Integer.parseInt(num);
        Selling selling = sellingService.findContent(sellIdx);
        String price = String.valueOf(selling.getSellPrice());
        String sellIdxToString = String.valueOf(sellIdx);

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + kakaoAdminKey); // 어드민 키
        headers.add("Accept", "application/json");
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();

        params.add("cid", "TC0ONETIME");
        params.add("tid", kakaoPayReadyDTO.getTid());
        params.add("partner_order_id", sellIdxToString); // 주문 번호
        params.add("partner_user_id", userEmail); // 회원 아이디 uNick
        params.add("pg_token", pg_token);
        params.add("total_amount", price);

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            kakaoPayResultDTO = restTemplate.postForObject(new URI(Host + "/v1/payment/approve"), body,
                    KakaoPayResultDTO.class);

            log.info("받은 정보 2 " + kakaoPayResultDTO);

            SellingList sellingList = new SellingList();
            int sellOriginIdx = Integer.parseInt(kakaoPayResultDTO.getPartner_order_id());

            sellingList.setSellOriginIdx(sellOriginIdx);
            sellingList.setUserEmail(kakaoPayResultDTO.getPartner_user_id());
            sellingList.setAmount(kakaoPayResultDTO.getAmount().getTotal());
            sellingList.setSellDate(kakaoPayResultDTO.getApproved_at());

            sellingListRepository.save(sellingList);

            List<SellingList> list = sellingListRepository.findUserSellList(kakaoPayResultDTO.getPartner_user_id());
            System.out.println(kakaoPayResultDTO.getPartner_user_id() + "의 구매 정보 : " + list);

            return kakaoPayResultDTO;

        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }
}
