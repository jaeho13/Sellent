import React from "react";
import styled from "styled-components";
import KakaoLogin from "../kakao/KakaoLogin";
import NaverLogin from "../naver/NaverLogin";

const Login = () => {
    return (
        <>
            <Back>
                <KakaoLogin />
                <NaverLogin />
            </Back>
        </>
    );
}

export default Login;

const Back = styled.div`
    width: 85%;
    height: 85vh;
    /* border: 2px solid green; */
    margin: 0 auto;
    margin-top: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

