import React, { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './History.module.css'

export default function History() {
    // const [showBack, setShowBack] = useState(false)
    // const [showForword, setShowForward] = useState(false)
    // const historyLength = window.history.length
    // console.log(historyLength)

    // useEffect(() => {
    //     if (historyLength > 0) {
    //         setShowBack(true)
    //     }

    // }, [historyLength])

    function goBack() {
        window.history.back()

        // 点击了后退，就可以前进
        // setShowForward(true)
    }

    function goForward() {
        window.history.forward()
    }

    return <div className={styles.history}>
        {/* <div onClick={goBack} className={[styles.left, styles.flex]}>
            <LeftOutlined style={showBack ? { color: 'white' } : { color: '' }} className={[styles.icon, styles.icon1]} />
        </div>
        <div onClick={goForward} className={[styles.right, styles.flex]}>
            <RightOutlined style={showForword ? { color: 'white' } : { color: '' }} className={[styles.icon, styles.icon2]} />
        </div> */}

        <div onClick={goBack} className={[styles.left, styles.flex]}>
            <LeftOutlined className={[styles.icon, styles.icon1]} />
        </div>
        <div onClick={goForward} className={[styles.right, styles.flex]}>
            <RightOutlined className={[styles.icon, styles.icon2]} />
        </div>
    </div>
}