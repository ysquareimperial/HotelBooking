import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Modal, Row, Table } from "reactstrap";
import { _post } from "../../Utils/Helper";
import InputForm from "../../CustomComponents/InputForm";
// import { _get, _post } from '../Utils/Helper'
// import { Floors } from './Floors'
import { RiFileExcel2Fill } from "react-icons/ri";

export default function TranComfirmPending() {
  const [form, setForm] = useState({
    check_in: "",
    check_out: "",
    hotel: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  //   const handleSubmit = () => {
  //     let finalObj = {
  //       name: form.name,
  //       address: form.address,
  //       floors: selected,
  //     }
  //     setLoading(true)
  //     _post(
  //       'api/hotels?in_query_type=create',
  //       form,
  //       (res) => {
  //         setForm((p) => ({
  //           ...p,
  //           hotel_in: '',
  //           hotel_name: '',
  //           address: '',
  //           city: '',
  //           phone: '',
  //           email: '',
  //           website: '',
  //         }))
  //         setLoading(false)
  //         console.log(res)
  //         getHotels()
  //         toggle()
  //       },
  //       (err) => {
  //         setLoading(false)
  //         console.log(err)
  //       },
  //     )
  //     console.log(finalObj)
  //   }

  //   const getHotels = () => {
  //     _post(
  //       'api/hotels?in_query_type=select-all',
  //       {},
  //       (resp) => {
  //         // setLoading(false)
  //         console.log(resp)
  //         // if (resp ) {
  //         setHotelList(resp.resp)
  //         //  alert('dfasfsadf'+resp)
  //         // }
  //       },
  //       (e) => {
  //         console.log(e)
  //         // setLoading(false)
  //         // alert(e)
  //       },
  //     )
  //   }

  //   useEffect(() => {
  //     // setLoading(true)
  //     getHotels()
  //   }, [])

  return (
    <Card className="app_card dashboard_card shadow p-3 m-3">
      <Row>
        <Col md={12}>
          <center>
            <h5 className="app_title" style={{ fontSize: 23 }}>
              Transport Comfirmation Pending
            </h5>
            <hr />
          </center>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <label className="Label mt-2">Transport Company</label>
          <div className="search_input_form">
            <input
              id="exampleSelect"
              className="app_input3"
              value={form.hotel}
              onClick={handleChange}
              name="hotel"
            />
            <CiSearch
              className="search_icon"
              // onClick={toggle}
            />
            {/* <Modal isOpen={modal} toggle={toggle}size="xl" >
                        <HotelReg/>
                    </Modal> */}
          </div>
        </Col>
        <Col md={4}>
          <InputForm
            className="app_input"
            label="Check In"
            value={form.check_in}
            onChange={handleChange}
            name="check_in"
            type="date"
          />
        </Col>
        <Col md={4}>
          <InputForm
            className="app_input"
            label="Date To"
            value={form.check_out}
            onChange={handleChange}
            name="check_out"
            type="date"
          />
        </Col>
      </Row>
      <Row>
        <Col md={7}>
          <div style={{ display: "flex", gap: 15 }}>
            <button
              className="app_button p-2 mt-3 "
              style={{ width: 150, fontSize: 16, fontWeight: 500 }}
              // onClick={() => navigate('/table-meal')}
            >
              View Record
            </button>
            <button
              className="app_button p-2 mt-3 "
              style={{ width: 150, fontSize: 16, fontWeight: 500 }}
              // onClick={() => navigate('/table-meal')}
            >
              Reset
            </button>
            <button
              className="app_button p-2 mt-3 "
              style={{ width: 170, fontSize: 16, fontWeight: 500 }}
              // onClick={() => navigate('/table-meal')}
            >
              <RiFileExcel2Fill /> Exel DownLoad
            </button>
          </div>
        </Col>
      </Row>
      <div className="m-2">
        <Col md={12}>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 50 }}>
            {/* {JSON.stringify(data)} */}
            <label className="label_title">Search</label>
            <div className="search">
              <CiSearch style={{ fontSize: 30 }} />
              <input
                className="app_input2"
                type="text"
                // placeholder="Search"
                name="Search"
                // value={}
              />
            </div>
          </div>
        </Col>
        <Row>
          <div className="table_overflow">
            <table
              style={{
                border: "1px solid #ccc",
                padding: 10,
                width: "3000px",
                overflowX: "scroll",
              }}
              className="mt-5 mb-2"
            >
              <thead>
                <tr>
                  {/* <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>Hotel In</td> */}
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Comfirm
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Reserve id
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    CI RefNo
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Agent Name
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    City Code
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Check In
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Check Out
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Conf.No
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Costomer Name
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Hotel Id
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Hotel
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    No of Room
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Room Type
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    View
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    No. of Days
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Cr.Date
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(12, 134, 103)",
                      padding: "5px 10px",
                    }}
                  >
                    Exec
                  </td>
                </tr>
              </thead>
              {/* <tbody>
                    {JSON.stringify(hotelList)}
                    {hotelList.length === 0 ? (
                        <span>Loading Rooms...</span>
                    ) : (
                        hotelList.map((item, index) => (
                        <tr>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            <Button onClick={()=>{setForms((p)=>({...p,hotel:item.hotel_name})),toggles()}}>select</Button>
                            </td>
                            <td style={{border: '1px solid rgb(12, 134, 103)', padding: "5px 10px"}}>{item.hotel_in}</td>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            {item.hotel_name}
                            </td>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            {item.address}
                            </td>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            {item.city}
                            </td>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            {item.phone}
                            </td>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            {item.email}
                            </td>
                            <td
                            style={{
                                border: '1px solid rgb(12, 134, 103)',
                                padding: '5px 10px',
                            }}
                            >
                            {item.website}
                            </td>
                        </tr>
                        ))
                    )}
                    </tbody> */}
            </table>
          </div>
        </Row>
      </div>
    </Card>
  );
}
