import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SellentRead = () => {

    const navigate = useNavigate();


    const goHome = () => {
        navigate("/")
    }

    const goLogin = () => {
        navigate("/login")
    }

    const goMypage = () => {
        navigate("/mypage")
    }

    const goChat = () => {
        navigate("/chatting")
    }

    const goBack = () => {
        navigate("/background")
    }

    const goSearch = () => {
        navigate("/search")
    }

    const { sellIdx } = useParams();
    const [sellentRead, setSellentRead] = useState({});

    useEffect(() => {
        const loadBoard = async () => {
            try {
                const response = await axios.get(`/sellent?sellIdx=${sellIdx}`);
                setSellentRead(response.data.Content);
                console.log("게시물 불러오기 성공", sellentRead);
            } catch (error) {
                console.log("게시물 불러오기 실패", error);
            }
        };

        loadBoard();
    }, [sellIdx]);

    const type = sellentRead.sellType;
    const test = "";

    return (
        <>
            <Window>
                <Close>
                    <AiFillCloseCircle onClick={goBack} />
                </Close>
            </Window>


            <Back>
                <Bind>
                    <Left>
                        <LeftTop>SELLENT</LeftTop>
                        <LeftBoardTitle onClick={goHome} >메인화면</LeftBoardTitle>
                        <LeftBoard onClick={goLogin} >재능판매</LeftBoard>
                        <LeftBoard onClick={goSearch} >재능검색</LeftBoard>
                        <LeftBoard onClick={goChat} >채팅</LeftBoard>
                        <LeftBoard onClick={goMypage} >마이페이지</LeftBoard>
                        <Cash>25,000원</Cash>
                        <Name>이재호</Name>
                    </Left>

                    <Center>
                        <CenterTopic>{type === 0 ? "재능 판매일까 구매일까 재호야" : "재능 구매일까 판매일까 재호야"}</CenterTopic>
                        <CenterTitle>{sellentRead.sellTitle}</CenterTitle>
                        <CenterContents>{sellentRead.sellContent}</CenterContents>
                    </Center>
                </Bind>
            </Back>
        </>
    );
}

export default SellentRead;

const Window = styled.div`
    width: 85%;
    height: 3rem;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 4vh;
    background-color: lightgrey;
`

const Back = styled.div`
    width: 85%;
    height: 85vh;
    border: 2px solid green;
    margin: 0 auto;
    /* margin-top: 8vh; */
`

const Close = styled.div`
    font-size: 3rem;
    display: flex;
    justify-content: right;
`


const Bind = styled.div`
    display: flex;
    justify-content: row;
`

const Left = styled.div`
    width: 15%;
    height: 85vh;
    border: 2px solid black;
    background-color: white;
`

const LeftTop = styled.div`
    width: 100%;
    height: 13vh;
    border: 2px solid black;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LeftBoardTitle = styled.div`
    width: 80%;
    height: 6vh;
    border: 2px solid blue;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const LeftBoard = styled.div`
    width: 80%;
    height: 6vh;
    border: 2px solid blue;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const Cash = styled.div`
    width: 80%;
    height: 7vh;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 5rem;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Name = styled.div`
    width: 80%;
    height: 4vh;
    border: 2px solid red;
    margin: 0 auto;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Center = styled.div`
    width: 85%;
    height: 85vh;
    border: 2px solid red;
    background-color: white;
`

const Chat = styled.div`
    width: 90%;
    height: 65vh;
    border: 2px solid black;
    margin: 0 auto;
    margin-top: 5rem;
    display: flex;
`

const ChatInput = styled.input`
    width: 90%;
    height: 5vh;
    border: 2px solid blue;
    margin: 0 auto;
    display: flex;
    font-size: 2em;
`

const Right = styled.div`
    width: 25%;
    height: 85vh;
    border: 2px solid blue;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
    background-color: white;
`

const RightTop = styled.div`
    width: 40%;
    height: 8vh;
    /* border: 2px solid black; */
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
`

const RightBoard = styled.div`
    width: 60%;
    height: 20vh;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`

const CenterTopic = styled.div`
    width: 50%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-left: 1em;
    font-weight: bolder;
`

const CenterTitle = styled.div`
    width: 80%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-left: 1em;
`

const CenterContents = styled.div`
    width: 80%;
    height: 50vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    margin-top: 1em;
    margin-left: 1em;
`