import React, { useEffect } from "react";
import Header from './components/home/Header'
import DashBoard from './components/home/DashBoard'
import Footer from './components/home/Footer'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import cookie from './utils/cookie'
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "./store/actions";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    getLoginStatus()
  }, [])

  function getLoginStatus() {
    // 网易云音乐账号登录？
    const name = 'MUSIC_U'
    // 获取cookie
    const value = cookie.getCookie(name)
    // cookie 状态 
    const bool = Boolean(value)

    // 存储 cookie 状态 -> redux
    dispatch(updateLoginStatus({ hasLogin_WY: bool, platform: 'WY' }))
  }

  return (
    <div className="App">
      <Header />
      <DashBoard />
      <Footer />
    </div>
  );
}

export default App;
