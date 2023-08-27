import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Header/Home";
import Login from "./components/user/Login";
import Example from "./components/Header/example";
import KakaoInfo from "./components/kakao/KakaoInfo";
import KakaoLogin from "./components/kakao/KakaoLogin";
import KakaoCallback from "./components/kakao/KakaoCallback";

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
        </Routes>
      </Router>
    
    </>
    );
}

export default App;
