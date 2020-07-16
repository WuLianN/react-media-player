import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './History.module.css'
import { useHistory } from 'react-router-dom'

export default function History() {
    const history = useHistory()

    function goBack() {
        console.log(history, history.length)
        history.goBack()
    }

    function goForward() {
        history.goForward()
    }

    return <div className={styles.history}>
        <div onClick={goBack} className={[styles.left, styles.flex]}><LeftOutlined className={[styles.icon, styles.icon1]} /></div>
        <div onClick={goForward} className={[styles.right, styles.flex]}><RightOutlined className={[styles.icon, styles.icon2]} /></div>
    </div>
}