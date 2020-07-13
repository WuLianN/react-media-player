import React, { useState, useEffect, useImperativeHandle } from "react";
import { useSelector, useDispatch } from 'react-redux'
import "./Header.css"
import Login from '../../components/header/Login'
import api from '../../api/index'


import { CaretDownOutlined } from '@ant-design/icons';

export default function Header() {
    const neteaseLogo = require('../../assets/logo/netease-logo.png')
    const qqLogo = require('../../assets/logo/qqLogo.png')
    const user = require('../../assets/logo/user.png')

    const hasLogin = useSelector(state => state.updateLoginStatus.hasLogin)

    const [showLogin, setShowLogin] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        // 获取登录状态 -> 用户信息
        if (hasLogin) {
            api.getLoginStatus().then(res => {
                const profile = res.data.profile
                // 存储用户信息
                setProfile(profile)
                console.log(profile)
            })
        }
    }, [hasLogin])

    function isShowLogin(bool, e) {
        e.preventDefault();

        if (hasLogin) {
            // 已登录 -> 显示profile页面
        } else {
            // 未登录 -> 显示login页面
            setShowLogin(bool)
        }
    }

    function AvatarImg(props) {
        const { hasLogin, profile } = props
        if (hasLogin && profile) {
            const { avatarUrl } = profile
            return <img className="header-loginStatus-img" src={avatarUrl} alt="用户" />
        } else {
            return <img className="header-loginStatus-img" src={user} alt="用户" />
        }
    }

    function NickName(props) {
        const { hasLogin, profile } = props
        if (hasLogin && profile) {
            const { nickname } = profile
            return <span>{nickname}</span>
        } else {
            return <span>未登录</span>
        }
    }

    return (
        <div className="header">
            <div className="header-logo">
                <img className="header-logo-img" src={neteaseLogo} alt="网易云" />
                <img className="header-logo-img" src={qqLogo} alt="qq" />
            </div>

            <div className="header-login">
                <div className="header-loginStatus" onClick={e => isShowLogin(true, e)}>
                    <div className="header-loginStatus-img-wrap">
                        <AvatarImg hasLogin={hasLogin} profile={profile} />
                    </div>
                    <NickName hasLogin={hasLogin} profile={profile} />
                    <CaretDownOutlined />
                </div>

                {/* 登录页面 */}
                <div style={showLogin && !hasLogin ? { display: 'block' } : { display: 'none' }} >
                    <Login isShowLogin={isShowLogin} />
                </div>

                {/* 用户信息页面 */}
                <div style={showLogin && hasLogin ? { display: 'block' } : { display: 'none' }} >
                    <profile isShowLogin={isShowLogin} />
                </div>
            </div>
        </div>
    )
}