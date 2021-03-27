import React, { useEffect, useState } from 'react'
import { Container, Divider } from 'semantic-ui-react';
import '../css/components/TitleBar.css'

export default function TitleBar(props) {
    const [header, setHeader] = useState("");

    useEffect(() => {
        setHeader(props.header);
    }, [header])

    return (
        <Container className="view-title-bar">
            <h2>{header}</h2>
            <Divider />
        </Container>
    )
}
