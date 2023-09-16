import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { useNavigate } from "react-router-dom";
import Example from "./Example";
import axios from "axios";

const Search = () => {

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

    const [likeList, setLikeList] = useState([]);

    useEffect(() => {
        const likeBoardLoad = async () => {
            try {
                const response = await axios.get("/list");
                setLikeList(response.data.likeList);
                console.log("좋아요 많은 글 불러오기 성공")
                console.log(response.data)
            } catch (error) {
                console.log("좋아요 많은 글 불러오기 실패");
            }
        };

        likeBoardLoad();
    }, []);

    const [sellList, setSellList] = useState([]);

    useEffect(() => {
        const boardLoad = async () => {
            try {
                const response = await axios.get("/list");
                setSellList(response.data.sellList);
                console.log("글 불러오기 성공")
                console.log(response.data)
            } catch (error) {
                console.log("글 불러오기 실패");
            }
        };

        boardLoad();
    }, []);

    const [purList, setPurList] = useState([]);

    useEffect(() => {
        const purchaseLoad = async () => {
            try {
                const response = await axios.get("/list");
                setPurList(response.data.purList);
                console.log("재능 구매 불러오기 성공")
                console.log(response.data)
            } catch (error) {
                console.log("재능 구매 불러오기 실패");
            }
        };

        purchaseLoad();
    }, []);


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

                        <CenterSearch type="text" placeholder="*재능검색" />
                        <SearchEnter>버튼</SearchEnter>
                        <CenterTop>재능판매</CenterTop>
                        <CenterHalfTop>
                            <CenterContents>
                                {sellList.length > 0 && sellList.map((noItem, index) => {
                                    return (
                                        <CenterBoardBind key={noItem.sellIdx}>
                                            <CenterBoard>
                                                <BoardImg>
                                                    이미지 넣기
                                                </BoardImg>
                                                <BoardTitle>
                                                    {noItem.sellTitle}
                                                    <BoardLike>
                                                        <FcLike />
                                                        <LikeScore>
                                                            {noItem.sellLike}
                                                        </LikeScore>
                                                    </BoardLike>
                                                </BoardTitle>
                                            </CenterBoard>
                                        </CenterBoardBind>
                                    );
                                })}
                            </CenterContents>
                        </CenterHalfTop>

                        <CenterTop>재능구매</CenterTop>
                        <CenterHalfBottom>

                            <CenterContents>
                                {purList.length > 0 && purList.map((purItem, index) => {
                                    return (
                                        <CenterBoardBind key={purItem.sellIdx}>
                                            <CenterBoard>
                                                <BoardImg>
                                                    이미지 넣기
                                                </BoardImg>
                                                <BoardTitle>
                                                    {purItem.sellTitle}
                                                    <BoardLike>
                                                        <FcLike />
                                                        <LikeScore>
                                                            {purItem.sellLike}
                                                        </LikeScore>
                                                    </BoardLike>
                                                </BoardTitle>
                                            </CenterBoard>
                                        </CenterBoardBind>
                                    );
                                })}
                            </CenterContents>
                        </CenterHalfBottom>



                    </Center>

                </Bind>
            </Back>
        </>
    );
}

export default Search;

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

const CenterSearch = styled.input`
    width: 70%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 1rem;
`

const SearchEnter = styled.button`
    width: 10%;
    height: 6vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 2rem;
`

const CenterTop = styled.div`
    width: 50%;
    height: 5vh;
    /* border: 2px solid black; */
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;
`

const CenterHalfTop = styled.div`
    width: 100%;
    height: 30vh;
    /* border: 2px solid black; */
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`


const CenterHalfBottom = styled.div`
    width: 100%;
    height: 30vh;
    /* border: 2px solid black; */
    /* margin-top: 1em; */
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const CenterContents = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: space-around; */
    justify-content: left;
    /* 넘치는 경우 줄바꿈 */
`

const CenterBoardBind = styled.div`
    width: 21%;
    display: flex;
    margin-bottom: 2rem;
`

const CenterBoard = styled.div`
    width: 100%;
    height: 20vh;
    border: 2px solid blue;
    margin-top: 2rem;
    margin-left: 5rem;
    /* margin-left: 1rem; */
`

const BoardImg = styled.div`
    width: 100%;
    height: 15vh;
    border: 2px solid red;
`

const BoardTitle = styled.div`
    width: 100%;
    height: 4vh;
    border: 2px solid red;
    font-size: 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BoardLike = styled.div`
    width: 30%;
    height: 4vh;
    /* border: 2px solid green; */
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LikeScore = styled.div`
    width: 60%;
    height: 4vh;
    /* border: 2px solid black; */
    display: flex;
    align-items: center;
`

const DetailsBind = styled.div`
    display: flex;
    justify-content: row;
`

const BuyDetails = styled.div`
    width: 28%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2em;
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
`

const SellDetails = styled.div`
    width: 28%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2em;
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
`

const Favorite = styled.div`
    width: 28%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2em;
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
`

const Review = styled.div`
    width: 28%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2em;
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
`


const Charege = styled.div`
    width: 28%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2em;
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
`

const Where = styled.div`
    width: 28%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2em;
    margin-top: 1em;
    margin-left: 1em;
    display: flex;
    align-items: center;
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