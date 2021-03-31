import React, { useState, useEffect } from 'react'
import API from '../api'
import { Header, Table, Button, Checkbox, Input } from 'semantic-ui-react'

export default function LogTable() {
    const [journalList, setJournalList] = useState(null);
    const [selectedJournals, setSelectedJournals] = useState([]);
    const [coaList, setCoaList] = useState(null);

    useEffect(async () => {
        const journals = await API.get('/api/journals/admin/').then(res => res.data);
        const coas = await API.get('/api/coa/admin/').then(res => res.data);
        setCoaList(coas);
        setJournalList(journals);
    }, [setJournalList, setCoaList]);

    const getCoaInfo = (coas, coaID) => {
        return coas.filter(coa => coa["id"] == coaID)[0]["name"]
    }

    const refreshItems = async () => {
        const journals = await API.get('/api/journals/admin/').then(res => res.data);
        setJournalList(journals);
    }

    const handleRowsSelected = (eve, e, item) => {
        if (e.checked == true)
            selectedJournals.push(item)
        else
            setSelectedJournals(selectedJournals.filter((el) => el.id != item.id))
    }

    const deleteSelectedRows = () => {
        for (let journal in selectedJournals) {
            API.delete(`/api/journals/admin/${selectedJournals[journal].id}/`).then(res => res.data);
        }
        setSelectedJournals([]);
        renderTableRows(journalList, coaList)
        window.location.replace('/apps/journals');
    }

    const renderTableRows = (list, coas) => {
        if (list == null) {

        } else {
            return list.map((log) => {
                return (
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox name="selected" onClick={(eve, e) => handleRowsSelected(eve, e, log)} />
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["date"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["status"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{getCoaInfo(coas, log["coa"])}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["debit"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["credit"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["amount"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{(log["source"] != null ? log["source"] : "Unknown")}</Header>
                        </Table.Cell>
                    </Table.Row>
                )
            });
        }
    }

    return (
        <div>
            <div>
                <Button color='green'>Add</Button>
                <Button color='blue'>Edit</Button>
                <Button color='red' onClick={() => deleteSelectedRows()}>Delete</Button>
            </div>
            <Table cell padded style={{ width: "100%" }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine></Table.HeaderCell>
                        <Table.HeaderCell singleLine>Log Date</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Status</Table.HeaderCell>
                        <Table.HeaderCell singleLine>COA</Table.HeaderCell>
                        <Table.HeaderCell>Debit</Table.HeaderCell>
                        <Table.HeaderCell>Credit</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Source</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderTableRows(journalList, coaList)}
                </Table.Body>
            </Table>
        </div >
    )
}
