import { Button } from 'reactstrap'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CustomerReg from './CustomerReg'
import HotelReg from './HotelReg'
import StatusUpdate from './StatusUpdate'

function App() {

  return (
    <div>
        <CustomerReg />
        <HotelReg />
        <StatusUpdate />

    </div>
  )
}

export default App
