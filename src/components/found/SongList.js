import React, { useEffect, useState } from "react"
import api from '../../api/wy/index'
import styles from './SongList.module.css'
import { createFromIconfontCN, UserOutlined, DownOutlined } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { snippetNum } from '../../utils/transform'
import { useHistory } from 'react-router-dom'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

export function SongList() {
    const navArr = ['热门标签：', '华语', '|', '流行', '|', '摇滚', '|', '民谣', '|', '电子', '|', '另类/独立', '|', '轻音乐', '|', '综艺', '|', '影视原音', '|', 'ACG']
    const hotType = ['华语', '流行', '摇滚', '民谣', '电子', '另类/独立', '轻音乐', '综艺', '影视原音', 'ACG']
    const [playlists, setPlaylists] = useState([])
    const history = useHistory();
    const [type, setType] = useState('华语') // 默认type

    const getSongList = async (cat, limit, offset) => {
        const res = await api.getHotSongList(cat, limit, offset)
        const data = res.data.playlists
        let packData = []
        data.forEach(item => {
            const { id, name, coverImgUrl, playCount, trackCount, creator } = item
            const pack = {
                api: "WY",
                id,
                name,
                picUrl: coverImgUrl,
                playCount,
                trackCount,
                nickname: creator.nickname
            }
            packData.push(pack)
        })
        setPlaylists(packData)
    }

    const select = (item, e) => {
        e.preventDefault();
        const index = hotType.indexOf(item)

        if (index !== -1) {
            // 请求数据
            getSongList(item, 32, 0)
            setType(item)
        }
    }

    useEffect(() => {
        getSongList(type, 32, 0)
    }, [])

    const SwitchType = () => {
        return <div className={styles.switch}>
            <div className={styles.switchBtn}>
                <span>{type}</span>
                <DownOutlined className={styles.switchIcon} />
            </div>
        </div>
    }

    const HotType = () => <div className={styles.nav}>
        {navArr.map((item, index) => <div className={styles.navItem} key={index} onClick={(e) => select(item, e)}>{item}</div>)}
    </div>

    const goSongList = (item, e) => {
        e.preventDefault();
        const { id, api } = item
        history.push(`/songList/${api}/${id}`);
    }

    const Display = () => {
        const play = require('../../assets/player/play.png')
        const [isShowImg, setIsShowImg] = useState(false)
        const [_index, set_Index] = useState(null)

        const showMask = (bool, index, e) => {
            e.preventDefault()
            setIsShowImg(bool)
            set_Index(index)
        }


        return <div className={styles.display}>
            {playlists.length > 0 && playlists.map((item, index) =>
                <div className={styles.box} key={index} onClick={(e) => goSongList(item, e)}>
                    <img className={styles.boxImg}
                        onMouseEnter={(e) => showMask(true, index, e)}
                        onMouseLeave={(e) => showMask(false, index, e)}
                        src={item.picUrl} alt={item.name}
                    />
                    <div className={styles.boxTitle}>{item.name}</div>
                    <div className={styles.boxMark}>
                        <IconFont type="iconerji" />
                        <span>{snippetNum(item.playCount)}</span>
                    </div>

                    <div className={styles.boxNickname}>
                        <UserOutlined />
                        <span className={styles.boxNicknameText}>{item.nickname}</span>
                    </div>
                    <div style={_index === index && isShowImg ? { display: 'block' } : { display: 'none' }} className={styles.boxMouseMark}><img className={styles.boxMouseMarkImg} src={play} alt="mark" /></div>
                </div>
            )}
        </div>
    }

    return (<div className={styles.songList}>
        <SwitchType />
        <HotType />
        <Display />
    </div>)
}