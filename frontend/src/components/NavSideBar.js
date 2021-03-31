// React
import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions/auth";

// Components
import { Image, Menu, Sidebar } from 'semantic-ui-react'
import SideBarItem from './SideBarItem';
import '../css/components/SideBar.css';
import logo from '../assets/img/site-logo-topbar.png'

// Styles
import '../css/components/SideBar.css';

const admin_items = [
    {
        href: '/apps/users',
        icon: 'user circle outline',
        label: 'Administration'
    },
    {
        href: '/apps/chartofaccounts',
        icon: 'users',
        label: 'Chart of Accounts'
    },
    {
        href: '/apps/journals',
        icon: 'book',
        label: 'Journals'
    },
    {
        href: '/apps/logs',
        icon: 'clipboard list',
        label: 'Logs'
    },
];

const staff_items = [
    {
        href: '/apps/chartofaccounts',
        icon: 'users',
        label: 'Chart of Accounts'
    },
    {
        href: '/apps/journals',
        icon: 'book',
        label: 'Journals'
    },
    {
        href: '/apps/logs',
        icon: 'clipboard list',
        label: 'Logs'
    },
]

export class NavSideBar extends Component {

    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {
        return (
            <Sidebar
                className="nav-side-bar"
                animation="push"
                as={Menu}
                inverted
                vertical
                visible={this.props.sideBarVisible}
                >
              <Image src={logo} size='large' />
                {admin_items.map((item) => {
                    if (this.props.is_admin == 'true' && item.label == 'Administration') {
                        return <SideBarItem
                            label={item.label}
                            icon={item.icon}
                            href={item.href}
                        />
                    } else if (item.label != 'Administration')
                        return <SideBarItem
                            label={item.label}
                            icon={item.icon}
                            href={item.href}
                        />
                }
                )}
          </Sidebar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.token !== null,
        token: state.token,
        is_admin: state.is_admin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavSideBar)
