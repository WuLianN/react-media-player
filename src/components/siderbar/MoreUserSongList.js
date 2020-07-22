import React, { useRef, useEffect, useState } from 'react'
import styles from './MoreUserSongList.module.css'
import { getLocalStorageValue } from '../../utils/transform'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { updateSiderBar } from '../../store/actions'
import { useHistory } from 'react-router-dom'
import { Alert } from 'antd'

export default function MoreUserSongList() {
    const qq_logo = require('../../assets/logo/qqLogo.png')
    const qq_uid = getLocalStorageValue('qq_uid') // null or 7w6z7KSkoe-P  格式
    const qq_status = qq_uid ? true : false
    const wy_logo = require('../../assets/logo/netease-login.png')
    const wy_uid = getLocalStorageValue('wy_uid') // null or 332959914 
    const wy_status = wy_uid ? true : false

    const [updatePage, setUpdatePage] = useState(-1)
    const dispatch = useDispatch()
    const history = useHistory()

    const form = useRef(null)

    const allUid = [
        {
            name: 'qq',
            uid: qq_uid,
            logo: qq_logo,
            status: qq_status,
            placeholder: 'hosteuin'
        },
        {
            name: 'wy',
            uid: wy_uid,
            logo: wy_logo,
            status: wy_status,
            placeholder: 'userid'
        }]

    function allUidBeFill() {
        const qq_uid = getLocalStorageValue('qq_uid')
        const wy_uid = getLocalStorageValue('wy_uid')

        if (qq_uid && wy_uid) {
            // 刷新siderbar 
            const random = Math.random() * 100
            dispatch(updateSiderBar({ update: random }))
            // 跳转到首页
            history.push('/found')
        } else {
            const random = Math.random() * 100
            dispatch(updateSiderBar({ update: random }))
        }
    }

    function getUserSongList(item, index, e) {
        e.preventDefault();

        const uid = form.current[item.name].value

        // 存储uid
        if (item.name === 'qq') {
            localStorage.setItem('qq_uid', uid)
            // 更新
            setUpdatePage(index)
            // 是否跳转到主页
            allUidBeFill()
        } else if (item.name === 'wy') {
            localStorage.setItem('wy_uid', uid)
            // 更新
            setUpdatePage(index)
            // 是否跳转到主页
            allUidBeFill()
        }
    }

    return <div className={styles.songList}>
        <form className={styles.main} ref={form}>
            {allUid.map((item, index) => (<div key={index} className={styles.login}>
                <img src={item.logo} className={styles.img} alt="logo" />
                <input className={styles.input} name={item.name} disabled={item.status} placeholder={item.placeholder} />
                <Button onClick={(e) => getUserSongList(item, index, e)}
                    className={styles.button} disabled={item.status}
                    type={item.status ? 'dash' : 'primary'}>{item.status ? '已获取' : '获取'}</Button>
            </div>))}
        </form>

        <div className={styles.alert}>
            <Alert
                message="hosteuin/userid有啥用? 如何获取?"
                type="success"
                closable
            />
            <Alert
                message="hosteuin/userid可以获取你的歌单，在app中分享自己的歌单，在链接中可以获取到。如qq音乐hosteuin=xxx，输入xxx即可"
                type="info"
                closable
            />
        </div>
    </div>
}