import React, { useEffect, useState } from 'react'
import { Container, Divider, Button } from 'semantic-ui-react';
import '../css/components/TitleBar.css'

export default function TitleBar(props) {
    const [header, setHeader] = useState("");

    useEffect(() => {
        setHeader(props.header);
    }, [header])

    return (
        <Container className="view-title-bar">
            <div className="title-bar-menu">
                <h2>{header}</h2>
                <Button color='teal' onClick={() => window.location.replace('/apps/journals')}>Journals</Button>
            </div>
            <Divider />
        </Container>
    )
}
