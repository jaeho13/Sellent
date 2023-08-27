import React from "react";
import styled from "styled-components";

const NaverLogin = () => {

    const REST_API = process.env.REACT_APP_NAVER_RESTAPI_KEY;

    const RE_DIRECT = process.env.REACT_APP_NAVER_REDIRECT_URI;

    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API}&redirect_uri=${RE_DIRECT}&response_type=code&state=asd`;

    const handleLogin = () => {
        window.location.href = NAVER_AUTH_URL
    }

    return (
        <>
            <LoginButton onClick={handleLogin}>네이버 로그인</LoginButton>
        </>
    );
}

export default NaverLogin;

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