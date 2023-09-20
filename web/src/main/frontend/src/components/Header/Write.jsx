import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import axios from "axios";

const Write = () => {

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


    const [purList, setPurList] = useState([]);
    const [locationX, setLocationX] = useState(null);
    const [locationY, setLocationY] = useState(null);

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

    const [sellTitle, setSellTitle] = useState("");
    const [sellContent, setSellContent] = useState("");
    const [sellType, setSellType] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [sellLocation, setSellLocation] = useState("");

    const handleTitleChange = (e) => {
        setSellTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setSellContent(e.target.value);
    };

    // 거래 금액
    const handlePriceChange = (e) => {
        setSellPrice(e.target.value);
    };
    // 거래 장소
    const handleLocationChange = (e) => {
        setSellLocation(e.target.value);
    };
    // 거래 타입
    const handleSellTypeChange = (e) => {
        setSellType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sellTitle || !sellContent) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        axios({
            url: "/sellent", //주소 넣어줘야합니당 흑흑
            method: "post",
            data: {
                sellTitle,
                sellContent,
                sellType,
                sellPrice,
                sellLocation,
            },
        })
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <>
            <Window>
                <Close>
                    <AiFillCloseCircle />
                </Close>
            </Window>

            <Back>
                <Bind>
                    <Left>
                        <LeftTop>SELLENT</LeftTop>
                        <LeftBoardTitle onClick={goHome}>메인화면</LeftBoardTitle>
                        <LeftBoard onClick={goLogin} >재능판매</LeftBoard>
                        <LeftBoard onClick={goLogin} >재능구매</LeftBoard>
                        <LeftBoard onClick={goChat} >채팅</LeftBoard>
                        <LeftBoard onClick={goMypage} >마이페이지</LeftBoard>
                        <Cash>25,000원</Cash>
                        <Name>이재호</Name>
                    </Left>

                    <Center>

                        <CenterTop>글제목</CenterTop>
                        <form onSubmit={handleSubmit}>
                            <CenterTitle
                                type="text"
                                placeholder="*제목을 입력하세요"
                                onChange={handleTitleChange}
                                value={sellTitle}
                            />
                        <RadioGroup>
                                    <label>
                                        <input
                                            type="radio"
                                            value="0"
                                            checked={sellType === "0"}
                                            onChange={(e) => setSellType(e.target.value)}
                                        />
                                        재능판매
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="1"
                                            checked={sellType === "1"}
                                            onChange={(e) => setSellType(e.target.value)}
                                        />
                                        재능구매
                                    </label>
                                </RadioGroup>

                            <CenterTop>글내용</CenterTop>
                            <CenterBoard
                                type="text"
                                placeholder="*글을 입력하세요"
                                onChange={handleContentChange}
                                value={sellContent}
                            />
                        <PictureBind>
                            <Picture placeholder="*파일을 올리세요" />
                                <PictureUpload>찾아보기</PictureUpload>
                            </PictureBind>

                            <ButtonBind>
                                <Price
                                    type="number"
                                    placeholder=" ₩"
                                    onChange={handlePriceChange}
                                    value={sellPrice}
                                />
                                <Upload type="submit">글올리기</Upload>
                                <Cancle>취소하기</Cancle>
                            </ButtonBind>
                        </form>
                    </Center>

                    <Right>
                        <CenterWhere>거래 희망장소</CenterWhere>
                        <Location
                            type="text"
                            onChange={handleLocationChange}
                            value={sellLocation}
                        />
                        <Map locationX="33.450701" locationY="126.570667" />
                    </Right>
                </Bind>
            </Back>
        </>
    );
}

export default Write;

const Window = styled.div`
    width: 85%;
    height: 3rem;
    border: 2px solid red;
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
    border: 2px solid green;
    margin: 0 auto;
    /* margin-top: 8vh; */
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
    height: 3vh;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 3em;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
`

const Center = styled.div`
    width: 55%;
    height: 85vh;
    border: 2px solid red;
    background-color: white;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const CenterTop = styled.div`
    width: 50%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 0.5em;
    display: flex;
    align-items: center;
`

const CenterTitle = styled.input`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 0.5em;
`

const CenterBoard = styled.textarea`
    width: 90%;
    height: 30vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 0.5em;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const PictureBind = styled.div`
    display: flex;
    justify-content: row;
    margin-top: 1rem;
`

const Picture = styled.input`
    width: 70%;
    height: 5vh;
    border: 2px solid blue;
    margin-left: 0.5em;
    font-size: 2rem;
    display: flex;
    align-items: center;
`

const PictureUpload = styled.div`
    width: 15%;
    height: 5vh;
    border: 2px solid green;
    margin-left: 1em;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const FileInput = styled.input`
  display: none;
`

const ButtonBind = styled.div`
    display: flex;
    justify-content: row;
    margin-top: 1em;
`

const Price = styled.input`
    width: 30%;
    height: 5vh;
    border: 2px solid black;
    margin-left: 0.5em;
    font-size: 1.8em;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-weight: bold;
`

const Upload = styled.button`
    width: 15%;
    height: 5.5vh;
    border: 3px solid red;
    font-size: 1.8em;
    margin-left: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
`

const Cancle = styled.div`
    width: 15%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2em;
    margin-left: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Right = styled.div`
    width: 30%;
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

const CenterWhere = styled.div`
    width: 90%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    margin-left: 0.5em;
`
// 거래 장소 inputBox
const Location = styled.input`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 0.5em;
`
// 재능 판매, 구매 라디오 버튼
const RadioGroup = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.5rem;
    margin-left: 0.5em;
    margin-top: 0.8em;
    color: #595959;
    label {
        margin-right: 1rem;
        input[type="radio"] {
        margin-right: 0.3rem;
        }
    }
`