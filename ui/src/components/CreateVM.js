import React, { Component } from 'react'
import { connect } from 'react-redux'
import { vmCreate } from '../actions'
import { selectResponseReceived } from '../selectors'
import { createStructuredSelector } from 'reselect';
import { Card, Button, Select } from 'antd'
import 'antd/dist/antd.css';

const Option = Select.Option

export class CreateVMComponent extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            selected: 1
        }
    }

    render() {
        return (
            <Card>
                <Select defaultValue={1} style={{ width: '40em', marginRight: '2em' }} onChange={(value) => this.setState({ selected: value })}>
                    <Option value={1}>8 virtual cores, 16 GB virtual memory, 20 GB storage, 5 cents/min</Option>
                    <Option value={2}>32 virtual cores, 64 GB virtual memory, 20 GB storage, 10 cents/min</Option>
                    <Option value={3}>128 virtual cores, 512 GB virtual memory, 40 GB storage, 15 cents/min</Option>
                </Select>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => this.props.postAction({
                        type: this.state.selected,
                    })}
                    loading={this.props.success}
                >
                    Create VM
                </Button>
            </Card>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    success: selectResponseReceived,
})

const mapDispatchToProps = dispatch => {
    return {
        postAction: (params) => dispatch({
            type: vmCreate.request,
            params,
        })
    }
}

export const CreateVMContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateVMComponent)