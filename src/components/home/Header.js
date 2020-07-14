import React from "react"
import "./Header.css"
import LoginStatus from '../header/LoginStatus'


export default function Header() {
    const neteaseLogo = require('../../assets/logo/netease-logo.png')
    const qqLogo = require('../../assets/logo/qqLogo.png')

    return (
        <div className="header">
            <div className="header-logo">
                <img className="header-logo-img" src={neteaseLogo} alt="网易云" />
                <img className="header-logo-img" src={qqLogo} alt="qq" />
            </div>

            <LoginStatus />
        </div>
    )
}