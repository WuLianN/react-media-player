import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import "./LoginStatus.css"
import Login from './Login'
import Profile from './Profile'
import api from '../../api/index'
import { CaretDownOutlined } from '@ant-design/icons';
import { hasProperty } from '../../utils/transform'

export default function LoginStatus() {
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
            })
        }
    }, [hasLogin])

    function isShowLogin(bool, e) {
        e.preventDefault();

        if (hasLogin && !showLogin) {
            // 已登录 -> 显示profile页面
            setShowLogin(bool)
        } else if (hasLogin && showLogin) {
            // 关闭profile页面 （功能：一点击，显示；二点击，关闭）
            setShowLogin(!bool)
        } else {
            // 未登录 -> 显示login页面
            setShowLogin(bool)
        }
    }

    function isShowUserDetail(bool, e) {
        e.preventDefault()

        if (hasLogin) {
            // 已登录 -> 跳转到用户详情页
        } else {
            // 未登录 -> 显示login页面
            setShowLogin(bool)
        }
    }

    function AvatarImg() {
        if (hasLogin && profile) {
            const { avatarUrl } = profile
            return <img className="header-loginStatus-img" src={avatarUrl} alt="用户" />
        } else {
            return <img className="header-loginStatus-img" src={user} alt="用户" />
        }
    }

    function NickName() {
        if (hasLogin && profile) {
            const { nickname } = profile
            return <span className="header-loginStatus-nickname">{nickname}</span>
        } else {
            return <span className="header-loginStatus-nickname">未登录</span>
        }
    }

    return <div className="header-login">
        <div className="header-loginStatus">
            <div className="header-loginStatus-img-wrap" onClick={e => isShowUserDetail(true, e)}>
                <AvatarImg />
            </div>
            <div className="header-loginStatus-user-wrap" onClick={e => isShowLogin(true, e)}>
                <NickName />
                <CaretDownOutlined />
            </div>
        </div>

        {/* 登录页面 */}
        <div style={showLogin && !hasLogin ? { display: 'block' } : { display: 'none' }} >
            {!hasLogin && <Login isShowLogin={isShowLogin} />}
        </div>

        {/* 用户信息页面 */}
        <div style={showLogin && hasLogin ? { display: 'block' } : { display: 'none' }} >
            {showLogin && hasLogin && hasProperty(profile) && <Profile profile={profile} isShowLogin={isShowLogin} />}
        </div>
    </div>
}