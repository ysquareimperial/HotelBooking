import React, { useEffect } from "react";
import InputForm from "../../CustomComponents/InputForm";
import { useState } from "react";
import useQuery, { _get, _post } from "../../Utils/Helper";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Card, Col, Modal, Row } from "reactstrap";
import { CiSearch } from "react-icons/ci";
import ReservationModal from "../Modal/ReservationModal";
import RouteModal from "../Modal/RouteModal";
import LocationModal from "../Modal/LocationModal";
import Location1Modal from "../Modal/Location1Modal";

export default function TransportationTable() {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);
  const toggle2 = () => setModal2(!modal2);
  const toggle3 = () => setModal3((p) => !p);
  const [city, setCity] = useState([]);

  const _form = {
    route: "",
    mov_type: "",
    pickup_from: "",
    pickup_to: "",
    adult: "",
    child: "",
    pickup_date: "",
    transport_company: "",
    transport_type: "",
    qty: "",
    sale_rate: "",
    total: "",
    discount: "",
    vat: "",
    net_total: "",
    purch_rate: "",
    vat_amount: "",
    vat_cost: "",
    flight: "",
    flight_no: "",
    city: "",
    arrive_or_dep_time: "",
    remark: "",
    query_type: "insert_transport",
    reservation_number: "",
  };
  // useEffect(()=>{
  //   setData([_form])
  // },[])
  const [form, setForm] = useState(_form);
  const [data, setData] = useState([_form]);
  const [transport, setTransport] = useState([_form]);
  const query = useQuery();
  const agent_name = query.get("agent_name");
  const transport_company = query.get("transport_company");
  const guest_name = query.get("guest_name");
  const transport_type = query.get("transport_type");

  const handleChange1 = (name, value, index) => {
    let arr = [];
    data?.forEach((item, i) => {
      if (i === index) {
        let total = parseFloat(value) + parseFloat(item.sale_rate || 0);
        let discount = parseFloat(total) * 0.05;
        let vat = parseFloat(total) * 0.05;
        let net_total =
          parseFloat(total) + parseFloat(discount) + parseFloat(vat);

        arr.push({
          ...item,
          [name]: value,
          total,
          discount,
          vat,
          net_total,
        });
      } else {
        arr.push(item);
      }
    });
    setData(arr);
  };

  const handleChange2 = (name, value, index) => {
    let arr = [];
    data?.forEach((item, i) => {
      if (i === index) {
        let total = parseFloat(item.qty || 0) * parseFloat(value);
        let discount = parseFloat(total) * 0.05;
        let vat = parseFloat(total) * 0.05;
        let net_total =
          parseFloat(total) + parseFloat(discount) + parseFloat(vat);

        arr.push({
          ...item,
          [name]: value,
          total,
          discount,
          vat,
          net_total,
        });
      } else {
        arr.push(item);
      }
    });
    setData(arr);
  };

  const handleChange3 = (name, value, index) => {
    let arr = [];
    data?.forEach((item, i) => {
      if (i === index) {
        let fivePercent = parseFloat(value) * 0.05;
        let vat_cost = parseFloat(value) * 0.15;

        arr.push({
          ...item,
          [name]: value,
          vat_amount: fivePercent,
          vat_cost,
        });
      } else {
        arr.push(item);
      }
    });
    setData(arr);
  };

  const handleChange = (name, value) => {
    let arr = [];
    data?.forEach((item, i) => {
      arr.push({ ...item, [name]: value });
    });
    setData(arr);
  };
  // const handleChange = ({target:{name, value}}) => {
  //   setForm(p => ({[name]: value}))
  // }

  const handleAdd = () => {
    if (data.length) {
      setData((p) => [...p, data[0]]);
    } else {
      setData([form]);
    }
  };

  function handleDelete(id) {
    const deleteRow = data.filter((p, idc) => idc !== id);
    setData(deleteRow);
  }
  const handleSubmiting = () => {
    let completeData = data.map((a) => ({
      ...a,
      reservation_number: form.reservation_number,
    }));
    _post(
      "api/new_reservation2?query_type=insert",
      completeData,
      (res) => {
        if (res.success) {
          alert("Successful");
        }
        setData([]);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    _get(
      "api/get_locations?query_type=select_location",
      (res) => {
        //   navigate(`/agent`)
        console.log(res);
        setCity(res.results);
      },
      (err) => {
        // setLoading(false)
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    _get(
      "api/get_transport?query_type=select_transport_company",
      (res) => {
        //   navigate(`/agent`)
        console.log(res);
        setTransport(res.results);
      },
      (err) => {
        // setLoading(false)
        console.log(err);
      }
    );
  }, []);

  return (
    <Card className="app_card dashboard_card shadow p-3 m-3">
      <Row>
        <h5 className="app_title" style={{ fontSize: 30, width: "80%" }}>
          Create Transport Reservation
        </h5>
        {/* {JSON.stringify(data)} */}

        <div style={{ overflowX: "auto", marginTop: 20 }}>
          <Row>
            <Col md={3}>
              <b>Agent Name:</b> {agent_name}
            </Col>
            <Col md={3}>
              <b>Transport Company:</b> {transport_company}
            </Col>
            <Col md={3}>
              <b>Guest Name:</b> {guest_name}
            </Col>
            <Col md={3}>
              <b>Transport Type:</b> {transport_type}{" "}
            </Col>
          </Row>
          {/* {JSON.stringify(data)} */}
          <Col md={4} className="mt-3">
            <label className="Label mt-2">Reservation Number</label>
            <div className="search_input_form">
              <input
                className="app_input3"
                value={form.reservation_number}
                onChange={handleChange}
                name="reservation_number"
                type="number"
                disabled
              />
              <CiSearch className="search_icon" onClick={toggle3} />
              <Modal isOpen={modal3} toggle={toggle3} size="xl">
                <ReservationModal
                  handleChange={(k, v) => setForm((p) => ({ ...p, [k]: v }))}
                  toggle3={toggle3}
                />
              </Modal>
            </div>
          </Col>
          {/* {JSON.stringify(transport)} */}
          <table id="customers" className="mt-3">
            <thead>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Route
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Mov type
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Pickup From
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Pickup To
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Adult
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Child
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Pickup Date
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Transport Company
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Transport Type
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Sale Rate
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Total
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Discount
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Vat %
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Net Total
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Purch Rate
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Vat Amount%
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Vat Cost %
              </th>{" "}
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Flight
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Flight No
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                City
              </th>{" "}
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Arrive Or Dep Time
              </th>{" "}
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Remark
              </th>
              <th
                style={{
                  border: "1px solid #0d3a73",
                  padding: "5px 10px",
                }}
              >
                Action
              </th>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <div
                      className="search_input_form"
                      style={{ width: 150, border: "none" }}
                    >
                      <input
                        className="app_input3"
                        value={item.route}
                        name="route"
                        // type="number"
                        onChange={(e) => {
                          let val = e.target.value;
                          handleChange("route", val, idx);
                        }}
                      />
                      <CiSearch className="search_icon" onClick={toggle} />
                      <Modal isOpen={modal} toggle={toggle} size="xl">
                        <RouteModal
                          handleChange={handleChange}
                          toggle={toggle}
                        />
                      </Modal>
                    </div>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <input
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      className="app_input3"
                      value={item.mov_type}
                      name="mov_type"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("mov_type", val, idx);
                      }}
                    />
                    {/* <select
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      id="exampleSelect"
                      className="app_input_table"
                      value={item.mov_type}
                      name="mov_type"
                      type="select"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("mov_type", val, idx);
                      }}
                    >
                      <option>----select-----</option>
                      <option value="direct ">Direct </option>
                      <option value="allotment ">Allotment </option>
                      <option value="broker ">Broker </option>
                      <option value="agent ">Agent </option>
                    </select> */}
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <div
                      className="search_input_form"
                      style={{ width: 150, border: "none" }}
                    >
                      <input
                        className="app_input3"
                        value={item.pickup_from}
                        name="pickup_from"
                        onChange={(e) => {
                          let val = e.target.value;
                          handleChange("pickup_from", val, idx);
                        }}
                      />
                      <CiSearch className="search_icon" onClick={toggle1} />
                      <Modal isOpen={modal1} toggle={toggle1} size="xl">
                        <LocationModal
                          handleChange={handleChange}
                          toggle1={toggle1}
                        />
                      </Modal>
                    </div>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <div
                      className="search_input_form"
                      style={{ width: 150, border: "none" }}
                    >
                      <input
                        className="app_input3"
                        value={item.pickup_to}
                        name="reservation_number"
                        onChange={(e) => {
                          let val = e.target.value;
                          handleChange("pickup_to", val, idx);
                        }}
                      />
                      <CiSearch className="search_icon" onClick={toggle2} />
                      <Modal isOpen={modal2} toggle={toggle2} size="xl">
                        <Location1Modal
                          handleChange={handleChange}
                          toggle2={toggle2}
                        />
                      </Modal>
                    </div>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.adult}
                      name="adult"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("adult", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.child}
                      name="child"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("child", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.pickup_date}
                      name="pickup_date"
                      type="date"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("pickup_date", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <select
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      className="app_input_table"
                      value={item.transport_company}
                      name="transport_company"
                      type="select"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("transport_company", val, idx);
                      }}
                    >
                      <option>----select-----</option>
                      {transport?.map((i) => (
                        <option value={i.transport_company}>
                          {i.transport_company}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <select
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      className="app_input_table"
                      value={item.transport_type}
                      name="transport_type"
                      type="select"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("transport_type", val, idx);
                      }}
                    >
                      <option>----select-----</option>
                      {transport?.map((i) => (
                        <option value={i.transport_type}>
                          {i.transport_type}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.qty}
                      name="qty"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange1("qty", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.sale_rate}
                      name="sale_rate"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange2("sale_rate", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.total}
                      name="total"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange1("total", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.discount}
                      name="discount"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("discount", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.vat}
                      name="vat"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("vat", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.net_total}
                      name="net_total"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("net_total", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.purch_rate}
                      name="purch_rate"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange3("purch_rate", val, idx);
                      }}
                      type="number"
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.vat_amount}
                      name="vat_amount"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange3("vat_amount", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.vat_cost}
                      name="vat_cost"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange3("vat_cost", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <select
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      id="exampleSelect"
                      className="app_input_table"
                      value={item.flight}
                      name="flight"
                      type="select"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("flight", val, idx);
                      }}
                    >
                      <option>----select-----</option>
                      {/* <option value="direct ">Direct </option>
                      <option value="allotment ">Allotment </option>
                      <option value="broker ">Broker </option>
                      <option value="agent ">Agent </option> */}
                    </select>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.flight_no}
                      name="flight_no"
                      type="number"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("flight_no", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <select
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      className="app_input_table"
                      value={item.city}
                      name="city"
                      type="select"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("city", val, idx);
                      }}
                    >
                      <option>----select-----</option>
                      {city?.map((i) => (
                        <option value={i.city}>{i.city}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 150,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.arrive_or_dep_time}
                      name="arrive_or_dep_time"
                      type="time"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("arrive_or_dep_time", val, idx);
                      }}
                    />
                  </td>
                  <td style={{ border: "1px solid #0d3a73" }}>
                    <InputForm
                      style={{
                        width: 100,
                        border: "none",
                      }}
                      className="app_input"
                      value={item.remark}
                      name="remark"
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange("remark", val, idx);
                      }}
                    />
                  </td>
                  <td>
                    <div>
                      <button
                        // className="app_button"
                        style={{
                          width: 50,
                        }}
                        onClick={() => handleDelete(idx)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="mt-5 text-center"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            className="p-2 app_button"
            style={{ width: 100 }}
            onClick={handleAdd}
          >
            Add Row
          </button>
          <button
            className="p-2 app_button"
            style={{ width: 100 }}
            onClick={handleSubmiting}
          >
            Submit
          </button>
        </div>
      </Row>
    </Card>
  );
}
