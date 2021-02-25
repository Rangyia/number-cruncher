// React
import React from 'react';
import { Link } from "react-router-dom";

// Components
import { Icon, Menu } from "semantic-ui-react";

// Styles
import '../css/components/SideBar.css';

const SideBarItem = (props) => {
    const highlight = props.highlight ? 'hightlight-item' : null;
    const itemLink = props.href.toLowerCase();

    return (
        <Link to={itemLink}>
            <Menu.Item className='sidebar-item'>
                <div className='sidebar-item-alignment-container' style={{color: "white"}}>
                    <span><Icon size='large' name={props.icon} /> </span>
                    <span>{props.label}</span>
                </div>
            </Menu.Item>
        </Link>
    )
}

export default SideBarItem;