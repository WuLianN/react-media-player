import React from "react"
import SiderBar from "./SiderBar"
import "./DashBoard.css"
import Found from "../../views/Found"
import SongList from '../../views/SongList'

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
                        <Route path={"/songList/:id"}>
                            <SongList />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

