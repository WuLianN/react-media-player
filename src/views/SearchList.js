import React, { useEffect, useState } from "react";
import styles from "./SearchList.module.css";
import { useParams } from "react-router-dom";
import api from "../api/wy/index";
import qqApi from "../api/qq/index";
import {
  Song,
  SongList,
  Radio,
  Video,
  User,
  Album,
  Lyric,
  Singer,
} from "../components/search/index";
import axios from "axios";
import { Tabs } from "antd";

export default function SearchList() {
  const { word } = useParams();
  const [songs, setSongs] = useState([]);
  const [offset, setOffset] = useState(0);
  const { TabPane } = Tabs;
  const tabData = [
    { name: "单曲", component: "Song" },
    { name: "歌手", component: "Singer" },
    { name: "专辑", component: "Album" },
    { name: "视频", component: "Video" },
    { name: "歌单", component: "SongList" },
    { name: "歌词", component: "Lyric" },
    { name: "主播电台", component: "Radio" },
    { name: "用户", component: "User" },
  ];

  useEffect(() => {
    let result = [];
    let r1 = [];
    let r2 = [];

    function getSearch_WY(word) {
      const type = 1; // 歌曲
      const limit = 30; // 30首
      return api.getSearch(word, type, limit, offset);
    }

    function getSearch_QQ(word) {
      const type = "song";
      const limit = 30;
      return qqApi.getSearch(word, type, limit, offset);
    }

    // 并发
    axios.all([getSearch_QQ(word), getSearch_WY(word)]).then(
      axios.spread((QQ, WY) => {
        result.push(QQ.data.data.list);
        result.push(WY.data.result.songs);

        // qq
        result[0].forEach((item) => {
          r1.push({
            api: "QQ",
            id: item.songmid,
            songName: item.songname,
            duration: item.interval * 1000,
            artist: item.singer,
            album: item.albumname,
            picUrl: "",
          });
        });

        // wy
        result[1].forEach((item) => {
          r2.push({
            api: "WY",
            id: item.id,
            songName: item.name,
            duration: item.duration,
            artist: item.artists,
            album: item.album,
            picUrl: "",
          });
        });

        // 合并两个数组
        const r3 = r1.concat(r2);

        // 数组中的对象去重
        let obj = {};
        const r4 = r3.reduce((cur, next) => {
          if (obj[next.songName] === undefined) {
            obj[next.songName] = true;
            cur.push(next);
          }
          return cur;
        }, []);

        if (offset !== 0) {
          const allSongs = songs.concat(r4); // 偏移量
          setSongs(allSongs);
        } else {
          setSongs(r4);
        }
      })
    );
  }, [word, offset]);

  const switchComponent = (component) => {
    if (component === "Song") {
      return songs && <Song songs={songs} />;
    } else if (component === "SongList") {
      return <SongList />;
    } else if (component === "Singer") {
      return <Singer />;
    } else if (component === "Radio") {
      return <Radio />;
    } else if (component === "Video") {
      return <Video />;
    } else if (component === "User") {
      return <User />;
    } else if (component === "Album") {
      return <Album />;
    } else if (component === "Lyric") {
      return <Lyric />;
    }
  };

  const TabList = tabData.map((item, index) => (
    <TabPane tab={item.name} key={index + 1}>
      {switchComponent(item.component)}
    </TabPane>
  ));

  return (
    <div className={styles.searchList}>
      <Tabs defaultActiveKey="1" centered>
        {TabList}
      </Tabs>
    </div>
  );
}
