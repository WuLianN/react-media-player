import React from "react"
import SiderBar from "./SiderBar"
import "./DashBoard.css"
import Found from "../../views/Found"

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
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

