import React, { useRef } from 'react'
import styles from './Search.module.css'
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { useHistory } from 'react-router-dom';

export default function Search() {
    const input = useRef(null)
    let history = useHistory()

    // 聚焦 -> 监听
    function focus() {
        input.current.placeholder = ''
        window.addEventListener('keydown', debounce)
    }

    // 离焦 -> 取消监听
    function blur() {
        input.current.placeholder = '搜索音乐，视频，歌词，电台'
        window.removeEventListener('keydown', debounce)
    }

    const debounce = _.debounce(enter, 300)

    function enter(e) {
        if (e.code === 'Enter') {
            goSearch()
        }
    }

    function goSearch() {
        const value = input.current.value

        if (value) {
            // 路由跳转
            history.push(`/search/${value}`)
        }
    }


    return <div className={styles.searchBox}>
        <input type="text" onFocus={focus} onBlur={blur} ref={input} name="search" className={styles.search} placeholder="搜索音乐，视频，歌词，电台" />
        <div onClick={_.debounce(goSearch, 300)} className={styles.go}><SearchOutlined className={styles.icon} /></div>
    </div>
}