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
import logo from '../assets/img/site-logo-topbar.png'
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";
import '../css/components/Navbar.css'
import photo from "../assets/img/img-user-profile.png"

export const NavTopBar = (props) => {

    const sideBarIsToggled = (visible) => {
        return (
            <Menu.Item as='a' onClick={() => props.fromChildToParentCallBack(!props.sideBarVisibility)}>
                {
                    (visible ? <Icon className='top-nav-icon' name='outdent'></Icon> : <Icon className='top-nav-icon' name='indent'></Icon>)
                }
            </Menu.Item>
        );
    }

    useEffect(() => {
        props.onTryAutoSignin();
    })

    return (
        <Menu inverted className="nav-top-bar" style={{ backgroundColor: "transparent", marginTop: 20}}>
            <Container className="nav-menu">
                {sideBarIsToggled(props.sideBarVisibility)}
                <Link to="/">
                    <Menu.Item header>
                        <div class="ui small image">
                            <img src={photo} alt="profile pic" style={{width: 50}}/>
                        </div>
                        <h2>{localStorage.getItem("user").toUpperCase()}</h2>
                    </Menu.Item>
                </Link>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Icon />
                    </Menu.Item>
                    {props.authenticated ? (
                        <Menu.Item style={{ color: "#4a5073"}} onClick={() => props.logout().then(window.location.replace("/"))}>
                            Logout
                        </Menu.Item>
                    ) : (
                            <React.Fragment>
                                <Link to="/">
                                    <Menu.Item>Login</Menu.Item>
                                </Link>
                                <Link to="/signup">
                                    <Menu.Item>SignUp</Menu.Item>
                                </Link>
                            </React.Fragment>
                        )}
                </Menu.Menu>
            </Container>
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