import React from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

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
                        <CenterTitle type="text" placeholder="*제목을 입력하세요" />

                        <HashBind>
                            <CenterHash>
                                <HashTag type="checkbox" />
                                안녕하세요
                            </CenterHash>
                            <CenterHash>
                                <HashTag type="checkbox" />
                                안녕하세요
                            </CenterHash>
                            <CenterHash>
                                <HashTag type="checkbox" />
                                안녕하세요
                            </CenterHash>
                        </HashBind>

                        <CenterTop>글내용</CenterTop>
                        <CenterBoard type="text" placeholder="*글을 입력하세요" />

                        <PictureBind>
                            <Picture placeholder="*파일을 올리세요" />
                            <PictureUpload>찾아보기</PictureUpload>
                        </PictureBind>

                        <ButtonBind>
                            <Upload>글올리기</Upload>
                            <Cancle>취소하기</Cancle>
                        </ButtonBind>

                    </Center>

                    <Right>
                        <RightTop>재능구함</RightTop>
                        <RightBoard />
                        <RightBoard />
                        <RightBoard />
                        <RightBoard />
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
    width: 60%;
    height: 85vh;
    border: 2px solid red;
    background-color: white;
`

const CenterTop = styled.div`
    width: 50%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 2rem;
    display: flex;
    align-items: center;
`

const CenterTitle = styled.input`
    width: 90%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 2rem;
`

const HashBind = styled.div`
    display: flex;
    justify-content: row;
`

const CenterHash = styled.div`
    width: 20%;
    height: 5vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 2rem;
    display: flex;
    align-items: center;
`

const HashTag = styled.input`
    width: 20%;
    height: 3vh;
`

const CenterBoard = styled.textarea`
    width: 90%;
    height: 30vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-top: 1rem;
    margin-left: 2rem;
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
    margin-left: 2rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
`

const PictureUpload = styled.div`
    width: 15%;
    height: 5vh;
    border: 2px solid green;
    margin-left: 1.5em;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonBind = styled.div`
    display: flex;
    justify-content: right;
    margin-top: 3em;
`

const Upload = styled.div`
    width: 15%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Cancle = styled.div`
    width: 15%;
    height: 5vh;
    border: 2px solid red;
    font-size: 2em;
    margin-left: 1em;
    margin-right: 2em;
    display: flex;
    justify-content: center;
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