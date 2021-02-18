import React, { Component } from 'react'
import logo_sidebar from '../../../img/site-logo-sidebar.png';
import './Sidebar.css'

export class Sidebar extends Component {

    handleToggle = (e) => {
        
    };

    render() {
        return (
            <div>
                {/* Sidebar */}
                <div className="ui sidebar vertical left menu overlay visible" style={{ overflow: "visible !important", backgroundColor: "black" }}>
                    {/* Item: Logo */}
                    <div className="item logo">
                        <img src={logo_sidebar} alt="Site Logo" />
                    </div>
                    {/* List: Dashboard */}
                    <div className="side-bar-item ui accordion">
                        <a className="title item">
                            <span className="list-title">Dashboard</span>
                            <i className="side-bar-dropdown dropdown icon" />
                        </a>
                        <div class="content">
                            <a class="item" href="inbox.html">Inbox</a>
                            <a class="item" href="inbox.html">Mailbox</a>
                            <a class="item" href="inbox.html">Chat</a>
                        </div>
                    </div>
                    {/* List: Apps */}
                    <div className="side-bar-item ui accordion">
                        <a className="title item">
                            <span className="list-title">Apps</span>
                            <i className="side-bar-dropdown dropdown icon" />
                        </a>
                        <div class="content">
                            <a class="item" href="inbox.html">Files</a>
                            <a class="item" href="inbox.html">Accounts</a>
                            <a class="item" href="inbox.html">Sheets</a>
                        </div>
                    </div>
                    {/* List: Users */}
                    <div className="side-bar-item ui accordion">
                        <a className="title item">
                            <span className="list-title">Users</span>
                            <i className="side-bar-dropdown dropdown icon" />
                        </a>
                        <div class="content">
                            <a class="item" href="inbox.html">Administrators</a>
                            <a class="item" href="inbox.html">Managers</a>
                            <a class="item" href="inbox.html">Users</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar

