import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoPay = () => {

    const paySubmit = async (sellIdx) => {
        try {
            const response = await axios.post("/kakaoPay");
            console.log("결제 이동");
        } catch (error) {
            console.log("결제 이동 실패");
        }
    };

    return (
        <>
            <KakaoPayButton>결제하기</KakaoPayButton>
        </>
    );
}

export default KakaoPay;

const KakaoPayButton = styled.button`
    width: 15%;
    height: 5vh;
    border: 2px solid #595959;
    font-size: 1.5em;
    margin-left: 2.7em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
`