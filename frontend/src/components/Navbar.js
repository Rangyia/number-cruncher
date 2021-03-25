import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// Components
import {
    Container,
    Menu,
    Image,
    Icon,
    MenuItem,
} from "semantic-ui-react";
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";
import photo from "../assets/img/img-user-profile.png"
import '../css/components/NavBar.css'
import api from '../api'

export const NavTopBar = (props) => {
    const [fullName, setFullName] = useState("Anonymous");

    const toggleSideBarIcon = (visible) => {
        return (
            (visible ? <Icon className='top-nav-icon' name='indent'></Icon> : <Icon className='top-nav-icon' name='outdent'></Icon>)
        );
    }

    useEffect(async () => {
        props.onTryAutoSignin();

    }, [fullName])

    return (
        <Menu inverted className="global-header-bar" style={{ backgroundColor: "transparent" }}>
            <div className="global-header-menu-left">
                <MenuItem as='a' onClick={() => props.fromChildToParentCallBack(!props.sideBarVisibility)}>
                    {toggleSideBarIcon(props.sideBarVisibility)}
                </MenuItem>
                <MenuItem header>
                    <div class="ui small image">
                        <img src={photo} alt="profile pic" style={{ width: 40 }} />
                    </div>
                    <h2>{localStorage.getItem("name")}</h2>
                </MenuItem>
            </div>
            <div className="global-header-menu-right">
                <MenuItem style={{ color: "#4a5073" }} onClick={() => props.logout().then(window.location.replace("/"))}>
                    Logout
                </MenuItem>
            </div>
        </Menu>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.token !== null,
    userFirstName: state.name,
})

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTopBar)