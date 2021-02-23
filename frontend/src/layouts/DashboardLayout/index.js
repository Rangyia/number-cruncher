// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/auth";

// CSS
import './DashboardLayout.css';

// Components
import TopBar from './TopBar'
import SideBar from './SideBar'
import { Container } from "semantic-ui-react";

class DashboardLayout extends Component {
    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {
        return (
            <React.Fragment>
                <TopBar />
                <SideBar />
                <Container className="view-container">
                    <h1>Hello</h1>
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        authenticated: state.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);