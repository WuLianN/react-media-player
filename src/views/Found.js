import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import { Recomment, Songer, SongList, RankList, Radio, NewSong } from '../components/found/index'

let defaultKey = 1 // 默认
export const ActiveKeyContext = React.createContext(defaultKey)

export const listData = [
    { title: "推荐歌单", component: "RecommentList", id: 1 },
    { title: "独家放送", component: "Exclusive", id: 2 },
    { title: "最新音乐", component: "NewSong", id: 3 },
    { title: "推荐MV", component: "RecommentMv", id: 4 },
    { title: "主播电台", component: "Radio", id: 5 },
    // { title: "听听", component: "Listen" , id: 6 },
    // { title: "看看", component: "Look" , id: 7 }
]

const { TabPane } = Tabs;

const tabData = [
    { title: "个性推荐", component: "Recomment" },
    { title: "歌单", component: "SongList" },
    { title: "主播电台", component: "Radio" },
    { title: "排行榜", component: "RankList" },
    { title: "歌手", component: "Songer" },
    { title: "最新音乐", component: "NewSong" }
]

const NavBar = () => {
    const [activeKey, setActiveKey] = useState("1")

    const updateActiveKey = (key) => {
        if (key === 1) {
            setActiveKey("2") // 推荐歌单 -> 歌单
        } else if (key === 2) {

        } else if (key === 3) {
            setActiveKey("6") // 最新音乐
        } else if (key === 4) {

        } else if (key === 5) {
            setActiveKey("3") // 主播电台
        } else if (key === 6) {

        } else if (key === 7) {

        }
    }

    const switchComponent = (name) => {
        if (name === 'Recomment') {
            return (
                <ActiveKeyContext.Provider value={updateActiveKey}>
                    <Recomment />
                </ActiveKeyContext.Provider>)
        } else if (name === 'SongList') {
            return <SongList />
        } else if (name === 'Songer') {
            return <Songer />
        } else if (name === 'Radio') {
            return <Radio />
        } else if (name === 'RankList') {
            return <RankList />
        } else if (name === 'NewSong') {
            return <NewSong />
        }
    }

    const tabUpdateActive = (key) => {
        setActiveKey(key)
    }

    const tabList = tabData.map((item, index) =>
        <TabPane tab={item.title} key={index + 1} >
            {switchComponent(item.component)}
        </TabPane>)

    return (
        <Tabs centered activeKey={activeKey} onTabClick={tabUpdateActive}>
            {tabList}
        </Tabs>
    )
}

export default function Found() {
    return <NavBar />
}


