import { vmStart, vmStop, vmUpgrade, vmDowngrade, vmDelete } from "../actions";
import { selectVMList } from '../selectors'
import { Row, Col, Button, Card } from 'antd'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import React from 'react'
import 'antd/dist/antd.css';

const VMTableComponent = ({ vmList, postVMStart, postVMStop, postVMDelete, postVMUpgrade, postVMDowngrade }) => {
    return !!vmList && vmList.map(({ID, cost}) => {
        return (
            <Card>
                <Row gutter={16}>
                    <Col span={4} >
                        {`ID: ${ID}, cost: ${cost}`}
                    </Col>
                    <Col span={4} >
                        <Button
                            type={'primary'}
                            onClick={() => postVMStart()}
                        >
                            Start
                        </Button>
                    </Col>
                    <Col span={4} >
                        <Button
                            type={'primary'}
                            onClick={() => postVMStop()}
                        >
                            Stop
                        </Button>
                    </Col>
                    <Col span={4} >
                        <Button
                            type={'danger'}
                            onClick={() => postVMDelete()}
                        >
                            Delete
                        </Button>
                    </Col>
                    <Col span={4} >
                        <Button
                            type={'primary'}
                            onClick={() => postVMUpgrade()}
                        >
                            Upgrade
                        </Button>
                    </Col>
                    <Col span={4} >
                        <Button
                            type={'primary'}
                            onClick={() => postVMDowngrade()}
                        >
                            Downgrade
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    })
}


const mapStateToProps = createStructuredSelector({
    vmList: selectVMList,
})

const mapDispatchToProps = dispatch => {
    return {
        postVMStart: (params) => dispatch({
            type: vmStart.request,
            params,
        }),
        postVMStop: (params) => dispatch({
            type: vmStop.request,
            params,
        }),
        postVMDelete: (params) => dispatch({
            type: vmDelete.request,
            params,
        }),
        postVMUpgrade: (params) => dispatch({
            type: vmUpgrade.request,
            params,
        }),
        postVMDowngrade: (params) => dispatch({
            type: vmDowngrade.request,
            params,
        }),
    }
}

export const VMTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VMTableComponent)