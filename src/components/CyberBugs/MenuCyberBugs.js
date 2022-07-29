import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {
    return (
        <div className="menu" >
            <div className="account">

                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif")} alt='avatar' />
                </div>
                <div className="account-info">
                    <h3 className='font-weight-bold'>CyberLearn.vn</h3>
                    <h6 className='font-italic'>Cyberbugs</h6>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-home mr-1" />
                    <NavLink className='text-dark' to='/home' activeClassName='active font-weight-bold'>Home</NavLink>
                </div>
                <div>
                    <i className="fa fa-credit-card mr-1" />
                    <NavLink className='text-dark' to='/cyberbugs' activeClassName='active font-weight-bold'>Cyber Board</NavLink>
                </div>
                <div >
                    < i className="fa fa-project-diagram mr-1" />
                    <NavLink className='text-dark' to='/createproject' activeClassName='active font-weight-bold'>Create Project</NavLink>
                </div>
                <div >
                    <i className="fa fa-cog mr-1" />
                    <NavLink className='text-dark' to='/projectmanagement' activeClassName='active font-weight-bold'>Project Management</NavLink>
                </div>
                <div >
                    <i className="fa fa-user mr-1" />
                    <NavLink className='text-dark' to='/usermanagement' activeClassName='active font-weight-bold'>User Managament</NavLink>
                </div>
            </div>
        </div>
    )
}
