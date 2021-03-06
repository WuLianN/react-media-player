import React, { useEffect, useState } from "react";
import "./SiderBar.css"
import { Menu } from 'antd';
import { VideoCameraOutlined, UsergroupDeleteOutlined, SmileOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { useSelector } from 'react-redux'
import { mapArtist, getLocalStorageValue } from '../../utils/transform'
import SongDetail from '../../views/SongDetail'
import api from "../../api/wy/index";
import qqApi from '../../api/qq/index'
import axios from "axios";
import { getPic } from '../../api/config/other'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

const { SubMenu } = Menu;

export default function SiderBar() {
    const history = useHistory()
    const qq_uid = getLocalStorageValue('qq_uid')
    const wy_uid = getLocalStorageValue('wy_uid')
    const update = useSelector(state => state.updateSiderBar.update) // 重新render作用 <- 获取了全部的uid

    const [allUserSongList, setAllUserSongList] = useState(null)

    useEffect(() => {
        history.push('/found')
    }, [])

    function wySongList(uid) {
        return api.getUserSongList(uid)
    }

    function qqSongList(uid) {
        return qqApi.getUserSongList(uid)
    }

    useEffect(() => {
        async function getUserSongList(uid) {
            const { qq_uid, wy_uid } = uid
            if (qq_uid && wy_uid) {
                axios.all([wySongList(wy_uid), qqSongList(qq_uid)]).then(res => {
                    const WY = res[0].data.playlist
                    const QQ = res[1].data.data
                    let packData = []

                    WY.forEach(item => {
                        packData.push({
                            api: 'WY',
                            id: item.id,
                            name: item.name,
                            picUrl: item.coverImgUrl
                        })
                    })

                    QQ.forEach((item, index) => {
                        if (index >= 1) {
                            packData.push({
                                api: 'QQ',
                                id: item.tid,
                                name: item.diss_name,
                                picUrl: item.diss_cover
                            })
                        }
                    })

                    setAllUserSongList(packData)
                })
            } else if (wy_uid) {
                const response = await wySongList(wy_uid)
                const result = response.data.playlist
                let packData = []
                result.forEach(item => {
                    packData.push({
                        api: 'WY',
                        id: item.id,
                        name: item.name,
                        picUrl: item.coverImgUrl
                    })
                })
                setAllUserSongList(packData)
            } else if (qq_uid) {
                const response = await qqSongList(qq_uid)
                const result = response.data.data
                let packData = []
                result.forEach((item, index) => {
                    if (index >= 1) {
                        packData.push({
                            api: 'QQ',
                            id: item.tid,
                            name: item.diss_name,
                            picUrl: item.diss_cover
                        })
                    }
                })
                setAllUserSongList(packData)
            }
        }

        if (qq_uid || wy_uid) {
            getUserSongList({ qq_uid, wy_uid })
        }
    }, [qq_uid, wy_uid])

    return (
        <div className="siderBar">
            <Sider allUserSongList={allUserSongList} />
            <Player />
        </div>
    )
}

function Player() {
    const { picUrl, artist, songName, api, id, album } = useSelector(state => state.updateSong.song)
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
            <img className="player-img" src={picUrl ? picUrl : getPic(api, id)} alt={songName}
                onMouseEnter={() => showMask(true)}
                onMouseLeave={() => showMask(false)}
                onClick={() => showSongDetail(true)}
            />
            <div className="player-mark" style={isShowImg ? { display: 'block' } : { display: 'none' }}>
                <img src={markImg} className="player-mark-img" alt="mark" /></div>
            <div className="player-detail">
                <div className="player-detail-name" onClick={() => showSongDetail(true)}>{songName}</div>
                <div className="player-detail-artist">{mapArtist(artist)}</div>
            </div>

            <div style={isShowSongDetail ? { display: 'block' } : { display: 'none' }} className="player-songDetail">
                {isShowSongDetail && id && <SongDetail isShowImg={isShowImg} showSongDetail={showSongDetail} songData={{ picUrl, artist, songName, api, id, album }} />}
            </div>
        </div>
    }

    return null
}


function Sider(props) {
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

    const allUserSongList = props.allUserSongList

    const [openKeys, setOpenKeys] = useState(['sub1'])

    const onOpenChange = openKeys => {
        const openKeysLength = openKeys.length
        const latestOpenKey = openKeys[openKeysLength - 1]

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKeys)
        } else {
            setOpenKeys(openKeys = latestOpenKey ? [latestOpenKey] : [])
        }
    };

    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            defaultSelectedKeys={['1']}
            onOpenChange={onOpenChange}
            style={{ width: 200 }}
        >
            <SubMenu key="sub1"
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
                    <Link to={"/videos"}>
                        <VideoCameraOutlined />
                        <span>视频</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={"/friends"}>
                        <UsergroupDeleteOutlined />
                        <span>朋友</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<IconFont type="iconQQmusic" />} title="QQ 音乐">
                <Menu.Item key="5">
                    <IconFont type="iconmusic_filledx" />
                    <span>音乐馆</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <VideoCameraOutlined />
                    <span>视频</span>
                </Menu.Item>
                <Menu.Item key="7">
                    <IconFont type="iconradio" />
                    <span>电台</span>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="我的歌单" icon={<MenuUnfoldOutlined />}>
                {allUserSongList && allUserSongList.map((item, index) =>
                    <div key={9 + index}>
                        <Link className="menu-special-item" to={`/songList/${item.api}/${item.id}`}>
                            <img className="menu-special-img" src={item.picUrl} alt="歌单" />
                            <span className="menu-special-text">{item.name}</span>
                        </Link>
                    </div>
                )}
                < Menu.Item key="100">
                    <Link to={"/moreUserSongList"} >
                        <SmileOutlined />
                        <span>获取更多歌单？</span>
                    </Link>
                </Menu.Item>

            </SubMenu>
        </Menu >
    );
}


