import React from 'react'
import { connect } from 'react-redux'
import API from '../../api'
import * as actionTypes from "../../store/actions/auth";
import ChartAccountsTable from '../../components/ChartAccountsTable'
import LogTable from '../../components/LogTable'

export const ChartAccount = (props) => {
    return (
        <div>
            <div>
                <h1>Chart of Accounts</h1>
                <div className="coa-table" style={{marginRight:50}}>
                    <ChartAccountsTable />
                </div>
            </div>
            <div>
                <h1>Event Logs</h1>
                <div className="coa-table" style={{ marginRight: 50 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartAccount)
