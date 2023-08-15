> 音你所需，专为开发者而生​ :heart_eyes:
>
> 支持多平台定制开发 :yum:
> 
> 逻辑清晰，不懂提issue :octocat:


<br>

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

下面链接的文章，记录我写这个项目使用的 hook 的业务场景

[https://bearcub.club/2020/07/24/react-hook-在项目中的应用](https://bearcub.club/2020/07/24/react-hook-在项目中的应用/)

<br>

### :warning: 声明

 :raised_hand: 本项目仅作为技术研究和项目开发练习，非商业用途 

 :u7981: 不允许引用本项目进行商业用途，否则自行承担法律责任

<br>

### 本地玩转

:electric_plug: **下载依赖**

``` 
本项目依赖
npm install / yarn install

NeteaseCloudMusicApi
支持 npx 方式运行,会自动安装依赖和运行

npx NeteaseCloudMusicApi
```

<br>

:running: **运行**

:turtle: 快速 (开发)

``` 
注：以下的backend start build http-server 皆为 npm scripts

backend 
start 
```

:rocket: 高速 (生产)

``` 
1. 需要安装 http-server -> npm install --global http-server
2. 需要打包 build (只需一次)

3. backend
4. http-server 

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
