下载 / 运行 NeteaseCloudMusicApi

``` 
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

npm install

node app
```

下载 / 运行 音乐播放器

``` 
git clone https://github.com/WuLianN/react-media-player.git

npm install / yarn install

npm run start / yarn start
```

**更新歌曲**

1.  updateSong(data) // 更新歌曲信息 -> 获取 id、api 
2.  updateIdIndex(idIndexData) // 更新当前歌曲索引

如下，控件播放下一首歌

``` js
    function nextSong() {
        const nextIndex = autoIndex + 1
        if (nextIndex !== songList.length) {
            const data = songList[nextIndex]
            const idIndexData = {
                idIndex: nextIndex
            }
            dispatch(updateSong(data))
            dispatch(updateIdIndex(idIndexData))
        }
    }
```

这两个 action 会触发 audio 的effect（副作用) -> 更新 audio 
