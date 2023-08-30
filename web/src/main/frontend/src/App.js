import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Header/Home";
import Login from "./components/login/Login";
import Example from "./components/Header/example";
import KakaoInfo from "./components/kakao/KakaoInfo";
import KakaoLogin from "./components/kakao/KakaoLogin";
import KakaoCallback from "./components/kakao/KakaoCallback";
import NaverLogin from "./components/naver/NaverLogin";
import NaverInfo from "./components/naver/NaverInfo";
import NaverCallback from "./components/naver/NaverCallback";
import Write from "./components/main/Write";
import MyPage from "./components/Header/MyPage";
import Chatting from "./components/Header/Chatting";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam" element={<Example />} />
          <Route path="/kakaologin" element={<KakaoLogin />} />
          <Route path="/kakaoinfo" element={<KakaoInfo />} />
          <Route path="/login/kakao/sellent" element={<KakaoCallback />} />
          <Route path="/naverlogin" element={<NaverLogin />} />
          <Route path="/naverinfo" element={<NaverInfo />} />
          <Route path="/login/naver/sellent" element={<NaverCallback />} />
          <Route path="/write" element={<Write />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatting" element={<Chatting />} />
        </Routes>
      </Router>
    
    </>
    );
}

export default App;
