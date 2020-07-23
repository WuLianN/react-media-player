import React from "react"
import SiderBar from "./SiderBar"
import "./DashBoard.css"
import Found from "../../views/Found"
import SongList from '../../views/SongList'
import MoreUserSongList from "../siderbar/MoreUserSongList"
import SearchList from '../../views/SearchList'
import Video from '../../views/Video'
import FM from '../../views/FM'
import NoMatch from '../other/NoMatch'
import Header from './Header'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default function DashBoard() {
    return (
        <div className="dashBoard">
            <Router>
                <div className="dashBoard-header">
                    <Header />
                </div>

                <div className="dashBoard-main">
                    <SiderBar />

                    <div className="dashBoard-content">
                        <Switch>
                            <Route path={"/found"}>
                                <Found />
                            </Route>
                            <Route path={"/private"}>
                                <FM />
                            </Route>
                            <Route path={"/friends"}>
                                friends
                            </Route>
                            <Route path={"/videos"}>
                                videos
                           </Route>

                            {/* 歌单 */}
                            <Route path={"/songList/:api/:id"}>
                                <SongList />
                            </Route>

                            {/* 获取更多歌单 */}
                            <Route path={"/moreUserSongList"}>
                                <MoreUserSongList />
                            </Route>

                            {/* 搜索页 */}
                            <Route path={"/search/:word"}>
                                <SearchList />
                            </Route>

                            <Route path={"/video/:api/:id"}>
                                <Video />
                            </Route>

                            {/* 404 */}
                            <Route>
                                <NoMatch />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

