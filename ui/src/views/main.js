import React from 'react'
import { CreateVM, TimePicker } from '../components'
import './main.css'

const Main = () => (
    <div className={'main_bg'}>
        <div>
            <CreateVM />
            <TimePicker />
        </div>
    </div>
)

export default Main