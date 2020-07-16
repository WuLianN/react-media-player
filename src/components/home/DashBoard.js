import React from "react"
import SiderBar from "./SiderBar"
import "./DashBoard.css"
import Found from "../../views/Found"
import SongList from '../../views/SongList'
import MoreUserSongList from "../siderbar/MoreUserSongList"
import NoMatch from '../other/NoMatch'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default function DashBoard() {
    return (
        <div className="dashBoard">
            <Router>
                <SiderBar />

                <div className="dashBoard-content">
                    <Switch>
                        <Route path={"/found"}>
                            <Found />
                        </Route>
                        <Route path={"/private"}>
                            private
                        </Route>
                        <Route path={"/live"}>
                            live
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

                        <Route>
                            <NoMatch />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

