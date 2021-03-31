import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// Components
import {
    Container,
    Menu,
    Image,
    Icon,
    MenuItem,
    Button,
    Dropdown,
} from "semantic-ui-react";
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";
import photo from "../assets/img/img-user-profile.png"
import '../css/components/NavBar.css'
import api from '../api'

export const NavTopBar = (props) => {

    const getProfileListOptions = () => {
        return [
            { key: 1, text: 'Logout', value: 1 }
        ]
    }

    const getUserInitial = (name) => {
        if (name != null && name != "") 
            return name.substring(0, 1).toUpperCase();
        else
            return "|";
    }

    const toggleSideBarIcon = (visible) => {
        return (
            (visible ? <Icon className='top-nav-icon' name='indent'></Icon> : <Icon className='top-nav-icon' name='outdent'></Icon>)
        );
    }

    useEffect(async () => {
        props.onTryAutoSignin();
    })

    return (
        <Menu inverted className="global-header-bar" style={{ backgroundColor: "transparent" }}>
            <div className="global-header-container container-left">
                <MenuItem as='a' onClick={() => props.fromChildToParentCallBack(!props.sideBarVisibility)}>
                    {toggleSideBarIcon(props.sideBarVisibility)}
                </MenuItem>
                <MenuItem>
                    <div className="ui small image">
                        <img src={photo} alt="profile pic" style={{ width: 40 }} />
                    </div>
                    <h2>{localStorage.getItem("name")}</h2>
                </MenuItem>
            </div>
            <div className="global-header-container container-right">
                <MenuItem>
                    <Icon className="top-nav-icon" name="search" />
                </MenuItem>
                <MenuItem>
                    <Icon className="top-nav-icon" name="bell" />
                </MenuItem>
                <MenuItem>
                    <Icon className="top-nav-icon" name="cog" />
                </MenuItem>
                <MenuItem className="top-nav-menu">
                    <Dropdown style={{ fontSize: 18, color: "#4a5073", fontWeight: 900 }} icon='none' text={getUserInitial(localStorage.getItem("firstName")) + getUserInitial(localStorage.getItem("lastName"))} className="top-nav-menu">
                        <Dropdown.Menu className="top-nav-menu">
                            <Dropdown.Item style={{ color: "#4a5073" }} onClick={() => props.logout().then(window.location.replace("/"))} text='Logout' className="top-nav-menu"/>
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </div>
        </Menu>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.token !== null,
})

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTopBar)