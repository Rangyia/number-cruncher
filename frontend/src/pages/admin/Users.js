import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import API from '../../api'

export const Users = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [userList, setUserList] = useState();

    useEffect(async () => {
        const res = await API.get('/api/account/admin/users/').then(response => {
            setUserList(response.data);
            setLoading(false);
        });

        console.log("List", userList)
    }, []);

    if (isLoading) {
        return (
            <div>
                <h1>Users</h1>
                <h2>{0}</h2>
            </div>
        );
    }

    return (
        <div>
            <h1>Users</h1>
            <h2>{userList.length}</h2>
        </div>
    )
}

export default Users;