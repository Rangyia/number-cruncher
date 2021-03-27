import React, { useState, useEffect } from 'react'
import { Container, List } from "semantic-ui-react";
import "../css/components/FooterBar.css"

export default function Footer(props) {
    const [footerTitle, setFooterTitle] = useState(null);

    useEffect(() => {
        setFooterTitle(props.title)
    }, [setFooterTitle]);

    return (
        <Container fluid className="site-footer" style={{margin: 0}}>
            <List className="footer-menu" divided horizontal size='small'>
                <List.Item>
                    <List.Content>
                        <List.Header className="footer-menu-item">Settings</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header className="footer-menu-item">Profile</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header className="footer-menu-item">Logout</List.Header>
                    </List.Content>
                </List.Item>
            </List>
        </Container>
    )
}
