import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import Post from "./Post";
import axios from "axios";
import DaumPostcode from 'react-daum-postcode';
import Swal from "sweetalert2";

const SellentUpdate = () => {

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

    const userName = sessionStorage.getItem("userNm")

    const { sellIdx } = useParams();
    const [sellTitle, setSellTitle] = useState("");
    const [sellContent, setSellContent] = useState("");
    const [sellType, setSellType] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [sellLocation, setSellLocation] = useState("");
    const [sellentRead, setSellentRead] = useState({});
    const [locationX, setLocationX] = useState(null);
    const [locationY, setLocationY] = useState(null);

    useEffect(() => {
        const loadBoard = async () => {
            try {
                const response = await axios.get(`/sellent?sellIdx=${sellIdx}`);
                setSellentRead(response.data.Content);

                // 이전에 작성된 데이터 받아와 수정 가능하도록 셋팅
                setSellTitle(response.data.Content.sellTitle || '');
                setSellContent(response.data.Content.sellContent || '');
                setSellPrice(response.data.Content.sellPrice || '');
                setSellLocation(response.data.Content.sellLocation);
                setLocationX(response.data.Location.x);
                setLocationY(response.data.Location.y);
                console.log("게시물 불러오기 성공", sellentRead);
            } catch (error) {
                console.log("게시물 불러오기 실패", error);
            }
        };

        loadBoard();
    }, [sellIdx]);


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


    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });

    const [popup, setPopup] = useState(false);

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    const handleComplete = (data) => {
        setPopup(!popup);
    }

    const handleSubmitAddress = (e) => {
        if (e.target.value === '') {
            Swal.fire('주소를 선택해주세요.');
        } else {
            setSellLocation(e.target.value);
            Swal.fire('주소가 선택되었습니다.');
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!sellTitle || !sellContent) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        if (!sellPrice) {
            Swal.fire("가격을 입력해주세요.");
            return;
        }

        axios({
            url: "/sellent",
            method: "patch",
            data: {
                sellIdx,
                sellTitle,
                sellContent,
                sellPrice,
                sellLocation,
            },
        })
            .then((response) => {
                console.log(response);
                Swal.fire("수정되었습니다.");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const [tempFile, setTempFile] = useState();

    const [isLogin, setIsLogin] = useState(false); // 유저 로그인 상태 확인 용 > default : false


    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        const userIsLogin = userEmail !== null;

        setIsLogin(userIsLogin);
    }, []);

    function handleLogout() {
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem("userNm")
        setIsLogin(false);
        Swal.fire("로그아웃 되었습니다.")
        navigate("/")
    }

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
                        <LeftTop onClick={goHome}>SELLENT</LeftTop>
                        <LeftBoardTitle onClick={isLogin ? handleLogout : goLogin}>
                            {isLogin ? '로그아웃' : '로그인'}
                        </LeftBoardTitle>   <LeftBoard onClick={goWrite}>재능판매</LeftBoard>
                        <LeftBoard onClick={goSearch} >재능검색</LeftBoard>
                        <LeftBoard onClick={goMypage} >마이페이지</LeftBoard>
                        <Name>{userName}</Name>
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
                                {/* <CheckLabel>
                                    <CheckRadio
                                        type="checkbox"
                                        value="0"
                                        checked={sellType === "0"}
                                        onChange={(e) => setSellType(e.target.value)}
                                    />
                                    재능판매
                                </CheckLabel>
                                <CheckLabel>
                                    <CheckRadio
                                        type="checkbox"
                                        value="1"
                                        checked={sellType === "1"}
                                        onChange={(e) => setSellType(e.target.value)}
                                    />
                                    재능구매
                                </CheckLabel> */}
                            </RadioGroup>
                            <CenterTopBoard>글내용</CenterTopBoard>
                            <CenterBoard
                                type="text"
                                placeholder="*글을 입력하세요"
                                onChange={handleContentChange}
                                value={sellContent}
                            />
                            <ButtonBind>
                                <Price
                                    type="text"
                                    placeholder=" ₩"
                                    onChange={handlePriceChange}
                                    value={sellPrice}
                                />
                                <PictureUpload type="submit" >글올리기</PictureUpload>
                            </ButtonBind>


                            {/* <PictureBind>
                                <Picture
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        setTempFile(e.target.files);
                                    }}
                                />
                            </PictureBind> */}
                        </form>
                    </Center>

                    <Right>
                        <CenterWhere>거래 희망장소</CenterWhere>
                        <AddressBind>
                            <AddressLeft className="searchBtn" onClick={handleComplete}>주소 검색</AddressLeft>
                            <AddressRight className="selectBtn" onClick={handleSubmitAddress} value={enroll_company.address}>주소 선택</AddressRight>
                        </AddressBind>


                        {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
                        <AddressInput className="user_enroll_text" placeholder="주소 검색 후 선택 버튼을 눌러주세요." type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} />

                    </Right>
                </Bind>
            </Back >
        </>
    );
}

