import React from "react";
import styled from "styled-components";
import "../fonts/Font.css";

const Home = () => {
    return (
        <>
            <Back>
                <Bind>

                    <Left>
                        <LeftTop>로고</LeftTop>
                        <LeftBoard>메인화면</LeftBoard>
                        <LeftBoard>재능판매</LeftBoard>
                        <LeftBoard>재능구매</LeftBoard>
                    </Left>

                    <Center>
                        <CenterSearch type="text" placeholder="*재능검색" />
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

export default Home;

const Back = styled.div`
    width: 85%;
    height: 85vh;
    border: 2px solid green;
    margin: 0 auto;
    margin-top: 8vh;
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
`

const LeftBoard = styled.div`
    width: 80%;
    height: 8vh;
    border: 2px solid blue;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 2em;
`

const Center = styled.div`
    width: 60%;
    height: 85vh;
    border: 2px solid red;
`

const CenterSearch = styled.input`
    width: 70%;
    height: 8vh;
    border: 2px solid black;
    font-size: 2rem;
    margin-left: 3em;
    margin-top: 1em;
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
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    padding-top: 0.5em;
    padding-left: 0.5em;
`

const RightBoard = styled.div`
    width: 60%;
    height: 20vh;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`