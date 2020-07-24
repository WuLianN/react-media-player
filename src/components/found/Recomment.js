import React, { useContext } from "react"
import { SnippetRecommentList, SnippetNewSong, SnippetRadio, SnippetRecommentMv, SnippetExclusive } from './index'
import './Recomment.css'
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import Banner from './Banner'
import { ActiveKeyContext, listData } from '../../views/Found'

const IconFont = createFromIconfontCN({
   scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

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
   const updateActiveKey = useContext(ActiveKeyContext)
   return listData.map(item =>
      <div className="list" key={item.id}>
         <div className="list-header">
            <span className="list-header-title">{item.title}</span>
            <span className="list-header-more" onClick={() => updateActiveKey(item.id)}>
               更多
               <IconFont type="iconyoujiantou" />
            </span>
         </div>

         {switchList(item.component)}
      </div>
   )
}

export function Recomment() {
   return (
      <div>
         <Banner />

         <div>
            <List />
         </div>
      </div>
   )
}