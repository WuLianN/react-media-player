import React, { useState, useEffect } from "react"

export default function SongDetail(props) {
    const { showSongDetail } = props
    return <div>
        <button onClick={() => showSongDetail(false)}>关闭</button>
    </div>
}


