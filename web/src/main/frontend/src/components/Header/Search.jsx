import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import axios from "axios";
import NoImage from "../Image/no_img.png";

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


    const goWrite = () => {
        navigate("/write")
    }

    const userName = sessionStorage.getItem("userNm")

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

    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
    };

    const handleSellentRead = (sellIdx) => {
        navigate(`/sellentRead/${sellIdx}`); //sellIdx에 해당하는 글 읽기 페이지 이동
    }

    const images = "/images/";

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

                        <CenterSearch
                            type="text"
                            placeholder=" * 재능검색"
                            value={searchText}
                            onChange={handleSearchChange}
                        />

                        {/* <SearchEnter>버튼</SearchEnter> */}
                        <CenterHalfTop>
                            <CenterTop>재능판매</CenterTop>
                            <CenterContents>
                                {sellList.length > 0 && sellList
                                    .filter((item) => item.sellTitle.includes(searchText))
                                    .map((noItem, index) => {
                                        return (
                                            <CenterBoardBind key={noItem.sellIdx}>
                                                <CenterBoard>
                                                    {
                                                        noItem.uploadedFileNames == null ?
                                                            <BoardImg src={NoImage} alt="No Image" />
                                                            : <BoardImg img src={images + noItem.uploadedFileNames} alt="No Image" />
                                                    }
                                                    <BoardTitle onClick={() => handleSellentRead(noItem.sellIdx)}>
                                                        {noItem.sellTitle.length > 6
                                                            ? `${noItem.sellTitle.slice(0, 6)}...`
                                                            : noItem.sellTitle}
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

                        <CenterHalfBottom>
                            <CenterTop>재능구매</CenterTop>

                            <CenterContents>
                                {purList.length > 0 && purList
                                    .filter((item) => item.sellTitle.includes(searchText))
                                    .map((purItem, index) => {
                                        return (
                                            <CenterBoardBind key={purItem.sellIdx}>
                                                <CenterBoard>
                                                    {
                                                        purItem.uploadedFileNames == null ?
                                                            <BoardImg src={NoImage} alt="No Image" />
                                                            : <BoardImg img src={images + purItem.uploadedFileNames} alt="No Image" />
                                                    }
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
    border: 2px solid black;
    border-bottom: none;
    margin: 0 auto;
    margin-top: 4vh;
    background-color: lightgrey;
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

const CenterSearch = styled.input`
    width: 70%;
    height: 4vh;
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
    font-weight: bold;
    display: flex;
    align-items: center;
`

const CenterHalfTop = styled.div`
    width: 100%;
    height: 36vh;
    /* border: 2px solid black; */
    margin-top: 1em;
    border-top: 2px solid black;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const CenterHalfBottom = styled.div`
    width: 100%;
    height: 36vh;
    /* border: 2px solid black; */
    border-top: 2px solid black;
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
    width: 80%;
    height: 20vh;
    border: 2px solid black;
    margin-top: 2rem;
    margin-left: 5rem;
    /* margin-left: 1rem; */
`

const BoardImg = styled.img`
    width: 100%;
    height: 15vh;
    object-fit: cover;
`

const BoardTitle = styled.div`
    width: 100%;
    height: 4vh;
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