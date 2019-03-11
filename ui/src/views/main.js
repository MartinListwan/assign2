import React from 'react'
import { CreateVM, TimePicker, VMTable } from '../components'
import './main.css'

const Main = () => (
    <div className={'main_bg'}>
        <div>
            <CreateVM />
            <TimePicker />
            <VMTable />
        </div>
    </div>
)

export default Main