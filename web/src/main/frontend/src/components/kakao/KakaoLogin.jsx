import React from "react";
import styled from "styled-components";

const KakaoLogin = () => {

    const REST_API = process.env.REACT_APP_KAKAO_RESTAPI_KEY;

    const RE_DIRECT = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${RE_DIRECT}&response_type=code`;
    // open(
    //     `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&
    //     redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
    //     , "_self")

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL
    }


    return (
        <>
            <LoginButton onClick={handleLogin}>카카오 로그인</LoginButton>
        </>
    );
}

export default KakaoLogin;

const LoginButton = styled.div`
    width: 30%;
    height: 10rem;
    border: 5px solid #fdf6e4;
    color: #fdf6e4;
    font-size: 3rem;
    margin: 0 auto;
    /* margin-top: 5rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    background-color: black;
    cursor: pointer;
`