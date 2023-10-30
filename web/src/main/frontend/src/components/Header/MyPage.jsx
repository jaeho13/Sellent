import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import axios from "axios";
import NoImage from "../Image/no_img.png";

const MyPage = () => {

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

    const goBuyList = () => {
        navigate("/buylist")
    }

    const goBuySuccess = () => {
        navigate("/buysuccess")
    }

    const userName = sessionStorage.getItem("userNm")

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
                        <LeftTop onClick={goHome}>SELLENT</LeftTop>
                        <LeftBoardTitle onClick={goLogin}>로그인</LeftBoardTitle>
                        <LeftBoard onClick={goWrite}>재능판매</LeftBoard>
                        <LeftBoard onClick={goSearch} >재능검색</LeftBoard>
                        <LeftBoard onClick={goMypage} >마이페이지</LeftBoard>
                        <Name>{userName}</Name>
                    </Left>

                    <Center>
                        <CenterTop>마이페이지</CenterTop>
                        <CenterHalfTop>
                            <DetailsBind>
                                <BuyDetails onClick={goBuySuccess}>재능 구매 내역</BuyDetails>
                                <SellDetails>재능 판매 내역</SellDetails>
                                <Favorite>재능 즐겨찾기</Favorite>
                            </DetailsBind>

                            <DetailsBind>
                                <Review>받은 후기</Review>
                                <Charge>포인트 충전</Charge>
                            </DetailsBind>
                        </CenterHalfTop>
                    </Center>

                    {/* <Right>
                        <RightTop>재능구매</RightTop>

                        <RightContentsBind>

                        </RightContentsBind>
                    </Right> */}
                </Bind>
            </Back>
        </>
    );
}

export default MyPage;

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
    height: 6vh;
    /* border: 2px solid black; */
    border-radius: 0.5em;
    margin: 0 auto;
    margin-top: 7em;
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
    width: 85%;
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
    height: 35vh;
    /* border: 2px solid black; */
    border-top: 2px solid black;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
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
    cursor: pointer;
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

const Charge = styled.div`
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
    width: 30%;
    height: 85vh;
    border: 2px solid black;
    border-top: none;
    border-right: none;
    background-color: white;
`

const RightTop = styled.div`
    width: 100%;
    height: 5vh;
    /* border: 2px solid black; */
    /* border-bottom: 2px solid black; */
    font-size: 2.5rem;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-weight: bolder;
    padding-top: 0.5em;
    padding-left: 0.5rem;
    color: #595959;
`

const RightContentsBind = styled.div`
    width: 100%;
    height: 77vh;
    /* border: 2px solid red; */
    border-top: 2px solid black;
    display: flex;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
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
    margin-top: 2em;
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