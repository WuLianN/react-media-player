import React from "react";
import { Tabs } from 'antd';
import { Recomment, Songer, SongList, RankList, Radio, LastSong } from '../components/found/index'


const { TabPane } = Tabs;

const switchComponent = (name) => {
    if (name === 'Recomment') {
        return <Recomment />
    } else if (name === 'SongList') {
        return <SongList />
    } else if (name === 'Songer') {
        return <Songer />
    } else if (name === 'Radio') {
        return <Radio />
    } else if (name === 'RankList') {
        return <RankList />
    } else if (name === 'LastSong') {
        return <LastSong />
    }
}

const tabData = [
    { title: "个性推荐", component: "Recomment" },
    { title: "歌单", component: "SongList" },
    { title: "主播电台", component: "Radio" },
    { title: "排行榜", component: "RankList" },
    { title: "歌手", component: "Songer" },
    { title: "最新音乐", component: "LastSong" }]

const Demo = () => {
    const tabList = tabData.map((item, index) => <TabPane tab={item.title} key={index + 1}>
        {switchComponent(item.component)}
    </TabPane>)

    return (<Tabs defaultActiveKey="1" centered>
        {tabList}
    </Tabs>)
}



export default function Found() {
    return (
        <Demo />
    )
}


