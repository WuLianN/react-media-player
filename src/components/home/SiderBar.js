import React, { useEffect, useState } from "react";
import "./SiderBar.css"
import { Menu } from 'antd';
import { VideoCameraOutlined, UsergroupDeleteOutlined, SmileOutlined, MenuUnfoldOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { useSelector } from 'react-redux'
import { mapArtist, getLocalStorageValue } from '../../utils/transform'
import SongDetail from '../../views/SongDetail'
import api from "../../api/wy/index";
import qqApi from '../../api/qq/index'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

const { SubMenu } = Menu;

export default function SiderBar() {
    const history = useHistory()

    const qq_uid = getLocalStorageValue('qq_uid')
    const wy_uid = getLocalStorageValue('wy_uid')

    const [allUserSongList, setAllUserSongList] = useState(null)

    useEffect(() => {
        history.push('/found')
    }, [])

    useEffect(() => {
        async function getUserSongList(uid) {
            const { qq_uid, wy_uid } = uid
            if (qq_uid && wy_uid) {

            } else if (wy_uid) {
                const response = await api.getUsetSongList(wy_uid)
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
                const response = await qqApi.getUsetSongList(qq_uid)
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
    const { picUrl, artist, songName } = useSelector(state => state.updateSong.song)
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
                onClick={() => showSongDetail(true)}
            />
            <div className="player-mark" style={isShowImg ? { display: 'block' } : { display: 'none' }}>
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
            </SubMenu>
            <SubMenu key="sub3" title="我的歌单" icon={<MenuUnfoldOutlined />}>
                {allUserSongList && allUserSongList.map((item, index) =>
                    <div key={9 + index}>
                        <Link className="menu-special-item" to={`/songList/${item.id}`}>
                            <img className="menu-special-img" src={item.picUrl} alt="歌单" />
                            <span className="menu-special-text">{item.name}</span>
                        </Link>
                    </div>
                )}
                < Menu.Item key="100">
                    <Link to={"/"} >
                        <SmileOutlined />
                        <span>更多获取歌单？</span>
                    </Link>
                </Menu.Item>

            </SubMenu>
        </Menu >
    );
}


