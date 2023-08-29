import React from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillCloseCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import Example from "./example";

const MyPage = () => {

    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/login")
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
                        <LeftBoardTitle>메인화면</LeftBoardTitle>
                        <LeftBoard onClick={goLogin} >재능판매</LeftBoard>
                        <LeftBoard onClick={goLogin} >재능구매</LeftBoard>
                        <Cash>25,000원</Cash>
                        <Name>이재호</Name>
                    </Left>

                    <Center>

                        <CenterTop>닉네임</CenterTop>

                        <DetailsBind>
                            <BuyDetails>재능 구매 내역</BuyDetails>
                            <SellDetails>재능 판매 내역</SellDetails>
                            <Favorite>재능 즐겨찾기</Favorite>
                        </DetailsBind>

                        <DetailsBind>
                            <Review>받은 후기</Review>
                            <Charege>포인트 충전</Charege>
                        </DetailsBind>

                        <Where>판매 지역</Where>
                        <Example />

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

export default MyPage;

const Window = styled.div`
    width: 85%;
    height: 3rem;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 4vh;
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
    margin-top: 18rem;
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