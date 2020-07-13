import React from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Form from './Form'
import './Login.css'

export default function Login(props) {
    const { isShowLogin } = props

    const phoneLogin = require('../../assets/logo/phone-login.png')
    const neteaseLogoTitle = require('../../assets/logo/netease-logo-title.png')

    return <div className="header-login-wrap">
        <img className="header-login-des-img" src={neteaseLogoTitle} alt="网易云音乐" />
        <div className="header-login-close">
            <Button onClick={e => isShowLogin(false, e)} shape="circle" icon={<CloseOutlined />} />
        </div>
        <img className="header-login-logo" src={phoneLogin} alt="网易云" />
        <Form />
    </div>
}