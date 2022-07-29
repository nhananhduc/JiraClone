import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";

export const HomeTemplate = (props) => {
    const { Component, ...restParam } = props;

    return <Route path={restParam.path} render={(propsRoute) => {
        return <Fragment>
            <Header />
            <Component {...propsRoute} />
        </Fragment>
    }} />
}