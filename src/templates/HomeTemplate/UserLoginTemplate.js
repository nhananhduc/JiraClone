import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
    const [{ width, height }, setSize] = useState({ width: Math.round(window.innerWidth), height: Math.round(window.innerHeight) })

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])
    let { Component, ...restRoute } = props;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={width / 2} style={{ backgroundImage: `url(https://picsum.photos/${Math.round(width / 2)}/${height})`, backgroundSize: '100%' }} >
                </Sider>
                <Content>
                    <Component {...propsRoute} />
                </Content>
            </Layout>

        </>
    }} />
}