import React, { useEffect, useState } from "react";
import "./SiderBar.css"
import { Menu } from 'antd';
import { VideoCameraOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { useSelector } from 'react-redux'
import { mapArtist } from '../../utils/transform'
import SongDetail from '../../views/SongDetail'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

const { SubMenu } = Menu;

export default function SiderBar() {
    const history = useHistory()

    useEffect(() => {
        history.push('/found')
    }, [])

    return (
        <div className="siderBar">
            <Sider />
            <Player />
        </div>
    )
}

function Player() {
    const { id, picUrl, artist, songName } = useSelector(state => state.updateSong.song)
    const markImg = require('../../assets/player/enlarge.png')
    const [isShowImg, setIsShowImg] = useState(false)
    const [isShowSongDetail, setIsShowSongDetail] = useState(false)

    function showMask(bool) {
        setIsShowImg(bool)
    }

    function showSongDetail(bool) {
        setIsShowSongDetail(bool)
    }

    if (songName || artist || picUrl) {
        return <div className="player">
            <img className="player-img" src={picUrl} alt={songName}
                onMouseEnter={() => showMask(true)}
                onMouseLeave={() => showMask(false)}
            />
            <div className="player-mark" onClick={() => showSongDetail(true)} style={isShowImg ? { display: 'block' } : { display: 'none' }}>
                <img src={markImg} className="player-mark-img" /></div>
            <div className="player-detail">
                <div className="player-detail-name" onClick={() => showSongDetail(true)}>{songName}</div>
                <div className="player-detail-artist">{mapArtist(artist)}</div>
            </div>

            <div style={isShowSongDetail ? { display: 'block' } : { display: 'none' }} className="player-songDetail">
                <SongDetail showSongDetail={showSongDetail} />
            </div>
        </div>
    }

    return null
}


class Sider extends React.Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                defaultSelectedKeys={['1']}
                onOpenChange={this.onOpenChange}
                style={{ width: 200 }}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <IconFont type="iconmusic163" />
                            <span>网易云音乐</span>
                        </span>
                    }
                >
                    <Menu.Item key="1">
                        <Link to={"/found"}>
                            <IconFont type="iconmusic_filledx" />
                            <span>发现音乐</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/private"}>
                            <IconFont type="iconradio" />
                            <span>私人FM</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={"/live"}>
                            <IconFont type="iconLivelinkBI" />
                            <span>LOOK直播</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={"/videos"}>
                            <VideoCameraOutlined />
                            <span>视频</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={"/friends"}>
                            <UsergroupDeleteOutlined />
                            <span>朋友</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<IconFont type="iconQQmusic" />} title="QQ 音乐">
                    <Menu.Item key="6">
                        <IconFont type="iconmusic_filledx" />
                        <span>音乐馆</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <VideoCameraOutlined />
                        <span>视频</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <IconFont type="iconradio" />
                        <span>电台</span>
                    </Menu.Item>

                    {/* <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu> */}
                </SubMenu>
            </Menu>
        );
    }
}

