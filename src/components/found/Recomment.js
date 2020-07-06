import React, { useEffect, useState } from "react"
import api from '../../api/index'
import { SnippetRecommentList, SnippetNewSong, SnippetRadio, SnippetRecommentMv, SnippetExclusive } from './index'
import './Recomment.css'
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'

const IconFont = createFromIconfontCN({
   scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

const listData = [
   { title: "推荐歌单", component: "RecommentList", id: 1 },
   { title: "独家放送", component: "Exclusive", id: 2 },
   { title: "最新音乐", component: "NewSong", id: 3 },
   { title: "推荐MV", component: "RecommentMv", id: 4 },
   { title: "主播电台", component: "Radio", id: 5 },
   // { title: "听听", component: "Listen" , id: 6 },
   // { title: "看看", component: "Look" , id: 7 }
]

function getBanner() {
   return api.getBanner(0)
}

function Banner(props) {
   return (
      <div className="banner"></div>
   )
}

function switchList(name) {
   if (name === 'RecommentList') {
      return <SnippetRecommentList />
   } else if (name === 'NewSong') {
      return <SnippetNewSong />
   } else if (name === 'RecommentMv') {
      return <SnippetRecommentMv />
   } else if (name === 'Radio') {
      return <SnippetRadio />
   } else if (name === 'Exclusive') {
      // 特殊 重新渲染
      return <SnippetExclusive />
   } else if (name === 'Listen') {
      // 新页面
   } else if (name === 'Look') {
      // 新页面
   }
}

function List() {
   return listData.map(item =>
      <div className="list" key={item.id}>
         <div className="list-header">
            <span className="list-header-title">{item.title}</span>
            <span className="list-header-more">
               更多
               <IconFont type="iconyoujiantou" />
            </span>
         </div>

         {switchList(item.component)}
      </div>
   )
}

export function Recomment() {
   const [banner, setBanner] = useState(null)

   useEffect(() => {
      // 广告
      getBanner().then(res => {
         const data = res.data.banners
         let packData = []
         data.forEach(item => {
            const { imageUrl, targetId, targetType, url, titleColor, typeTitle } = item
            const pack = {
               api: "WY",
               picUrl: imageUrl,
               targetId,
               targetType,
               url,
               titleColor,
               typeTitle
            }

            packData.push(pack)
         })

         setBanner(packData)
      })
   }, [])

   return (
      <div>
         <Banner banner={banner} />

         <div>
            <List />
         </div>
      </div>
   )
}