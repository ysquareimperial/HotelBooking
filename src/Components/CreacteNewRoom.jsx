import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Input, Label, Row } from 'reactstrap'
import { _post } from '../Utils/Helper'

export default function CreacteNewRoom() {
  const goto = useNavigate()
  const [hotel,setHotel]=useState([])
  const getHotels = () => {
    _post( 
      'api/room_tables?in_query_type=select-all',
      {},
      (resp) => {
        // setLoading(false)
        console.log(resp)
        // if (resp ) {
          setHotel(resp.results)
        //  alert('dfasfsadf'+resp)
        // }
      },
      (e) => {
        console.log(e)
        // setLoading(false)
        // alert(e)
      },
    )
  }
  useEffect(
    ()=>{
      getHotels()
    },[0]
  )

  return (
    <Card className="app_card dashboard_card shadow p-3 m-3">
        <Row>
            <Col md= {12}>
                <button
                    className="app_button p-3"
                    style={{ width: 200}}
                    onClick={() => goto('/creact-new-room')}
                    >
                    Create New Room
                </button>
            </Col>
        </Row>
        <div className='card_div'>
          <Col md={12}>
              <div style={{display: 'flex', flexDirection: 'row', marginTop: 50}}>
                  {/* {JSON.stringify(data)} */}
                  <label className='label_title' >Search</label>
                  <div className='search'>
                    <CiSearch style={{fontSize: 30}}/>
                      <input 
                          className='app_input2'
                          type='text'
                          placeholder='Search'
                          name='Search'
                          // value={}
                      />
                  </div>
              </div>
          </Col>
          <Row>
              <table style={{border: '1px solid rgb(12, 134, 103)', padding: 12}} className= 'mt-5'>
                  <thead>
                      {/* <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Agent Id</th> */}
                      {/* <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Hotel Id</th> */}
                      {/* <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Room Id</th> */}
                      <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Room</th>
                      <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Floor</th>
                      <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Room Type</th>
                      <th style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}} className="text-center">Action</th>
                  </thead>
                
                      {hotel&&hotel.map((i)=>  <tbody>
                          {/* <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{i.agent_id}</td> */}
                          {/* <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{i.agent_name}</td> */}
                          {/* <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{i.phone}</td> */}
                          <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{i.room_no}</td>
                          <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{i.floor}</td>
                          <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{i.room_type}</td>
                          <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}><center><Button color='success'>Edit</Button></center></td>
                        </tbody>
                      )}
              </table>
          </Row>
        </div>
    </Card>
  )
}
