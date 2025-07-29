import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Nav,
  Form,
  Spinner,
  Modal,
  ModalBody,
} from "react-bootstrap";
import "./OrderList.css";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { Countdown } from "../../Transaction/Booking_Maintenance/Get_Booking_Maintenance";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchOrder } from "../../Redux/action";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import NotificationSound from "./mixkit-happy-bells-notification-937.wav";

import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
// import "../../../Table.css";
const OrderList = () => {
  const dispatch = useDispatch();
  const prevDataRef = useRef();
  const [neworderdata, setNewOrderData] = useState([]);

  const datalist = useSelector((state) => state.orderlist);

  const audioPlayer = useRef(null);

  // function playAudio() {
  //   audioPlayer.current.play();
  // }
  // const showToast = () => {
  //   let toastId = null;

  //   const showCustomToast = () => {
  //       toastId = toast.success((t) => (
  //           <div className="custom-toast" >
  //                   <div className="toast-content">
  //                   <div className="row toast-header">
  //                     <div className="col-10">

  //                     <h4 className="toast-title">{neworderdata.tcstnam}</h4>

  //                     </div>
  //                     <div className="col-2">
  //                     <button
  //                       style={{ backgroundColor: "red", border: "none", color: "white"  }}
  //                           className="close-toast-btn"
  //                           onClick={() => {
  //                               toast.dismiss(t.id);
  //                           }}
  //                       >
  //                           &times;
  //                       </button>
  //                     </div>

  //                   </div>
  //                   <div className="toast-body">
  //                       <p>Order Amount: {neworderdata.tordamt}</p>
  //                   </div>
  //               </div>
  //           </div>
  //       ));
  //   };

  //   if (!toastId) {
  //       showCustomToast();
  //   }
  // };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [statusdata, setstatusdata] = useState([]);
  const statuschangepassdata = (row) => {
    setModalOpen(true);
    setstatusdata(row);
  };

  const [selectedStatus, setSelectedStatus] = useState("Delivered");
  function UpdateStatus() {
    const data = {
      status: selectedStatus,
      id: statusdata.id,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/chef_kitchen/OrderDelivered.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          setModalOpen(false);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const [lengthNew, setLengthNewFuncion] = useState(0);
  let previousLength = 0;

  const fetchDataNewFunction = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/nosh_grill/OrderList.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      if (Array.isArray(jsonData) && jsonData.length > previousLength) {
        const newOrders = jsonData.slice(previousLength);
        newOrders.forEach((order) => {
          // showToast();
        });
        previousLength = jsonData.length;
      }

      setLengthNewFuncion(jsonData.length);
      const lastRow = jsonData[0];
      setNewOrderData(lastRow);
    } catch (error) {
      console.error(error);
    }
  };

  const [lengthOld, setLengthOldFuncion] = useState(0);
  const fetchDataOldFunction = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/chef_kitchen/OrderList.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setLengthOldFuncion(jsonData.length);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = () => {
      // console.log("fetchOrder fetchOrder... fetchOrder every 5 seconds");
      dispatch(fetchOrder());
      fetchDataOldFunction();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const fetchData = () => {
      // console.log("Fetching data... dispatching every 3 seconds");
      // showToast();
      // playAudio();

      fetchDataNewFunction();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php";
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Item");
  };

  useEffect(() => {
    // console.log("datalist=============");

    if (datalist?.data && Array.isArray(datalist.data)) {
      const transformedData = datalist.data.map((item) => ({
        id: item.id,
        tcstnam: item.tcstnam,
        tordadd: item.tordadd,
        tmobnum: item.tmobnum,
        tcuteml: item.tcuteml,
        tordamt: item.tordamt,
        tordsts: item.tordsts,
      }));

      if (lengthNew > lengthOld) {
        // console.log("New Order Received=============");
        // showToast();
        // playAudio();
      }
      // console.log("skljdfksjfl",lengthNew, lengthOld);

      const columns = [
        { label: "Code", field: "tgrpid", sort: "asc" },
        { label: "Name", field: "tgrpdsc", sort: "asc" },
        { label: "Address", field: "tgrpid", sort: "asc" },
        { label: "Mobile", field: "tgrpid", sort: "asc" },
        { label: "Email", field: "tgrpid", sort: "asc" },
        { label: "Amount", field: "tgrpid", sort: "asc" },
        { label: "Status", field: "tgrpid", sort: "asc" },
        { label: "More..", field: "tgrpid", sort: "asc" },
      ];

      setData({ columns, rows: transformedData });
      setLength(transformedData.length);
    }
  }, [datalist?.data]);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.tcstnam &&
        row.tcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tordsts &&
        row.tordsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);
  const [color, setColor] = useState(null);
  const handleRowClick = (row) => {
    console.log("row", row);
    navigate(`/OrderList_Info/${row.id}`);

    setColor(row.id);
    if (selectedRow === row.id) {
      // If the clicked row is already selected, navigate to the update screen
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.id);
    }
  };
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/MainPage");
  };
  const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 12px;
    color: black;
  }

  ::-webkit-scrollbar-track {
    background: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1F2670;
    border-radius: 6px;
  }
