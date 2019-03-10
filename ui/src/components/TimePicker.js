import React, { Component } from 'react'
import { vmUsage, vmCharges } from '../actions';
import { connect } from 'react-redux'
import { Card, Button, TimePicker, DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

export class TimePickerComponent extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
        }
    }

    render() {
        return (
            <Card>
                <RangePicker
                    style={{ marginRight: '1em' }}
                    onChange={(date) => this.setState({
                        startDate: date[0],
                        endDate: date[1],
                    })}
                />
                <TimePicker 
                    style={{ marginRight: '1em' }}
                    onChange={(value) => this.setState({
                        startTime: value,
                    })} 
                    placeholder="Start Time"
                    value={this.state.startTime}
                />
                <TimePicker
                    style={{ marginRight: '1em' }}
                    onChange={(value) => this.setState({
                        endTime: value,
                    })}
                    placeholder="End Time"
                    value={this.state.endTime}
                />
                <Button
                    type="primary"
                    size="large"
                    style={{ marginRight: '1em' }}
                    onClick={() => {
                        const startTimeISO = moment(this.state.startDate + this.state.startTime).format("YYYY-MM-DD HH:mm:ss.SSSSSS")
                        const endTimeISO = moment(this.state.endDate + this.state.endTime).format("YYYY-MM-DD HH:mm:ss.SSSSSS")
                        this.props.getVMUsage({
                        startTime: startTimeISO,
                        endTime: endTimeISO,
                    })}}
                    loading={this.props.success}
                >
                    Get Usage
                </Button>
                <Button
                    style={{ marginRight: '1em' }}
                    type="primary"
                    size="large"
                    onClick={() => {
                        const startTimeISO = moment(this.state.startDate + this.state.startTime).format("YYYY-MM-DD HH:mm:ss.SSSSSS")
                        const endTimeISO = moment(this.state.endDate + this.state.endTime).format("YYYY-MM-DD HH:mm:ss.SSSSSS")
                        this.props.getVMCharges({
                        startTime: startTimeISO,
                        endTime: endTimeISO,
                    })}}
                    loading={this.props.success}
                >
                    Get Total Cost
                </Button>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVMUsage: (params) => dispatch({
            type: vmUsage.request,
            params,
        }),
        getVMCharges: (params) => dispatch({
            type: vmCharges.request,
            params,
        })
    }
}

export const TimePickerContainer = connect(
    null,
    mapDispatchToProps,
)(TimePickerComponent)