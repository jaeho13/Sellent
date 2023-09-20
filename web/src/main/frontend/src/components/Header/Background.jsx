import React from "react";
import styled from "styled-components";
import "../fonts/Font.css";
import { AiFillWindows } from "react-icons/ai"
import { SlMagnifier } from "react-icons/sl"
import { FaEdge } from "react-icons/fa"
import { BsBrowserChrome } from "react-icons/bs"
import { RiKakaoTalkFill } from "react-icons/ri"
import { FcOpenedFolder } from "react-icons/fc"
import { TbBrandVscode } from "react-icons/tb"
import { useNavigate } from "react-router-dom";

const Background = () => {

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    }

    return (
        <>
            <Back>
                <BackgroundImg src="/images/BackgroundImage.png" alt="배경화면">
                </BackgroundImg>
                <ChromeIcon>
                    <BsBrowserChrome />
                </ChromeIcon>
                <IconName>Chrome</IconName>

                <KaKaoIcon>
                    <RiKakaoTalkFill />
                </KaKaoIcon>
                <IconName>카카오톡</IconName>

                <VsCodeIcon>
                    <TbBrandVscode />
                </VsCodeIcon>
                <IconName>VsCode</IconName>

                <SellentIcon onClick={goHome}>
                    S
                </SellentIcon>
                <IconName>Sellent</IconName>


                <Bottom>

                    <BottomWindow>
                        <AiFillWindows />
                    </BottomWindow>

                    <BottomInput type="text" placeholder="검색">
                        <SlMagnifier /> 검색
                    </BottomInput>

                    <BottomWindowEdge>
                        <FaEdge />
                    </BottomWindowEdge>

                    <BottomWindowKakao>
                        <RiKakaoTalkFill />
                    </BottomWindowKakao>

                    <BottomWindowChrome>
                        <BsBrowserChrome />
                    </BottomWindowChrome>

                    <BottomWindowFolder>
                        <FcOpenedFolder />
                    </BottomWindowFolder>

                    <BottomWindowVscode>
                        <TbBrandVscode />
                    </BottomWindowVscode>

                </Bottom>
            </Back>
        </>
    );
}

export default Background;

const Back = styled.div`
    width: 85%;
    height: 85vh;
    border: 2px solid black;
    margin: 0 auto;
    margin-top: 8vh;
`

const BackgroundImg = styled.img`
    width: 85%;
    height: 85vh;
    position: absolute;
    z-index: -1;
`

const ChromeIcon = styled.div`
    width: 5%;
    height: 6vh;
    /* border: 2px solid red; */
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orange;
`

const KaKaoIcon = styled.div`
    width: 5%;
    height: 6vh;
    /* border: 2px solid red; */
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: yellow;
    margin-top: 0.5em;
`

const VsCodeIcon = styled.div`
    width: 5%;
    height: 6vh;
    /* border: 2px solid red; */
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: blue;
    margin-top: 0.5em;
`

const SellentIcon = styled.div`
    width: 5%;
    height: 6vh;
    font-size: 3em;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5em;
    cursor: pointer;
`

const IconName = styled.div`
    width: 5%;
    height: 3vh;
    /* border: 2px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
`

const Bottom = styled.div`
    width: 100%;
    height: 5vh;
    /* border: 2px solid green; */
    margin: 0 auto;
    margin-top: 36.5vh;
    display: flex;
    justify-content: row;
    justify-content: center;
    background-color: #dcdcdc;
`

const BottomWindow = styled.div`
    width: 5%;
    height: 5vh;
    /* border: 2px solid red; */
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: skyblue;
`

const BottomInput = styled.div`
    width: 20%;
    height: 4vh;
    /* border: 2px solid red; */
    border-radius: 2em;
    font-size: 2rem;
    display: flex;
    align-items: center;
    padding-left: 0.5em;
    background-color: white;
    margin-top: 0.3rem;
`

const BottomWindowEdge = styled.div`
    width: 5%;
    height: 5vh;
    /* border: 2px solid red; */
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
`

const BottomWindowKakao = styled.div`
    width: 5%;
    height: 5vh;
    /* border: 2px solid red; */
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: yellow;
`

const BottomWindowChrome = styled.div`
    width: 5%;
    height: 5vh;
    /* border: 2px solid red; */
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orange;
`

const BottomWindowFolder = styled.div`
    width: 5%;
    height: 5vh;
    /* border: 2px solid red; */
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BottomWindowVscode = styled.div`
    width: 5%;
    height: 5vh;
    /* border: 2px solid red; */
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: blue;
`