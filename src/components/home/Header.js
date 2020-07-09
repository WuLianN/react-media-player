import React from "react";
import "./Header.css"

export default function Header() {
    const neteaseLogo = require('../../assets/logo/neteaseLogo.png')
    const qqLogo = require('../../assets/logo/qqLogo.png')

    return (
        <div className="header">
            <div className="header-logo">
                <img className="header-logo-img" src={neteaseLogo} />
                <img className="header-logo-img" src={qqLogo} />
            </div>
        </div>
    )
}