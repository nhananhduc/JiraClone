import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    BarsOutlined,
    LoginOutlined,
    FileAddOutlined,
    UserAddOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';
import { history } from '../../util/history';
import { useSelector } from 'react-redux';
import _ from 'lodash'
const { Sider } = Layout;


export default function SidebarCyberBugs() {
    const { userLogin } = useSelector(state => state.UserCyberBugsReducer)
    const dispatch = useDispatch();
    const [state, setState] = useState({
        collapsed: false
    });
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    if (_.isEmpty(userLogin)) {
        return (
            <Sider trigger={null} collapsible collapsed={state.collapsed}>
                <div className="text-right pr-2" onClick={toggle} style={{ cursor: 'pointer', color: '#fff', fontSize: '20px' }}><BarsOutlined /></div>
                <Menu theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <FileAddOutlined />,
                            label: 'Create Task',
                            onClick: () => {
                                dispatch({
                                    type: 'OPEN_FORM_CREATE_TASK',
                                    Component: <FormCreateTask />,
                                    title: 'Create Task'
                                })
                            }

                        },
                        {
                            key: '2',
                            icon: <LoginOutlined />,
                            label: 'Login',
                            onClick: () => {
                                history.push('/login')
                            }
                        },
                        {
                            key: '3',
                            icon: <UserAddOutlined />,
                            label: 'Sign up',
                            onClick: () => {
                                history.push('/signup')
                            }
                        }
                    ]}
                />
            </Sider>
        )
    } else {
        return (
            <Sider trigger={null} collapsible collapsed={state.collapsed}>
                <div className="text-right pr-2" onClick={toggle} style={{ cursor: 'pointer', color: '#fff', fontSize: '20px' }}><BarsOutlined /></div>
                <h3 className='text-white ml-3'>Hi, {userLogin.name}</h3>
                <Menu theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <FileAddOutlined />,
                            label: 'Create Task',
                            onClick: () => {
                                dispatch({
                                    type: 'OPEN_FORM_CREATE_TASK',
                                    Component: <FormCreateTask />,
                                    title: 'Create Task'
                                })
                            }

                        },
                        {
                            key: '4',
                            icon: <LogoutOutlined />,
                            label: 'Log out',
                            onClick: () => {
                                localStorage.removeItem('user_login');
                                localStorage.removeItem('access_token');
                                history.push('/home');
                                window.location.reload()
                            }
                        }
                    ]}
                />
            </Sider>
        )
    }
}
