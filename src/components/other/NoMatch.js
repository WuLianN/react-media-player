import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'


export default function NoMatch() {
    const history = useHistory()
    const goBack = () => {
        history.push('/found')
    }

    return <Result
        status="404"
        title="404"
        subTitle="访问的页面不存在！！！"
        extra={<Button type="primary" onClick={goBack}>回到首页</Button>}
    />
}

