import UserList from '../../components/UserList'
import TitleBar from '../../components/TitleBar'

export const Users = (props) => {
    return (
        <div>
            <TitleBar header={"User Accounts"} />
            <UserList />
        </div>
    )
}

export default Users;