import React from 'react'
import { connect } from 'react-redux'
import { vmCreate } from '../actions'
import { selectResponseReceived } from '../selectors'
import { createStructuredSelector } from 'reselect';


export const SuccessComponent = ({ success, postAction }) => {
    return (
        <React.Fragment>
            <h1>Hello, {success}</h1>
            <button onClick={() => postAction()}></button>
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    success: selectResponseReceived,
})

const mapDispatchToProps = dispatch => {
    return {
        postAction: () => dispatch({
            type: vmCreate.request
        })
    }
}

export const SuccessContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SuccessComponent)