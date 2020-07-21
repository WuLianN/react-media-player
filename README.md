### 功能

* [x] 登录
* [x] 搜索
* [x] 歌词
* [x] 歌单
* [x] 个性推荐
* [ ] 排行榜
* [ ] 歌手

<br>

### 成果

![](https://github.com/WuLianN/react-media-player/blob/master/src/assets/display/home.png)
![](https://github.com/WuLianN/react-media-player/blob/master/src/assets/display/player.png)

<br>

### 技术栈

* react hook
* redux
* react-router
* antd

<br>

### :warning: 声明

 :raised_hand: 本项目仅作为技术研究和项目开发练习，非商业用途 
 
 :u7981: 不允许引用本项目进行商业用途，否则自行承担法律责任

<br>

### 本地玩转

下载依赖

``` 
本项目依赖
npm install / yarn install

api 包依赖
cd NeteaseCloudMusicApi

npm install / yarn install

```

运行 音乐播放器

``` 
- 快速 -
vs code 编辑器下面有npm scripts

运行这两个命令
start 
backend 

```

<br>

### 核心技术

<br>

![](https://github.com/WuLianN/react-media-player/blob/master/src/assets/display/tech-1.png)

<br>

**更新歌曲**

1.  updateSong(data) // 更新歌曲信息 -> 获取 id、api 
2.  updateIdIndex(idIndexData) // 更新当前歌曲索引 (有歌单)

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
