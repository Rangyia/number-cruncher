import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// Components
import {
    Container,
    Menu,
    Image
} from "semantic-ui-react";
import logo from '../assets/img/site-logo-topbar.png'
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";
import '../css/components/Navbar.css'

export const Navbar = (props) => {
    useEffect(() => {
        props.onTryAutoSignin();
    })
    
    return (
        <Menu inverted className="nav-container" style={{ backgroundColor: "transparent"}}>
            <Container className="nav-menu">
                <Link to="/">
                    <Menu.Item header style={{backgroundColor: "black"}}>
                        <Image src={logo} size='tiny' />
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