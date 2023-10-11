import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import axios from "axios";
import NoImage from "../Image/no_img.png";

const BuyList = () => {

    const navigate = useNavigate();


    const goHome = () => {
        navigate("/")
    }

    const goLogin = () => {
        navigate("/login")
    }

    const goWrite = () => {
        navigate("/write")
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

    // URL에서 "pg_token" 파라미터 가져오기
    const pg_token = new URL(window.location.href).searchParams.get("pg_token");
    console.log(pg_token);

    useEffect(() => {
        // 결제 성공시 pg_token을 카카오페이 서버에서 반환 받고,
        // 받은 URL에서 pg_token을 꺼내와서 서버로 보낸다.
        const url = `/kakaoPaySuccess?pg_token=${pg_token}&sellIdx=${sellIdx}`;

        // axios를 사용하여 서버에 요청 보내기
        axios
            .get(url)
            .then((response) => {
                // 요청이 성공한 경우 서버 응답을 처리할 수 있습니다.
                console.log("서버 응답:", response.data);
            })
            .catch((error) => {
                // 요청이 실패한 경우 에러를 처리할 수 있습니다.
                console.error("에러 발생:", error);
            });
    }, [pg_token]); // pg_token이 변경될 때마다 useEffect 실행

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
                        <LeftTop onClick={goHome}>SELLENT</LeftTop>
                        <LeftBoardTitle onClick={goLogin}>로그인</LeftBoardTitle>
                        <LeftBoard onClick={goWrite}>재능판매</LeftBoard>
                        <LeftBoard onClick={goSearch} >재능검색</LeftBoard>
                        <LeftBoard onClick={goChat} >채팅내역</LeftBoard>
                        <LeftBoard onClick={goMypage} >마이페이지</LeftBoard>
                        <Cash>25,000원</Cash>
                        <Name>이재호</Name>
                    </Left>

                    <Center>
                        <CenterTop>재능구매내역</CenterTop>
                        <CenterHalfTop />

                        <CenterBoardTopic>재능 구매명
                            <CenterBoardPriceTopic>가격</CenterBoardPriceTopic>
                        </CenterBoardTopic>

                        <CenterBoard>너 사람 무시하지마
                            <CenterBoardPrice>$2000</CenterBoardPrice>
                        </CenterBoard>

                        <CenterBoard>너 사람 무시하지마
                            <CenterBoardPrice>$2000</CenterBoardPrice>
                        </CenterBoard>

                    </Center>

                    <Right>
                        <RightTop>재능구매</RightTop>

                        <RightContents>
                            {purList.length > 0 && purList.map((purItem, index) => {
                                return (
                                    <RightBoardBind key={purItem.sellIdx}>
                                        <RightBoard>
                                            <BoardImg>
                                                <img src={NoImage} alt="No Image" />
                                            </BoardImg>
                                            <BoardTitle onClick={() => handleSellentRead(purItem.sellIdx)}>
                                                {purItem.sellTitle.length > 6
                                                    ? `${purItem.sellTitle.slice(0, 6)}...`
                                                    : purItem.sellTitle}
                                                <BoardLike>
                                                    <FcLike />
                                                    <LikeScore>
                                                        {purItem.sellLike}
                                                    </LikeScore>
                                                </BoardLike>
                                            </BoardTitle>
                                        </RightBoard>
                                    </RightBoardBind>
                                )
                            })}
                        </RightContents>
                    </Right>
                </Bind>
            </Back>
        </>
    );
}

export default BuyList;

const Window = styled.div`
    width: 85%;
    height: 3rem;
    border: 2px solid black;
    border-bottom: none;
    margin: 0 auto;
    margin-top: 4vh;
    background-color: #dcdcdc;
    box-shadow: 1em 1em 1em 1em #6E6E6E;
`

const Close = styled.div`
    font-size: 3rem;
    display: flex;
    justify-content: right;
`

const Back = styled.div`
    width: 85%;
    height: 85vh;
    border: 2px solid black;
    border-top: none;
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
    /* border: 2px solid black; */
    border-right: 2px solid black;
    background-color: white;
`

const LeftTop = styled.div`
    width: 100%;
    height: 13vh;
    border-bottom: 2px solid black;
    font-size: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: 'Lilita One', cursive;
`

const LeftBoardTitle = styled.div`
    width: 80%;
    height: 6vh;
    border: 2px solid black;
    border-radius: 0.5em;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const LeftBoard = styled.div`
    width: 80%;
    height: 6vh;
    border: 2px solid black;
    border-radius: 0.5em;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
    border: 2px solid black;
    margin: 0 auto;
    margin-top: 4em;
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
    border: 2px solid black;
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
    width: 55%;
    height: 85vh;
    /* border: 2px solid red; */
    background-color: white;
`

const CenterTop = styled.div`
    width: 50%;
    height: 5vh;
    /* border: 2px solid black; */
    font-size: 2.5rem;
    /* margin-left: 1rem; */
    padding-left: 0.5em;
    margin-top: 0.5em;
    display: flex;
    align-items: center;
    font-weight: bolder;
    color: #595959;
    font-family: 'Do Hyeon', sans-serif;
`
const CenterHalfTop = styled.div`
    width: 100%;
    height: 3.5vh;
    border-top: 2px solid black;
`

const CenterBoardTopic = styled.div`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    margin: 0 auto;
    margin-bottom: 1em;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CenterBoardPriceTopic = styled.div`
    width: 20%;
    height: 5vh;
    border-left: 2px solid black;
    display: flex;
    justify-content: center;
`


const CenterBoard = styled.div`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    margin: 0 auto;
    margin-top: 0.5em;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CenterBoardPrice = styled.div`
    width: 20%;
    height: 5vh;
    border-left: 2px solid black;
    display: flex;
    justify-content: center;
`


const Right = styled.div`
    width: 30%;
    height: 85vh;
    border: 2px solid black;
    border-top: none;
    border-right: none;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
    background-color: white;
`

const RightTop = styled.div`
    width: 100%;
    height: 5vh;
    /* border: 2px solid black; */
    border-bottom: 2px solid black;
    font-size: 2.5rem;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-weight: bolder;
    padding-top: 0.5em;
    padding-left: 0.5rem;
    color: #595959;
`

const RightContents = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    /* 넘치는 경우 줄바꿈 */
`

const RightBoardBind = styled.div`
    width: 50%;
    display: flex;
    margin-bottom: 2rem;
`

const RightBoard = styled.div`
    width: 100%;
    height: 20vh;
    border: 2px solid black;
    margin-top: 2rem;
    /* margin-left: 5rem; */
    margin-left: 1rem;
    margin-right: 1rem;
`


const BoardImg = styled.div`
    width: 100%;
    height: 15vh;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    /* border: 2px solid red; */
`

const BoardTitle = styled.div`
    width: 100%;
    height: 4vh;
    /* border: 2px solid red; */
    border-top: 2px solid black;
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
    width: 30%;
    height: 4vh;
    /* border: 2px solid black; */
    display: flex;
    align-items: center;
`