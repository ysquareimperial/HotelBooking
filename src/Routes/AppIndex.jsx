import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHotel } from 'react-icons/fa'
import { MdDashboard, MdOutlineBedroomParent } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import CustomerReg from '../Components/CustomerReg'
import Dashboard from '../Components/Dashboard'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
export default function AppIndex() {
  const goto = useNavigate()

  return (
    <div>
        <Row className='m-0'>
          <Col md={2} className="sidebar">
            <Sidebar />
          </Col>
          <div className='mobile_menu'>
            <div>
              <MdDashboard onClick={()=>goto('/dashboard')}/>
            </div>
            <div>
              <FaHotel onClick={()=>goto('/hotel-registration')}/>
            </div>
            <div>
              <MdOutlineBedroomParent onClick={()=>goto('/room-registration')}/>
            </div>
          </div>
          <Col md={10} className="">
            {/* <Navbar /> */}
            <Row>
              <Col md={9} className="p-0 m-0 _outlet">
                <Outlet />
              </Col>
              <Col md={3}>
                <CustomerReg />
              </Col>
            </Row>
          </Col>
        </Row>
    </div>
  )
}
