import React, { useState, useEffect } from 'react'
import API from '../api'
import { Header, Table, Button, Checkbox, Dropdown, Input } from 'semantic-ui-react'
import JouralModal from '../components/JournalModal'
import JournalModal from '../components/JournalModal';
import '../css/components/JournalTable.css'

export default function LogTable() {
    const [journalList, setJournalList] = useState(null);
    const [selectedJournals, setSelectedJournals] = useState([]);
    const [tableRows, setTableRows] = useState();
    const [coaList, setCoaList] = useState(null);

    const [activeItem, setActiveItem] = useState({
        status: 2,
        coa: 1,
        user: "",
        debit: 0.00,
        credit: 0.00,
        amount: 0.00,
        source: "",
        comment: "",
    });
    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(async () => {
        const journals = await API.get('/api/journals/admin/').then(res => res.data);
        const coas = await API.get('/api/coa/admin/').then(res => res.data);
        setCoaList(coas);
        setJournalList(journals);
        setTableRows(renderTableRows(journals, coas));
    }, [setTableRows, setJournalList, setCoaList]);

    const getCoaInfo = (coas, coaID) => {
        return coas.filter(coa => coa["id"] == coaID)[0]["name"]
    }

    const refreshItems = async () => {
        let i = 2;
        while (i != 0) {
            const journals = await API.get('/api/journals/admin/').then(res => res.data);
            const coas = await API.get('/api/coa/admin/').then(res => res.data);
            setTableRows(renderTableRows(journals, coas));
            i--;
        }
    }

    const handleRowsSelected = (eve, e, item) => {
        if (e.checked == true)
            selectedJournals.push(item)
        else
            setSelectedJournals(selectedJournals.filter((el) => el.id != item.id))
    }

    const handleSubmit = async (item) => {
        setModal(!modal)
        setIsAdd(true);

        if (item.id)
            API.put(`/api/journals/admin/${item.id}/`, item).then(res => res.data);
        else
            API.post(`/api/journals/admin/`, item).then(res => res.data);

        refreshItems();
        setSelectedJournals([]);
    }

    const handleEditAccount = (item) => {
        console.log(selectedJournals[0])
        setActiveItem(selectedJournals[0]);
        setIsAdd(false);
        setModal(!modal)
    }

    const deleteSelectedRows = async (journals) => {
        for (let entry in journals) {
            API.delete(`/api/journals/admin/${journals[entry].id}/`).then(res => res.data);
        }
        refreshItems();
        window.location.replace('/apps/journals')
    }

    const handleChange = async (e, item) => {
        item.status = Number.parseInt(e.value)
        await API.put(`/api/journals/admin/${item.id}/`, item).then(res => res.data);
        refreshItems();
    }

    const mapStatusToValue = (status) => {
        switch(Number.parseInt(status)) {
            case 1:
                return "Approved"
            case 2:
                return "Pending"
            case 3: 
                return "Rejected"
            default:
                return "Unknown"
        }
    }
    
    const handleAddItem = () => {
        setActiveItem({
            status: 1,
            coa: 1,
            user: 1,
            debit: 0.00,
            credit: 0.00,
            amount: 0.00,
            source: "",
            comment: "",
        });
        toggleModal(true);
        setIsAdd(true);
    }

    const toggleModal = (state) => {
        setModal(state)
    }

    const statusOptions = [
        {
            key: 'Approved',
            text: 'Approved',
            value: '1',
            icon: 'check',
        },
        {
            key: 'Pending',
            text: 'Pending',
            value: '2',
            icon: 'history',
        },
        {
            key: 'Rejected',
            text: 'Rejected',
            value: '3',
            icon: 'stop circle outline',
        },
    ]

    const renderTableRows = (list, coas) => {
        if (list == null) {

        } else {
            return list.map((log) => {
                return (
                    <Table.Row>
                        <Table.Cell collapsing>
                            <Checkbox defaultChecked={false} name="selected" onChange={(eve, e) => handleRowsSelected(eve, e, log)} />
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{log["date"]}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Dropdown
                                placeholder={mapStatusToValue(log["status"])}
                                fluid
                                selection
                                options={statusOptions}
                                onChange={(event, e) => handleChange(e, log)}
                            />
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
                        <Table.Cell>
                            <Header as='h4'>{(log["comment"] != null ? log["comment"] : "N/A")}</Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h4'>{(log["file_upload"] != null ? log["file_upload"] : "N/A")}</Header>
                            <input
                                type="file"
                                hidden
                            />
                        </Table.Cell>
                    </Table.Row>
                )
            });
        }
    }

    return (
        <div>
            <div className="journal-title-bar">
                <div>
                    <Button color='green' onClick={() => handleAddItem()}>Add</Button>
                    <Button color='blue' onClick={() => handleEditAccount(selectedJournals[0])}>Edit</Button>
                    <Button color='red' onClick={() => deleteSelectedRows(selectedJournals)}>Delete</Button>
                </div>
                <div>
                    <Input style={{ float: "right" }}
                        type="search"
                        id="entry-search"
                        placeholder="Search"
                    />
                </div>
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
                        <Table.HeaderCell>Comment</Table.HeaderCell>
                        <Table.HeaderCell>File Uploads</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableRows}
                </Table.Body>
            </Table>
            { modal ? (
                <JournalModal
                    activeItem={activeItem}
                    onSave={handleSubmit}
                    isAdd={isAdd}
                    coas={coaList}
                />
            ) : null}
        </div>
    )
}