`;
  return (
    <>
      <audio ref={audioPlayer} src={NotificationSound} />

      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      {/* <header
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#1f2670",
          display: "flex",
          // justifyContent:'center',
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "60px", marginRight: "20px" }}>
          <p
            style={{
              margin: "0",
              fontFamily: "Sans-serif",
              fontWeight: "700",
              fontSize: "15px",
              lineHeight: "1",
              textAlign: "left",
              color: "white",
            }}
          >
            Files &nbsp;&gt;&nbsp; Item Maintenance
          </p>
        </div>
      </header> */}
      <div
        className="col-12"
        style={{
          backgroundColor: "#F5F5F5",
          color: secondaryColor,
        }}
      >
        <br />
        <div
          className="Order-table"
          style={{
            backgroundColor: "#F5F5F5",
          }}
          // style={{
          //   marginLeft: "10%",
          //   marginRight: "10%",
          //   maxWidth: "80%",
          //   padding: "15px",
          //   border: "1px solid gray",
          //   backgroundColor: "white",
          // }}
        >
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{
              backgroundColor: "#3368b5",
              color: "#fff",
              height: "24px",
            }}
          >
            <div
              className="col-4 "
              style={{ display: "flex", marginTop: "-5px" }}
            >
              <Link to="/Add_Item">
                <i
                  className="fa-solid fa-arrow-right fa-md topBtn"
                  title="Next Page"
                ></i>
              </Link>

              <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
            </div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Order List</strong>
            </div>
            <div className="text-end col-4" style={{ marginTop: "-5px" }}>
              <Link to="/MainPage" className="topBtn">
                <i className="fa fa-close fa-2md crossBtn"></i>
              </Link>
            </div>
          </Nav>
          <div
            style={{
              backgroundColor: "#F5F5F5",
              marginTop: "1%",
            }}
          >
            <Row>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="form-control-item  search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Verdana",
              width: "100%",
              overflowX: "auto",
            }}
          >
            {/* <style>{customScrollbarStyle}</style> */}
            {data.rows.length > 0 ? (
              <MDBTable
                scrollY
                maxHeight="63vh"
                stripedss
                bordered
                small
                responsive
              >
                <MDBTableHead>
                  <tr>
                    {data.columns.map((column, columnIndex) => (
                      <th
                        key={columnIndex}
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          border: "1px solid black",
                          top: -1,
                          textAlign: "center",
                          zIndex: 1,
                        }}
                      >
                        {""}
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredRows.length === 0 ? (
                    <>
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 84
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({ length: 8 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center" }}>
                          <div style={{ position: "relative" }}>
                            <Spinner animation="border" variant="primary" />
                          </div>
                        </td>
                      </tr>
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 75) / 84
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({ length: 8 }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredRows.map((row, index) => (
                        <tr key={index}>
                          <td style={{ width: "5%" }}>{row.id}</td>
                          <td style={{ width: "15%", textAlign: "left" }}>
                            {" "}
                            {row.tcstnam}
                          </td>
                          <td style={{ width: "25%", textAlign: "left" }}>
                            {row.tordadd}
                          </td>
                          <td style={{ width: "10%", textAlign: "right" }}>
                            {row.tmobnum}
                          </td>
                          <td style={{ width: "15%", textAlign: "left" }}>
                            {row.tcuteml}
                          </td>
                          <td style={{ width: "5%", textAlign: "right" }}>
                            {row.tordamt}
                          </td>
                          <td style={{ width: "5%" }}>
                            {row.tordsts === "PAID" && (
                              <button
                                style={{
                                  width: "70px",
                                  color: "white",
                                  backgroundColor: "green",
                                  border: "none",
                                }}
                              >
                                Delivered
                              </button>
                            )}
                            {row.tordsts === "Order" && (
                              <button
                                style={{
                                  width: "70px",
                                  backgroundColor: "Blue",
                                  border: "none",
                                  color: "white",
                                }}
                                onClick={() => statuschangepassdata(row)}
                              >
                                InProcess
                              </button>
                            )}
                            {row.tordsts === "Fraud" && (
                              <button
                                style={{
                                  width: "70px",
                                  backgroundColor: "Red",
                                  border: "none",
                                  color: "white",
                                }}
                                onClick={() => statuschangepassdata(row)}
                              >
                                Fraud
                              </button>
                            )}
                            {row.tordsts === "Pending" && (
                              <button
                                style={{
                                  width: "70px",
                                  backgroundColor: "red",
                                  border: "none",
                                  color: "white",
                                }}
                                onClick={() => statuschangepassdata(row)}
                              >
                                Pending
                              </button>
                            )}
                          </td>
                          <td
                            style={{ width: "5%" }}
                            onClick={() => handleRowClick(row)}
                          >
                            <button
                              style={{
                                width: "70px",
                                backgroundColor: "#3368b5",
                                border: "none",
                                color: "white",
                              }}
                            >
                              {" "}
                              Info..
                            </button>
                          </td>
                        </tr>
                      ))}

                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 40
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 8,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <div>
                <MDBTable
                  scrollY
                  maxHeight="63vh"
                  striped
                  bordered
                  small
                  responsive
                >
                  <MDBTableHead>
                    <tr>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          border: "1px solid black",
                          top: -1,
                          textAlign: "center",
                          zIndex: 1,
                        }}
                      >
                        Code
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Address
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Mobile
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        Status
                      </th>
                      <th
                        style={{
                          height: "24px",
                          backgroundColor: "#c6daf7",
                          color: "black",
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          textAlign: "center",
                          border: "1px solid black",
                          zIndex: 1,
                        }}
                      >
                        More
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td
                        colSpan="8"
                        style={{ fontWeight: "bold", color: primaryColor }}
                      >
                        looding....
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 80
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 8,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center" }}>
                        <div style={{ position: "relative" }}>
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </td>
                    </tr>
                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 80
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 8,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}></td>
                        ))}
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            )}
          </div>

          <Modal show={isModalOpen} onHide={handleCloseModal}>
            <Nav
              className="col-12 d-flex justify-content-between"
              style={{
                backgroundColor: "#3368b5",
                color: "#fff",
                height: "24px",
              }}
            >
              <div className="col-4 ">
                <i className="fa fa-refresh fa-lg topBtn" title="Refresh"></i>
              </div>
              <div style={{ fontSize: "14px" }} className="col-4 text-center">
                <strong>Status Change</strong>
              </div>
              <div className="text-end col-4">
                <Link onClick={handleCloseModal} className="topBtn">
                  <i className="fa fa-close fa-lg crossBtn"></i>
                </Link>
              </div>
            </Nav>
            <Modal.Body>
              <div className="row">
                <div className="col-md-3 " style={{ textAlign: "right" }}>
                  Status:
                </div>
                <div className="col-md-3 input-area">
                  <Form.Group
                    controlId="status"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Form.Control
                      as="select"
                      name="AreStss"
                      className="form-control-area custom-select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      style={{
                        height: "30px",
                        width: "100px",
                        fontSize: "11px",
                      }}
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Cancel">Cancel</option>
                      <option value="Fraud">Fraud</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-3 label-area"></div>
                <div className="col-3">
                  <button
                    onClick={UpdateStatus}
                    style={{
                      backgroundColor: "#3368b5",
                      color: "white",
                      border: "none",
                      width: "100px",
                    }}
                  >
                    Save
                  </button>{" "}
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <div
            className="col-12 border-dark border-top"
            style={{
              backgroundColor: "#F5F5F5",
              height: "24px",
            }}
          >
            <input
              type="text"
              value={Length}
              className="text-center"
              disabled
              style={{
                fontSize: "12px",
                width: "4%",
                height: "28px",
                backgroundColor: "white",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default OrderList;
