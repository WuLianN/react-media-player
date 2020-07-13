import React from 'react'
import cn from 'classnames'

import styles from './BannerItem.module.css'

const BannerItem = (props) => {
    const { typeTitle, imageUrl, className, onClick } = props
    return (
        <div className={cn(styles.root, className)} onClick={onClick}>
            <img className={styles.img} src={imageUrl} loading='lazy' />
            <div className={styles.type}>
                {typeTitle}
            </div>
        </div>
    )
}

export default BannerItem
