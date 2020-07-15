import React, { useEffect, useState } from 'react'
import api from '../../api/wy/index'
import { hasProperty } from '../../utils/transform'
import './Profile.css'
import {
    CrownOutlined,
    RightOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    WeiboCircleFilled,
    WechatFilled

} from '@ant-design/icons';

import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

export default function Profile(props) {
    const { userId: uid } = props.profile
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (uid) {
            api.getUserDetail(uid).then(res => {
                setProfile(res.data)
            })
        }
    }, [uid])

    if (hasProperty(profile)) {
        const { profile: user, level } = profile

        return (<div className="popover">
            <div className="popover-triangle-wrap">
                <div className="popover-triangle"></div>
            </div>
            <div className="popover-header">
                <div className="popover-header-user">
                    <img className="popover-header-user-img" src={user.avatarUrl} alt="用户头像" />
                    <span className="fontWeight">{user.nickname}</span>
                </div>

                <div className="popover-header-clock">
                    <IconFont type="icondiejia" />
                    <span className="fontSize">签到</span>
                </div>
            </div>
            <div className="popover-middle">
                <div className="popover-middle-box border-right">
                    <div className="fontWeight">{user.eventCount}</div>
                    <div>动态</div>
                </div>
                <div className="popover-middle-box border-right">
                    <div className="fontWeight">{user.follows}</div>
                    <div>关注</div>
                </div>
                <div className="popover-middle-box">
                    <div className="fontWeight">{user.followeds}</div>
                    <div>粉丝</div>
                </div>
            </div>

            <div>
                <div className="popover-main-box">
                    <div className="popover-main-box-left">
                        <CrownOutlined />
                        <span className="popover-main-box-left-text">会员中心</span>
                    </div>
                    <div className="popover-main-box-right">
                        <RightOutlined />
                    </div>
                </div>
                <div className="popover-main-box">
                    <div className="popover-main-box-left">
                        <IconFont type="icondengji" />
                        <span className="popover-main-box-left-text">等级</span>
                    </div>
                    <div className="popover-main-box-right">
                        <IconFont type="iconlv" />
                        <span >{level}</span>
                        <RightOutlined />
                    </div>
                </div>
                <div className="popover-main-box border-bottom">
                    <div className="popover-main-box-left">
                        <ShoppingCartOutlined />
                        <span className="popover-main-box-left-text">商城</span>
                    </div>
                    <div className="popover-main-box-right">
                        <RightOutlined />
                    </div>
                </div>
                <div className="popover-main-box">
                    <div className="popover-main-box-left">
                        <SettingOutlined />
                        <span className="popover-main-box-left-text">个人信息设置</span>
                    </div>
                    <div className="popover-main-box-right">
                        <RightOutlined />
                    </div>
                </div>
                <div className="popover-main-box border-bottom">
                    <div className="popover-main-box-left">
                        <IconFont type="iconshouji" />
                        <span className="popover-main-box-left-text">绑定社交账号</span>
                    </div>
                    <div className="popover-main-box-right">
                        <WeiboCircleFilled />
                        <WechatFilled />
                        <RightOutlined />
                    </div>
                </div>
            </div>

            <div className="popover-footer-box">
                <div className="popover-footer-box-left">
                    <IconFont type="iconguanji" />
                    <span className="popover-footer-box-left-text">退出登录</span>
                </div>
            </div>
        </div>
        )
    }

    return null
}