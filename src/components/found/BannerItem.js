import React from 'react'
import cn from 'classnames'

import styles from './BannerItem.module.css'

const BannerItem = (props) => {
    const { bannerIndex, typeTitle, imageUrl, className, onClick } = props
    console.log(bannerIndex, typeTitle, imageUrl, className, onClick)
    return (
        <div key={bannerIndex} className={cn(styles.root, className)} onClick={onClick}>
            <img className={styles.img} src={imageUrl} loading='lazy' />
            <div className={styles.type}>
                {typeTitle}
            </div>
        </div>
    )
}

export default BannerItem
