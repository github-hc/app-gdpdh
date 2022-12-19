import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import './auth.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthService } from '../../../services/auth-service';

const Auth = () => {
    const layout = window.innerWidth < 1025 ? {} : {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    
    const history = useHistory();

    //#region  useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.trim().toLowerCase() !== 'null' && token.trim().toLowerCase() !== 'undefined') {
            history.push('/invoice/view-patient-details');
        }
    }, []);
    //#endregion

    //#region events
    const onFinish = async (values) => {
        let req = {
            UserName: values.username,
            Password: values.password
        };

        const response = await AuthService.SignInUser(req);

        if (response && response.status === 200 && response.data) {
            localStorage.setItem('token', response.data.token);
            history.push('/invoice/view-patient-details');
        }
        else {
            localStorage.clear();
            alert('Invalid User Login Attempt');
        }
    };
    //#endregion

    return (
        <div id="loginContainer">
            <Row id="containerRow">
                <Col span={14}>
                    <div id="leftContainer">
                    </div>
                </Col>
                <Col span={10}>
                    <div className='center'>
                        <Form
                            name="basic"
                            {...layout}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"

                            layout={window.innerWidth< 1025? 'vertical': 'horizontal'}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    SignIn
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Auth;