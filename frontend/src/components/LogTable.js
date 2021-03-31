import React, { useState, useEffect } from 'react'
import API from '../api'
import { Header, Table } from 'semantic-ui-react'
import photo from "../assets/img/img-user-profile.png"

export default function LogTable() {
    const [ logList, setLogList ] = useState(null);
    const [ userList, setUserList] = useState(null);
    const [ coaList, setCoaList] = useState(null);

    useEffect(async () => {
        const logs = await API.get('/api/logs/admin/').then(res => res.data);
        const users = await API.get('/api/account/admin/users/').then(res => res.data);
        const coas = await API.get('/api/coa/admin/').then(res => res.data);
        setCoaList(coas);
        setUserList(users);
        setLogList(logs);
    }, [setLogList, setUserList, setCoaList]);

    const getUserInfo = (users, userID) => {
        return users.filter(users => users["id"] == userID)[0]["username"]
    }

    const getCoaInfo = (coas, coaID) => {
        return coas.filter(coa => coa["id"] == coaID)[0]["name"]
    }

    const formatDateTime = (dateTime) => {
        let date = new Date(dateTime);
        let currDate = ((date.getMonth() + 1) + "-" + date.getDate() + "-"+ date.getFullYear());
        return {
            date: currDate,
            time: ((date.getHours()) + ":" + date.getMinutes())
        }
    }

    const display = async (callBack) => {
        return await callBack().then(res => res); 
    }

    const renderTableRows = (list, users, coas) => {
        if (list == null) {
        }
        else {
            return list.map((log) => {
                return (
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>{formatDateTime(log["log_date"])["date"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{formatDateTime(log["log_date"])["time"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <div style={{display: "flex", justifyContent:"start" }}>
                                <div className="ui small image">
                                    <img src={photo} alt="profile pic" style={{ width: 30 }} />
                                </div>
                                <Header as='h4' style={{marginTop: 0}}>{getUserInfo(users, log["user"])}</Header>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{getCoaInfo(coas, log["coa"])}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["img_before"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["img_after"]}</Header>
                        </Table.Cell>
                    </Table.Row>
                )
            });
        }
    }

    return (
        <Table cell padded style={{width: "100%"}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Log Date</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Log Time</Table.HeaderCell>
                    <Table.HeaderCell>User</Table.HeaderCell> 
                    <Table.HeaderCell>Chart of Account</Table.HeaderCell>
                    <Table.HeaderCell>Before Change</Table.HeaderCell>
                    <Table.HeaderCell>After Change</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {renderTableRows(logList, userList, coaList)}
            </Table.Body>
        </Table>
    )
}
