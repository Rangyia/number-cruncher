import React from 'react'
import { connect } from 'react-redux'
import * as actionTypes from "../../store/actions/auth";
import TitleBar from '../../components/TitleBar'
import JournalTable from '../../components/JournalTable'

export const EventLogs = (props) => {
    return (
        <div>
            <TitleBar header={"Journal Entries"} />
            <div>
                <JournalTable />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    is_admin: state.is_admin,
})

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(actionTypes.authCheckState()),
        logout: () => dispatch(actionTypes.authLogout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventLogs)
