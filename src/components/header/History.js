import React, { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './History.module.css'

export default function History() {
    // const [showBack, setShowBack] = useState(false)
    // const [showForword, setShowForward] = useState(false)
    const history = window.history
    // const historyLength = history.length


    // window.addEventListener('popstate', () => {
    //     console.log(history)
    // })

    // useEffect(() => {
    //     if (historyLength > 0) {
    //         setShowBack(true)
    //     }

    // }, [historyLength])



    function goBack() {
        history.back()

        // 点击了后退，就可以前进
        // setShowForward(true)
    }

    function goForward() {
        history.forward()
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