export default SellentUpdate;


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
    width: 55%;
    height: 85vh;
    border-right: 2px solid black;
    background-color: white;
    overflow: auto; /* 스크롤 추가 */
    overflow-x: hidden; /* 가로 스크롤 제거 */
`

const CenterTop = styled.div`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    margin-left: 0.5em;
    font-weight: bolder;
`

const CenterTopBoard = styled.div`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-left: 0.5em;
    font-weight: bolder;
`


const CenterTitle = styled.input`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    margin-left: 0.5em;
`

const CenterBoard = styled.textarea`
    width: 90%;
    height: 50vh;
    border: 2px solid black;
    font-size: 2.5em;
    display: flex;
    margin-top: 0.5em;
    margin-left: 0.6em;
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
    border: 2px solid black;
    margin-left: 0.6em;
    font-size: 2rem;
    display: flex;
    align-items: center;
`

const PictureUpload = styled.button`
    width: 15%;
    height: 5vh;
    border: 2px solid black;
    margin-left: 9em;
    margin-bottom: 1em;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const ButtonBind = styled.div`
    display: flex;
    justify-content: row;
    margin-top: 1em;
`

const Price = styled.input`
    width: 50%;
    height: 5vh;
    border: 2px solid black;
    margin-left: 0.7em;
    margin-bottom: 1em;
    font-size: 1.8em;
    display: flex;
    align-items: center;
    font-weight: bold;
`

const Upload = styled.button`
    width: 15%;
    height: 5vh;
    border: 2px solid red;
    font-size: 1.5em;
    margin-left: 2.7em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
`

const Cancel = styled.button`
    width: 15%;
    height: 5vh;
    border: 2px solid red;
    font-size: 1.5em;
    margin-left: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
`

const Right = styled.div`
    width: 30%;
    height: 85vh;
    /* border: 2px solid blue; */
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
    border: 2px solid black;
    font-size: 2.5em;
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    margin-left: 0.5em;
`

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

const CheckRadio = styled.input`
    border: 2px solid black;
    width: 10%;
    height: 2em;
    display: flex;
`

const CheckLabel = styled.label`
    width: 30%;
    border: 2px solid black;
    display: flex;
    align-items: center;
    font-size: 1.5em;
    margin-left: 0.2em;
`

const AddressBind = styled.div`
    width: 100%;
    display: flex;
    margin: 0 auto;
`

const AddressLeft = styled.button`
    width: 30%;
    height: 5vh;
    border: 2px solid black;
    font-size: 1.5em;
    margin-top: 0.5em;
    margin-left: 0.8em;
    cursor: pointer;
`

const AddressRight = styled.button`
    width: 30%;
    height: 5vh;
    border: 2px solid black;
    font-size: 1.5em;
    margin-top: 0.5em;
    margin-left: 1em;
    /* margin-right: 1em; */
    cursor: pointer;
`

const AddressInput = styled.input`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    display: flex;
    margin: 0 auto;
    margin-top: 0.5em;
    font-size: 1.5em;
`