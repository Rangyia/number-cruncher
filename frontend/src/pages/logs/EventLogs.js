import React from 'react'
import { connect } from 'react-redux'
import * as actionTypes from "../../store/actions/auth";
import LogTable from '../../components/LogTable'
import TitleBar from '../../components/TitleBar'

export const EventLogs = (props) => {
    return (
        <div>
            <TitleBar header={"Event Logs"} />
            <div>
                <div className="log-table" style={{ marginRight: 50 }}>
                    <LogTable />
                </div>
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
