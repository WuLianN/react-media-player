import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Form.css'
import React from 'react'
import api from '../../api/wy/index'
import { useHistory } from 'react-router-dom'
import { message } from 'antd';

const NormalLoginForm = (props) => {
    const { closeLogin } = props
    const history = useHistory()
    const onFinish = values => {
        // 手机登录
        api.cellPhoneLogin(values)
            .then(res => {
                const hasLogin = res.data.cookie
                if (hasLogin) {
                    message.success('登录成功！');
                    history.push('/found')

                    // 关闭 login 页面
                    return closeLogin(true)
                }
            })
            .catch(err => {
                message.error('登录失败！');
            })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                className="login-form-input"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: '请输入手机号!'
                    },
                ]}
            >
                <Input type='number' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
            </Form.Item>

            <Form.Item
                className="login-form-input"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>


            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="login-form-checkbox">自动登录</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NormalLoginForm