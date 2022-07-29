import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Cybersoft</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/signup">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/usermanagement">User Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='activeNavItem' className="nav-link" to="/cyberbugs">Cyberbugs</NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
