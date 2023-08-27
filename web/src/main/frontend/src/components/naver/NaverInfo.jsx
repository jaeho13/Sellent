import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverInfo = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    useEffect(() => {
        //naver 로그인 요청을 보낼 URL
        const url = `/login/naver/userList?token=${token}`;

        //axios를 사용하여 서버에 요청 보내기
        axios
            .get(url)
            .then((res) => {
                const userEmail = res.data.userList.userEmail;
                const userNick = res.data.userList.userNm;
                // 요청이 성공한 경우 서버 응답을 처리할 수 있습니다.
                navigate("/exam")
                sessionStorage.setItem("userEmail", userEmail);
                sessionStorage.setItem("userNm", userNick);
                console.log(userEmail, userNick)
            })
            .catch((error) => {
                //요청이 실패한 경우 에러를 처리할 수 있습니다.
                console.log("요청실패")
            });
    }, [token]); //code가 변경될 때마다 useEffect 실행
}

export default NaverInfo;
