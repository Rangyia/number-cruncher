import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// Components
import {
    Container,
    Menu,
    Image,
    Icon,
} from "semantic-ui-react";
import logo from '../assets/img/site-logo-topbar.png'
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";
import '../css/components/Navbar.css'
import photo from "../assets/img/img-user-profile.png"

export const Navbar = (props) => {

    useEffect(() => {
        props.onTryAutoSignin();
    })

    return (
        <Menu inverted className="site-top-nav" style={{ backgroundColor: "transparent", marginTop: 20}}>
            <Container className="nav-menu">
                <Menu.Item as='a'>
                    <Icon name='align justify' onClick={() => props.fromChildToParentCallBack(!props.sideBarVisibility)} />
                </Menu.Item>
                <Link to="/">
                    <Menu.Item header style={{backgroundColor: "black", borderRadius: 20}}>
                        <div class="ui small image">
                            <img src={photo} alt="profile pic" style={{width: 50}}/>
                        </div>
                        <h2>{localStorage.getItem("user").toUpperCase()}</h2>
                    </Menu.Item>
                </Link>
                <Menu.Menu position="right">
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)