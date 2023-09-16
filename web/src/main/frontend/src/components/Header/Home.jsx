import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Home = () => {

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

    const handleSellentRead = (sellIdx) => {
        navigate(`/sellentRead/${sellIdx}`); //sellIdx에 해당하는 글 읽기 페이지 이동
    }

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
                        <CenterTop>재능판매</CenterTop>

                        <CenterHalfTop>
                            <LiveChapter>실시간 인기글</LiveChapter>

                            <CenterContents>
                                {likeList.length > 0 && likeList.map((item, index) => {
                                    return (
                                        <CenterBoardBind key={item.sellIdx}>
                                            <CenterBoard>
                                                <BoardImg>
                                                    이미지 넣기
                                                </BoardImg>
                                                <BoardTitle onClick={() => handleSellentRead(item.sellIdx)}>
                                                    {item.sellTitle}
                                                    <BoardLike>
                                                        <FcLike />
                                                        <LikeScore>
                                                            {item.sellLike}
                                                        </LikeScore>
                                                    </BoardLike>
                                                </BoardTitle>
                                            </CenterBoard>
                                        </CenterBoardBind>
                                    );
                                })}
                            </CenterContents>
                        </CenterHalfTop>

                        <Chapter>전체글</Chapter>
                        <CenterHalfBottom>

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
                        </CenterHalfBottom>



                    </Center>

                    <Right>
                        <RightTop>재능구매</RightTop>
                        {purList.length > 0 && purList.map((purItem, index) => {
                            return (
                                <RightBoard key={purItem.sellIdx}>
                                    {purItem.sellTitle}
                                </RightBoard>

                            )
                        })}
                    </Right>
                </Bind>
            </Back>
        </>
    );
}

export default Home;

const Window = styled.div`
    width: 85%;
    height: 3rem;
    border: 2px solid black;
    margin: 0 auto;
    margin-top: 4vh;
    background-color: lightgrey;
`

const Close = styled.div`
    font-size: 3rem;
    display: flex;
    justify-content: right;
`

const Back = styled.div`
    width: 85%;
    height: 85vh;
    /* border: 2px solid green; */
    margin: 0 auto;
    box-shadow: 1em 1em 1em 1em #6E6E6E;
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
    
    @media (max-width: 1280px) {
        /* 화면 너비가 1280px 미만일 때 스타일 적용 */
        font-size: 1.5em; /* 글씨 크기를 줄임 */
    }
    
    @media (max-width: 900px) {
        /* 화면 너비가 1280px 미만일 때 스타일 적용 */
        font-size: 1em; /* 글씨 크기를 줄임 */
    }
`

const Cash = styled.div`
    width: 80%;
    height: 3vh;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 3em;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1400px) {
        /* 화면 너비가 1280px 미만일 때 스타일 적용 */
        font-size: 1.5em; /* 글씨 크기를 줄임 */
    }
    
    @media (max-width: 1080px) {
        /* 화면 너비가 1280px 미만일 때 스타일 적용 */
        font-size: 1em; /* 글씨 크기를 줄임 */
    }
`

const Name = styled.div`
    width: 80%;
    height: 3vh;
    border: 2px solid red;
    margin: 0 auto;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1280px) {
        /* 화면 너비가 1280px 미만일 때 스타일 적용 */
        font-size: 1.5em; /* 글씨 크기를 줄임 */
    }
    
    @media (max-width: 900px) {
        /* 화면 너비가 1280px 미만일 때 스타일 적용 */
        font-size: 1em; /* 글씨 크기를 줄임 */
    }
`

const Center = styled.div`
    width: 60%;
    height: 85vh;
    border: 2px solid red;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
    background-color: white;
`

const CenterHalfTop = styled.div`
    width: 95%;
    height: 35vh;
    /* border: 2px solid black; */
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const CenterHalfBottom = styled.div`
    width: 100%;
    height: 35vh;
    /* border: 2px solid black; */
    /* margin-top: 1em; */
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const CenterTop = styled.div`
    width: 50%;
    height: 5vh;
    /* border: 2px solid black; */
    font-size: 2.5rem;
    margin-left: 1rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    font-weight: bolder;
`

const LiveChapter = styled.div`
    width: 50%;
    height: 5vh;
    /* border: 2px solid black; */
    font-size: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
`

const Chapter = styled.div`
    width: 50%;
    height: 5vh;
    /* border: 2px solid black; */
    font-size: 2rem;
    margin-left: 1rem;
    /* margin-top: 1rem; */
    display: flex;
    align-items: center;
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
    width: 30%;
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
    cursor: pointer;
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


const ScrollBind = styled.div`
    display: flex;
    justify-content: column;
    justify-content: space-around;
    margin-bottom: 2rem;
`

const Scroll = styled.div`
    width: 25%;
    height: 20vh;
    border: 2px solid blue;
    margin-top: 1rem;
    margin-left: 1rem;
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
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
`

const RightBoard = styled.div`
    width: 80%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2rem;
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
`