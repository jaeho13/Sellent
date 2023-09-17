import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Map from "./Map";

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
    const [sellentCommentRead, setSellentRCommentRead] = useState({});

    useEffect(() => {
        const loadBoard = async () => {
            try {
                const response = await axios.get(`/sellent?sellIdx=${sellIdx}`);
                setSellentRead(response.data.Content);
                setSellentRCommentRead(response.data.Comment);
                console.log("게시물 불러오기 성공", sellentRead);
            } catch (error) {
                console.log("게시물 불러오기 실패", error);
            }
        };

        loadBoard();
    }, [sellIdx]);


    const rightBoardRef = useRef(null);

    useEffect(() => {
        if (rightBoardRef.current) {
            rightBoardRef.current.style.height = rightBoardRef.current.scrollHeight + "px";
        }
    }, [sellentCommentRead]);

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
                        <CenterTopic>{sellentRead.sellType === 0 ? "재능 판매" : "재능 구매"}</CenterTopic>
                        <CenterTitle>{sellentRead.sellTitle}</CenterTitle>
                        <CenterTitle>닉네임 : {sellentRead.userNm}</CenterTitle>
                        <CenterBottomBind>
                            <CenterContents>{sellentRead.sellContent}</CenterContents>
                        </CenterBottomBind>
                        <CenterWhere>거래 희망장소</CenterWhere>
                        <Map />
                    </Center>

                    <RightBind>
                        <Right>
                            <RightTop>댓글</RightTop>
                            {sellentCommentRead.length > 0 && sellentCommentRead.map((Comment, index) => {
                                return (
                                    <RightBoard key={Comment.sellIdx} ref={rightBoardRef}>
                                        <RightBoardNick>
                                            닉네임 : {Comment.userNm}
                                        </RightBoardNick>
                                        {Comment.sellCmtContent}
                                    </RightBoard>
                                );
                            })}
                        </Right>

                        <RightBottomBind>
                            <RightBottom />
                            <RightComments>확인</RightComments>
                        </RightBottomBind>

                    </RightBind>
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
    width: 60%;
    height: 85vh;
    border: 2px solid red;
    background-color: white;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
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

const RightBind = styled.div`
    display: flex;
    flex-direction: column;
`

const Right = styled.div`
    width: 100%;
    height: 70vh;
    /* border: 2px solid blue; */
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
    background-color: white;
`

const RightBottomBind = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`

const RightBottom = styled.textarea`
    width: 80%;
    height: 14.5vh;
    /* border: 2px solid red; */
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
    background-color: white;
    resize: none;
    font-size: 2em;

`

const RightComments = styled.div`
    width: 20%;
    height: 15vh;
    /* border: 2px solid green; */
    background-color: white;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

`

const RightTop = styled.div`
    width: 100%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2.5em;
    margin-top: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
`

const RightBoard = styled.div`
    width: 90%;
    max-height: 100vh; /* 최대 높이 설정 */
    border: 2px solid red;
    font-size: 1.5em;
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    white-space: pre-wrap;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const RightBoardNick = styled.div`
    width: 100%;
    height: 3vh;
    font-size: 1em;
    display: flex;
    align-items: center;
`

const CenterTopic = styled.div`
    width: 80%;
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
    margin-top: 0.5em;
    margin-left: 1em;
`

const CenterBottomBind = styled.div`
    display: flex;
    flex-direction: row;
`

const CenterContents = styled.div`
    width: 80%;
    height: 50vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    margin-top: 0.5em;
    margin-left: 1em;
`

const CenterComments = styled.div`
    width: 20%;
    height: 50vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    margin-top: 1em;
    margin-left: 1em;
`

const CenterWhere = styled.div`
    width: 40%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    margin-left: 1em;
`