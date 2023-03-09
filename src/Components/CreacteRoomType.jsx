import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'reactstrap'
import InputForm from '../CustomComponents/InputForm'

export default function CreacteRoomType() {
    const goto = useNavigate()
    const [form, setForm] = useState({
        room_id: '',
        room_name: '',
        room_type: '',
        no_of_pax: ''
    })

    const handleChange = ({ target: { name, value } }) => {
    // console.log({ target })
    setForm((p) => ({ ...p, [name]: value }))
    }

  return (
    <Card className="app_card dashboard_card shadow p-3 m-3">
        <button
            className="app_button p-3 mb-3"
            style={{ width: 150, fontSize: 16, fontWeight: 500}} 
            onClick={() => goto('/room-type')}
        >
            <FaArrowLeft style={{marginRight: 10}} /> Back
        </button>
        <Row>
            <Col md={12}>
                <h5 className="app_title">Create Room Type</h5>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <InputForm
                    className="app_input"
                    label="Room Id"
                    value={form.room_id}
                    onChange={handleChange}
                    name="room_id"
                    type= 'number'
                />
                <InputForm
                    className="app_input"
                    label="Room Name"
                    value={form.room_name}
                    onChange={handleChange}
                    name="room_name"
                />
            </Col>
            <Col>
                <label className="Label mt-2">Room Type</label>
                <select
                    id="exampleSelect"
                    className="app_input"
                    value={form.room_type}
                    onChange={handleChange}
                    name="room_type"
                    type="select"
                >
                    <option>Select </option>
                </select>
                <InputForm
                    className="app_input"
                    label="Number of Pax"
                    value={form.no_of_pax}
                    onChange={handleChange}
                    name="no_of_pax"
                    type= 'number'
                />
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col md= {12}>
                <center>
                    <button
                        className="app_button p-3"
                        style={{ width: 150}} 
                        // onClick={() => goto('/creact-room-type')}
                        >
                        Submit
                    </button>
                </center>
            </Col>
        </Row>
    </Card>
    
  )
}
