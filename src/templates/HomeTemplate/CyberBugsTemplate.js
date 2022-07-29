import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import MenuCyberBugs from "../../components/CyberBugs/MenuCyberBugs";
import SidebarCyberBugs from "../../components/CyberBugs/SidebarCyberBugs";
import '../../index.css'
import ModalCyberBugs from "../../components/CyberBugs/ModalCyberBugs/ModalCyberBugs";

export const CyberBugsTemplate = (props) => {
    const { Component, ...restParam } = props;

    return <Route path={restParam.path} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SidebarCyberBugs />
                <MenuCyberBugs />
                <Component {...propsRoute}/>
                <ModalCyberBugs/>
            </div>
        </>
    }} />
}