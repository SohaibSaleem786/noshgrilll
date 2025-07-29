import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OrderList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../Redux/action";
import Receipt from "../print/Receipt";
import ReactToPrint from "react-to-print";

function OrderList_Info() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);
  const ref = useRef();
  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);

  const [nextItemId, setNextItemId] = useState(0);
  const [getfrefcod, setfrefcod] = useState("");
  const [getfrefcoddesc, setfrefcoddesc] = useState("");
  const [getquantity, setquantity] = useState("");
  const [rows, setRows] = useState([]);
  const [dateFormate, setDateFormate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [alertData, setAlertData] = useState(null);
  const [isModalOpenAccount, setModalOpenAccount] = useState(false);
  const [isModalOpenItem, setModalOpenItem] = useState(false);

  const [searchTextAccount, setSearchTextAccount] = useState("");
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const SaleNo = useRef(null);
  const ItemCode = useRef(null);
  const ItemDescription = useRef(null);
  const QUANTITY = useRef(null);
  const Remarks = useRef(null);
  const Submit = useRef(null);
  const Clear = useRef(null);
  const Return = useRef(null);
  const tableRef = useRef(null);
  const Card1 = useRef(null);
  const Card2 = useRef(null);
  const Card3 = useRef(null);
  const Card4 = useRef(null);
  const formattedTime = new Date().toLocaleTimeString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/umair_electronic/web/INVNumber.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeout(() => {
          setNextItemId(data.num);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
      const transformedData = datalist.data.map((item) => ({
        TItmId: item.TItmId,
        dscription: item.dscription,
        dscription1: item.dscription1,
        dscription2: item.dscription2,
        dscription3: item.dscription3,
        dscription4: item.dscription4,
        dscription5: item.dscription5,
        amount1: item.amount1,
        amount2: item.amount2,
        amount3: item.amount3,
        amount4: item.amount4,
        amount5: item.amount5,
      }));
      // setItemdata(transformedData); // Use setItemdata
    }
  }, [datalist.data]);
  const [totalamount, setTotalAmount] = useState(0);
  const [totalquantity, settotalquantity] = useState(0);
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;

    if (name === "CustomerCode") {
      let rawValue = value.replace(/\D/g, "");
      setfrefcod(rawValue);

      const selectedItem =
        datalist.data && datalist.data.find((item) => item.TItmId === rawValue);
      if (selectedItem) {
        setfrefcoddesc(selectedItem.dscription);
      } else {
        setfrefcoddesc("");
      }
    }
    if (name === "getquantity") {
      setquantity(value);
    }
  };

  const handleKeyPress = (e) => {
    const { name, value } = e.target;
    if (name === "getquantity") {
      if (e.key === "Enter") {
        e.preventDefault();
        if (getfrefcod && getfrefcoddesc && getquantity) {
          setSelectedItem(
            datalist.data.find((item) => item.TItmId === getfrefcod)
          );
          setModalOpenItem(true);
          handleEnterKeyPress(ItemCode, e);
        } else {
          if (!getfrefcoddesc) {
          }
          setAlertData({
            type: "error",
            message: "Please enter a valid account code and description",
          });
          setTimeout(() => {
            setAlertData(null);
          }, 3000);
        }
      }
    }
    if (name === "ItemCode") {
      if (e.key === "Enter") {
        e.preventDefault();
        if (getfrefcod && getfrefcoddesc && getquantity) {
          setSelectedItem(
            datalist.data.find((item) => item.TItmId === getfrefcod)
          );
          setModalOpenItem(true);
          handleEnterKeyPress(ItemCode, e);
        } else {
          if (!getfrefcoddesc) {
            setModalOpenAccount(true);
          }
          setAlertData({
            type: "error",
            message: "Please enter a valid account code and description",
          });
          setTimeout(() => {
            setAlertData(null);
          }, 3000);
        }
      }
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };

  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleClear = () => {
    setfrefcod("");
    setfrefcoddesc("");
    SaleNo.current.focus();
  };

  const handleReturn = () => {
    navigate("/MainPage");
  };

  const filteredRowsAccount = (datalist.data || []).filter(
    (row) =>
      (row.TItmId &&
        row.TItmId.toLowerCase().includes(searchTextAccount.toLowerCase())) ||
      (row.dscription &&
        row.dscription.toLowerCase().includes(searchTextAccount.toLowerCase()))
  );

  const handleSearchChangeAccount = (event) => {
    const upperCaseValue = event.target.value.toUpperCase();
    setHighlightedRowIndex(0);
    setSearchTextAccount(upperCaseValue);
  };

  const handleDoubleClickAccount = () => {
    setModalOpenAccount(true);
  };

  const handleCloseModalAccount = () => {
    setModalOpenAccount(false);
  };

  const handleCloseModalItem = () => {
    setModalOpenItem(false);
  };

  const handleRowClickAccount = (rowData) => {
    setModalOpenAccount(false);
    setfrefcod(rowData.TItmId);
    setfrefcoddesc(rowData.dscription);
  };

  const handleSelectItem = (quantity, item, description, amountt) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: item.TItmId,
        titmdsc: `${item.dscription}( ${description} )`,
        tsalrat: amountt,
        titmqnt: quantity,
        salamt: quantity * amountt,
      },
    ]);

    setModalOpenItem(false);
    setfrefcod("");
    setfrefcoddesc("");
    setquantity("");
  };
  useEffect(() => {
    const totalAmountt = rows.reduce(
      (accumulator, item) => accumulator + parseInt(item.salamt, 10) || 0,
      0
    );

    const totalQuantity = rows.reduce(
      (accumulator, item) => accumulator + parseInt(item.titmqnt, 10) || 0,
      0
    );

    settotalquantity(totalQuantity);
    setTotalAmount(totalAmountt);
  }, [rows]);
  useEffect(() => {
    ItemCode.current.focus();
    if (isModalOpenItem && Card1.current) {
      Card1.current.focus();
    }
  }, [isModalOpenItem]);

  const handleCardKeyPress = (e, currentCard, nextCard, selectItem) => {
    if (e.key === "ArrowRight" && nextCard.current) {
      nextCard.current.focus();
    } else if (e.key === "ArrowLeft" && currentCard.current) {
      currentCard.current.focus();
    } else if (e.key === "Enter") {
      selectItem();
    }
  };

  const firstcolwidth = "60px";
  const secondcolwidth = "360px";
  const thirdcolwidth = "100px";
  const fourthcolwidth = "100px";
  const fifthcolwidth = "100px";
  const sixthcolwidth = "100px";
  // now we need to delete function and sath hi update our total aount and total quantity

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleEditRow = (index, editedData) => {
    const updatedRows = [...rows];
    updatedRows[index] = editedData;
    setRows(updatedRows);
  };
  const receiptRef = useRef();
  const printRef = useRef();

  // Function to handle keydown event
  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === "p") {
      handlePrint();
    }
  };

  // Function to trigger the print action
  const handlePrint = () => {
    if (printRef.current) {
      printRef.current.handlePrint();
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container fluid className="sales-order-container">
      <Row className="header-section mb-4">
        <Col md={12}>
          <h1 className="header-title">Sales Order</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="custom-card">
            <Form>
              <Form.Group controlId="SaleNo">
                <Form.Label>Sale No:</Form.Label>
                <Form.Control
                  type="text"
                  ref={SaleNo}
                  value={nextItemId}
                  onFocus={() => handleFocus(SaleNo)}
                  onBlur={() => handleBlur(SaleNo)}
                  onKeyDown={(e) => handleEnterKeyPress(SaleNo, e)}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group controlId="getfrefcod">
                <Form.Label>Item Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="CustomerCode"
                  ref={ItemCode}
                  value={getfrefcod}
                  onChange={handleInputChange3}
                  onDoubleClick={handleDoubleClickAccount}
                  // onFocus={() => handleFocus(CustomerCode)}
                  // onBlur={() => handleBlur(CustomerCode)}
                  onKeyDown={(e) => {
                    if (getfrefcod.length === 0) {
                      return;
                    } else {
                      handleEnterKeyPress(QUANTITY, e);
                    }
                  }}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group controlId="getfrefcoddesc">
                <Form.Label>Item Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="CustomerName"
                  ref={ItemDescription}
                  value={getfrefcoddesc}
                  // onFocus={() => handleFocus(CustomerName)}
                  // onBlur={() => handleBlur(CustomerName)}
                  onKeyDown={(e) => handleEnterKeyPress(ItemDescription, e)}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group controlId="getquantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  name="getquantity"
                  ref={QUANTITY}
                  value={getquantity}
                  onChange={handleInputChange3}
                  onKeyDown={handleKeyPress}
                  // onFocus={() => handleFocus(QUANTITY)}
                  // onBlur={() => handleBlur(QUANTITY)}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group controlId="Remarks">
                <Form.Label>Remarks:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  ref={Remarks}
                  // onFocus={() => handleFocus(Remarks)}
                  // onBlur={() => handleBlur(Remarks)}
                  onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                  className="input-field"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ borderRadius: "0px" }}
                onFocus={() => handleFocus(Submit)}
                onBlur={() => handleBlur(Submit)}
                onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
              >
                Submit
              </Button>

              <div>
                <div style={{ display: "none" }}>
                  <Receipt
                    newOrderData={12}
                    ref={receiptRef}
                    detailItem={rows}
                    priceDiscount={20}
                    percentageDiscount={500}
                    totalAmount={totalamount}
                  />
                </div>
                <ReactToPrint
                  bodyClass="print-receipt"
                  content={() => receiptRef.current}
                  trigger={() => (
                    <div>
                      <img
                        // Uncomment and provide the src for the image if needed
                        // src={Print}
                        alt="Print"
                        style={{ height: "3vh", width: "60%" }}
                      />
                    </div>
                  )}
                  ref={printRef}
                />
              </div>
              <Button
                variant="danger"
                style={{ borderRadius: "0px" }}
                onClick={handleReturn}
                onFocus={() => handleFocus(Return)}
                onBlur={() => handleBlur(Return)}
                onKeyDown={(e) => handleEnterKeyPress(Return, e)}
              >
                Return
              </Button>
            </Form>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="custom-card">
            <table className="custom-table" ref={tableRef}>
              <thead>
                <tr>
                  <th
                    style={{
                      width: firstcolwidth,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Code
                  </th>
                  <th
                    style={{
                      width: secondcolwidth,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      width: thirdcolwidth,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      width: fourthcolwidth,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      width: fifthcolwidth,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      width: sixthcolwidth,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td style={{ width: firstcolwidth }}>{row.id}</td>
                    <td style={{ width: secondcolwidth, textAlign: "left" }}>
                      {row.titmdsc}
                    </td>
                    <td style={{ width: thirdcolwidth }}>{row.tsalrat}</td>
                    <td style={{ width: fourthcolwidth }}>{row.titmqnt}</td>
                    <td style={{ width: fifthcolwidth }}>{row.salamt}</td>
                    <td
                      style={{ width: sixthcolwidth }}
                      onClick={(e) => {
                        handleDeleteRow(row.Id);
                      }}
                    >
                      <i
                        className="fa-solid fa-trash fa-md topBtn"
                        style={{ color: "white" }}
                        title="Delete"
                      />
                    </td>
                  </tr>
                ))}
                {Array.from({
                  length: Math.max(0, 15 - rows.length),
                }).map((_, index) => (
                  <tr key={`blank-${index}`}>
                    <td style={{ width: firstcolwidth }}>&nbsp;</td>
                    <td style={{ width: secondcolwidth }}>&nbsp;</td>
                    <td style={{ width: thirdcolwidth }}>&nbsp;</td>
                    <td style={{ width: fourthcolwidth }}>&nbsp;</td>
                    <td style={{ width: fifthcolwidth }}>&nbsp;</td>
                    <td style={{ width: sixthcolwidth }}>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ width: firstcolwidth }}>&nbsp;</td>
                  <td style={{ width: secondcolwidth }}>&nbsp;</td>
                  <td style={{ width: thirdcolwidth }}>&nbsp;</td>
                  <td style={{ width: fourthcolwidth, color: "black" }}>
                    {totalquantity}
                  </td>
                  <td style={{ width: fifthcolwidth, color: "black" }}>
                    {totalamount}
                  </td>
                  <td style={{ width: sixthcolwidth, color: "black" }}></td>
                </tr>
              </tfoot>
            </table>
          </Card>
        </Col>
      </Row>
      <Modal
        show={isModalOpenAccount}
        onHide={handleCloseModalAccount}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="SearchAccount">
            <Form.Control
              type="text"
              value={searchTextAccount}
              onChange={handleSearchChangeAccount}
              placeholder="Search by code or description"
            />
          </Form.Group>
          <table className="custom-table">
            <thead>
              <tr>
                <th
                  style={{
                    width: firstcolwidth,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Code
                </th>
                <th
                  style={{
                    width: secondcolwidth,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRowsAccount.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClickAccount(row)}
                  className={index === highlightedRowIndex ? "highlighted" : ""}
                >
                  <td style={{ width: firstcolwidth }}>{row.TItmId}</td>
                  <td style={{ width: secondcolwidth }}>{row.dscription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAccount}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isModalOpenItem} onHide={handleCloseModalItem} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "black" }}>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black" }}>
          <Row>
            <Col>
              <Card
                style={{ backgroundColor: "#FFEB79", color: "black" }}
                ref={Card1}
                onKeyDown={(e) =>
                  handleCardKeyPress(e, Card1, Card2, () =>
                    handleSelectItem(
                      getquantity,
                      selectedItem,
                      selectedItem.dscription1,
                      selectedItem.amount1
                    )
                  )
                }
                tabIndex={0}
                className="modal-card"
              >
                <Card.Body>
                  <Card.Title>{selectedItem?.dscription1}</Card.Title>
                  <Card.Text>{selectedItem?.amount1}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card
                style={{ backgroundColor: "#FFEB79", color: "black" }}
                ref={Card2}
                onKeyDown={(e) =>
                  handleCardKeyPress(e, Card2, Card3, () =>
                    handleSelectItem(
                      getquantity,
                      selectedItem,
                      selectedItem.dscription2,
                      selectedItem.amount2
                    )
                  )
                }
                tabIndex={0}
                className="modal-card"
              >
                <Card.Body>
                  <Card.Title>{selectedItem?.dscription2}</Card.Title>
                  <Card.Text>{selectedItem?.amount2}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card
                style={{ backgroundColor: "#FFEB79", color: "black" }}
                ref={Card3}
                onKeyDown={(e) =>
                  handleCardKeyPress(e, Card3, Card4, () =>
                    handleSelectItem(
                      getquantity,
                      selectedItem,
                      selectedItem.dscription3,
                      selectedItem.amount3
                    )
                  )
                }
                tabIndex={0}
                className="modal-card"
              >
                <Card.Body>
                  <Card.Title>{selectedItem?.dscription3}</Card.Title>
                  <Card.Text>{selectedItem?.amount3}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card
                style={{ backgroundColor: "#FFEB79", color: "black" }}
                ref={Card4}
                onKeyDown={(e) =>
                  handleCardKeyPress(
                    e,
                    Card4,
                    Card1,
                    () =>
                      handleSelectItem(
                        getquantity,
                        selectedItem,
                        selectedItem.dscription4,
                        selectedItem.amount4
                      ),
                    setTimeout(() => {
                      ItemCode.current.focus();
                    }, 1000)
                  )
                }
                tabIndex={0}
                className="modal-card"
              >
                <Card.Body>
                  <Card.Title>{selectedItem?.dscription4}</Card.Title>
                  <Card.Text>{selectedItem?.amount4}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "black" }}></Modal.Footer>
      </Modal>
      {alertData && (
        <Alert severity={alertData.type} className="alert-message">
          {alertData.message}
        </Alert>
      )}
    </Container>
  );
}

export default OrderList_Info;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
// import axios from "axios";
// import Alert from "@mui/material/Alert";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import Header from "../../MainComponent/Header/Header";
// import Footer from "../../MainComponent/Footer/Footer";
// import "./OrderList.css";

// function OrderList_Info({ google }) {
//   const { id } = useParams();
//   const imageurl = "https://crystalsolutions.com.pk/chef_kitchen/itemimage/";

//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const [previewImage1, setPreviewImage1] = useState(null);
//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   const [getdata, setdata] = useState([]);
//   const [orderdata, setorderdata] = useState([]);
//   useEffect(() => {
//     fetch(`https://crystalsolutions.com.pk/chef_kitchen/OrderList.php?id=${id}`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         const user = apiData.find((item) => item.id === id);
//         setdata(user);
//         setorderdata(user.order);
//       })
//       .catch((error) => console.error(error));
//   }, [id]);

//   const navigate = useNavigate();
//   const [alertData, setAlertData] = useState(null);
//   const primaryColor = "#1f2670";
//   const fontFamily = "verdana";
// const latitude = parseFloat(getdata.lattitude);
// const longitude = parseFloat(getdata.longitude);
// console.log('latitude',getdata.lattitude);
// console.log('longitude',getdata.longitude);
// // Construct the URL for static map image with a marker
// const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=330x250&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`;

//   return (
//     <>
//       <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%",
//               zIndex: 1000,
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//         <Header />
//         {/* <Map google={google} zoom={14} initialCenter={{ lat: 19.876020, lng: 75.175591 }}>
//                   <Marker position={{ lat: getdata.lattitude, lng: getdata.longitude }} name={'Current location'} />
//                 </Map> */}
//                   <div className="col-12" style={{ backgroundColor: '#F5F5F5', color: "black", fontWeight: "bold", fontFamily: fontFamily }}>
//         <div className="col-4">
//         <div style={{ position: 'relative', width: '330px', height: '500px' }}>
//         <style>
//         {`
//           /* Hide the Google Maps error modal */
//           div[style*="background-color: white; font-weight: 500; font-family: Roboto, sans-serif;"] {
//             display: none !important;
//           }
//         `}
//       </style>
//       <style>
//         {`
//           /* Hide the "For development purposes only" message */
//           div[style*="z-index: 100000"] {
//             display: none !important;
//           }
//           div[style*="z-index: 100001"] {
//             display: none !important;
//           }
//           div[style*="z-index: 100002"] {
//             display: none !important;
//           }
//           div[style*="z-index: 100003"] {
//             display: none !important;
//           }
//         `}
//       </style>
//       <style>
//         {`
//           /* Hide the "For development purposes only" message */
//           div[style*="background: rgba(0, 0, 0, 0.5)"] {
//             display: none !important;
//           }
//           div[style*="padding: 15px; border-radius: 3px;"] {
//             display: none !important;
//           }
//         `}
//       </style>
//       <Map
//         google={google}
//         zoom={11}
//         initialCenter={{ lat: 31.4475, lng: 74.3081 }}
//         onError={(mapProps, map) => {
//           setAlertData({ type: 'error', message: 'Error loading Google Maps' });
//         }}
//       >
//         <Marker position={{ lat: latitude, lng: longitude }} name={'Current location'} />
//       </Map>
//             </div>
//         {/* <div style={{ position: 'relative', width: '330px', height: '250px' }}>
//     <iframe
//       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21521.428496345066!2d74.28761826955844!3d31.44941551342237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919014ca50af181%3A0x6630f48affe03d5d!2sTownship%20Lahore%2C%20Punjab%2C%20Pakistan!5e1!3m2!1sen!2sus!4v1716043008618!5m2!1sen!2sus"
//       width="330"
//       height="250"
//       style={{ position: 'absolute', top: 0, left: 0, border: '1px solid black' }}
//       allowfullscreen=""
//       loading="lazy"
//       referrerpolicy="no-referrer-when-downgrade">
//     </iframe>
//     <img src={staticMapUrl} alt="Marker" style={{ position: 'absolute', top: 0, left: 0 }} />
//   </div> */}
//   </div>

//           <div className="col-8 " style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5px", minHeight: "100vh", overflowY: "scroll", height: "calc(100vh - 200px)" }}>

//             <div className="col-md-12 form-item-container">
//               <Nav className="col-12 d-flex justify-content-between" style={{ backgroundColor: "#3368b5", color: "#fff", height: "24px" }}>
//                 <div className="col-4 " style={{ display: 'flex', marginTop: '-1%' }}>
//                   <Link>
//                     <i className="fa-solid fa-paper-plane fa-md topBtn" title="Next Page"></i>
//                   </Link>
//                   <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i>
//                 </div>
//                 <div style={{ fontSize: "14px" }} className="col-4 text-center">
//                   <strong>Info ..</strong>
//                 </div>
//                 <div className="text-end col-4" style={{ marginTop: '-1%' }}>
//                   <Link to="/OrderList" className="topBtn">
//                     <i className="fa fa-close fa-2md crossBtn"></i>
//                   </Link>
//                 </div>
//               </Nav>
//               <br />
//               <Form>
//                 <div className="row">
//                   <div className="col-sm-8 label-item"></div>
//                   <div className="col-sm-2">
//                     <Form.Control
//                       type="text"
//                       name="torddat"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.torddat}
//                     />
//                   </div>
//                   <div className="col-sm-2">
//                     <Form.Control
//                       type="text"
//                       name="tordtim"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tordtim}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-2 label-item">OrderId:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="id"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.id}
//                     />
//                   </div>
//                   <div className="col-sm-2 label-item">Status:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="tordsts"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tordsts}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-2 label-item">Name:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="tcstnam"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tcstnam}
//                     />
//                   </div>
//                   <div className="col-sm-2 label-item">Address:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="tordadd"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tordadd}
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-sm-2 label-item">Email:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="tcuteml"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tcuteml}
//                     />
//                   </div>
//                   <div className="col-sm-2 label-item">Mobile:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="tmobnum"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tmobnum}
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-sm-2 label-item">Quantity:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="titmqnt"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.titmqnt}
//                     />
//                   </div>
//                   <div className="col-sm-2 label-item">Amount:</div>
//                   <div className="col-sm-4">
//                     <Form.Control
//                       type="text"
//                       name="tordamt"
//                       className="form-control-item"
//                       disabled
//                       value={getdata.tordamt}
//                     />
//                   </div>
//                 </div>

//                 <MDBTable scrollY maxHeight="44vh" striped bordered small responsive>
//                   <MDBTableHead>
//                     <tr>
//                       <th
//                         style={{
//                           height: "16px",
//                           backgroundColor: "#c6daf7",
//                           color: "black",
//                           fontWeight: "bold",
//                           position: "sticky",
//                           border: "1px solid black",
//                           top: -1,
//                           textAlign: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         Id
//                       </th>
//                       <th
//                         style={{
//                           height: "16px",
//                           backgroundColor: "#c6daf7",
//                           color: "black",
//                           fontWeight: "bold",
//                           position: "sticky",
//                           border: "1px solid black",
//                           top: -1,
//                           textAlign: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         Item Description
//                       </th>
//                       <th
//                         style={{
//                           height: "16px",
//                           backgroundColor: "#c6daf7",
//                           color: "black",
//                           fontWeight: "bold",
//                           position: "sticky",
//                           border: "1px solid black",
//                           top: -1,
//                           textAlign: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         Sale Rate
//                       </th>
//                       <th
//                         style={{
//                           height: "16px",
//                           backgroundColor: "#c6daf7",
//                           color: "black",
//                           fontWeight: "bold",
//                           position: "sticky",
//                           border: "1px solid black",
//                           top: -1,
//                           textAlign: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         Quantity
//                       </th>
//                       <th
//                         style={{
//                           height: "16px",
//                           backgroundColor: "#c6daf7",
//                           color: "black",
//                           fontWeight: "bold",
//                           position: "sticky",
//                           border: "1px solid black",
//                           top: -1,
//                           textAlign: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         Amount
//                       </th>
//                       <th
//                         style={{
//                           height: "16px",
//                           backgroundColor: "#c6daf7",
//                           color: "black",
//                           fontWeight: "bold",
//                           position: "sticky",
//                           border: "1px solid black",
//                           top: -1,
//                           textAlign: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         User
//                       </th>
//                     </tr>
//                   </MDBTableHead>
//                   <MDBTableBody>
//                     <>
//                       {orderdata.map((row, index) => (
//                         <tr key={index}>
//                           <td style={{ width: '5%' }}>{row.tordid}</td>
//                           <td style={{ width: '25%', textAlign: 'left' }}> {row.titmdsc}</td>
//                           <td style={{ width: '10%', textAlign: 'right' }}>{row.tsalrat}</td>
//                           <td style={{ width: '10%', textAlign: 'right' }}>{row.titmqnt}</td>
//                           <td style={{ width: '10%', textAlign: 'right' }}>{row.salamt}</td>
//                           <td style={{ width: '10%', textAlign: "center" }}>{row.tuserid}</td>
//                         </tr>
//                       ))}
//                       {Array.from({
//                         length: Math.max(0, 10 - orderdata.length),
//                       }).map((_, index) => (
//                         <tr key={`blank-${index}`}>
//                           {Array.from({ length: 6 }).map((_, colIndex) => (
//                             <td key={`blank-${index}-${colIndex}`}>
//                               &nbsp;
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                       <tr>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td style={{ width: '30px', textAlign: 'right' }}>{getdata.titmqnt}</td>
//                         <td style={{ width: '10%', textAlign: 'right' }}>{getdata.tordamt}</td>
//                         <td></td>
//                       </tr>
//                     </>
//                   </MDBTableBody>
//                 </MDBTable>
//               </Form>
//             </div>
//           </div>
//           <br />
//         </div>

//       </div>
//       <Footer />
//     </>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyC4ZlmDgPLy0FAWvvGbg4lrv_TF1pYhQAI"
// })(OrderList_Info);

// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Nav,
//   Spinner,
// } from "react-bootstrap";

// import Alert from "@mui/material/Alert";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./OrderList.css";
// import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
// import { useDispatch, useSelector } from "react-redux";
// import { fetchItem, fetchChartofAccount, fetchRaw } from "../../Redux/action";
// function OrderList_Info() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const datalist = useSelector((state) => state.itemlist);

//   useEffect(() => {
//     dispatch(fetchItem());
//   }, [dispatch]);

//   const [nextItemId, setNextItemId] = useState(0);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://crystalsolutions.com.pk/umair_electronic/web/INVNumber.php"
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setTimeout(() => {
//           setNextItemId(data.num);
//         }, 1000);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [getfrefcod, setfrefcod] = useState();
//   const [getfrefcoddes, setfrefcoddesc] = useState();
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-${day
//     .toString()
//     .padStart(2, "0")}`;

//   const [dateFormate, setDateFormate] = useState(defaultFromDate);
//   const handleInputChange3 = (e) => {
//     const { name, value } = e.target;
//     const upperCaseValue = value.toUpperCase();
//     e.target.value = upperCaseValue;

//     if (name === "CustomerCode") {
//       let rawValue = value.replace(/\D/g, "");

//       setfrefcod(rawValue);

//       // Find the selected item based on the value
//       const selectedItem =
//         datalist.data && datalist.data.find((item) => item.TItmId === rawValue);
//       if (selectedItem) {
//         setfrefcoddesc(selectedItem.dscription);
//         console.log("selectedItem", selectedItem);
//       } else {
//         console.log("No matching item found");
//         setfrefcoddesc("");
//       }
//     }
//   };
//   const SaleNo = useRef(null);
//   const CustomerCode = useRef(null);
//   const CustomerName = useRef(null);
//   const DATE = useRef(null);
//   const Remarks = useRef(null);
//   const Submit = useRef(null);
//   const SearchBox = useRef(null);
//   const SearchBoxAccount = useRef(null);
//   const firstRowRef = useRef(null);
//   const tableRef = useRef(null);
//   const Return = useRef(null);
//   const Clear = useRef(null);
//   const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);

//   const today = new Date();

//   // Format the date to "dd/mm/yyyy"
//   const formattedTime = today.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true, // Use true for AM/PM format, false for 24-hour format
//   });
//   const [alertData, setAlertData] = useState(null);
//   const [itemdata, setitemdata] = useState([]);
//   const [searchTextAccount, setSearchTextAccount] = useState("");

//   useEffect(() => {
//     if (datalist.data && Array.isArray(datalist.data)) {
//       const transformedData = datalist.data.map((item) => ({
//         TItmId: item.TItmId,
//         dscription: item.dscription,
//       }));
//       console.log(
//         "transformedDatatransformedDatatransformedDatatransformedData",
//         transformedData
//       );
//       setitemdata(transformedData);
//     }
//   }, [datalist.data]);

//   const [isModalOpenAccount, setModalOpenAccount] = useState(false);

//   const handleSearchChangeAccount = (event) => {
//     const upperCaseValue = event.target.value.toUpperCase();
//     setHighlightedRowIndex(0);
//     setSearchTextAccount(upperCaseValue);
//   };
//   const handleDoubleClickAccount = (e) => {
//     setTimeout(() => {
//       focusNextInput(SearchBoxAccount);
//     }, 500);
//     setHighlightedRowIndex(0);
//     console.log("====== handle double click=======");
//     console.log("e.target.value", e.target.value);
//     setSearchTextAccount(e.target.value);
//     setModalOpenAccount(true);
//   };
//   const handleCloseModalAccount = () => {
//     setModalOpenAccount(false);
//   };

//   const handleRowClickAccount = (rowData, rowIndex) => {
//     console.log("handleRowClickAccount", rowData);
//     // setColorAccount(rowData.titmcod);

//     setModalOpenAccount(false);

//     setfrefcod(rowData.TItmId);
//     setfrefcoddesc(rowData.dscription);
//   };

//   const USEREF4 = useRef(null);
//   const USEREF8 = useRef(null);

//   // Function to focus on the next input field
//   const focusNextInput = (ref) => {
//     if (ref.current) {
//       ref.current.focus();
//     }
//   };
//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       focusNextInput(ref);
//     }
//   };

//   const filteredRowsAccount =
//     datalist.data &&
//     datalist.data.filter(
//       (row) =>
//         (row.TItmId &&
//           row.TItmId.toLowerCase().includes(searchTextAccount.toLowerCase())) ||
//         (row.dscription &&
//           row.dscription
//             .toLowerCase()
//             .includes(searchTextAccount.toLowerCase()))
//     );

//   const firstcolwidth = "50px";
//   const secondcolwidth = "100px";
//   const thirdcolwidth = "290px";
//   const fourthcolwidth = "90px";
//   const fifthcolwidth = "90px";
//   const sixthcolwidth = "90px";
//   const thirteenthcolwidth = "50px";
//   const firstColWidthModal = "150px";
//   const secondColWidthModal = "700px";

//   const [enterCount, setEnterCount] = useState(0);

//   const handleFocus = (codeparam) => {
//     if (codeparam.current) {
//       codeparam.current.style.backgroundColor = "orange";
//     }
//   };

//   const handleBlur = (codeparam) => {
//     if (codeparam.current) {
//       codeparam.current.style.backgroundColor = "#3368B5";
//     }
//   };
//   const handleSave = () => {
//     // handleFormSubmit();
//   };
//   const handleClear = () => {
//     setfrefcod("");
//     setfrefcoddesc("");

//     SaleNo.current.focus();
//   };
//   const handleReturn = () => {
//     navigate("/MainPage");
//   };
//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%",
//               zIndex: 1000,
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//         {/* <Header /> */}

//         <div
//           className="col-12"
//           style={{
//             backgroundColor: "white",
//             color: "black",
//             fontWeight: "bold",
//             fontFamily: "Verdana",
//           }}
//         >
//           <div
//             className="row"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               padding: "5px",
//               minHeight: "100vh",
//               overflowY: "scroll",
//               height: "calc(100vh - 200px)",
//             }}
//           >
//             <div className="col-md-12 form-rawmaterialpurchase-container">
//               <Nav
//                 className="col-12 d-flex justify-content-between"
//                 style={{
//                   backgroundColor: "#3368b5",
//                   color: "#fff",
//                   height: "24px",
//                 }}
//               >
//                 <div className="col-4 ">
//                   <Link></Link>
//                 </div>
//                 <div style={{ fontSize: "14px" }} className="col-4 text-center">
//                   <strong>Order</strong>
//                 </div>
//                 <div className="text-end col-4"></div>
//               </Nav>
//               <Form style={{ marginTop: "1%" }}>
//                 <div className="row ">
//                   <div className="col-9">
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Inv #:</div>
//                       <div className="col-sm-3">
//                         <Form.Control
//                           type="number"
//                           id="nextItemId"
//                           placeholder="Code"
//                           name="nextItemId"
//                           className="form-control-item"
//                           value={nextItemId}
//                           ref={SaleNo}
//                           onChange={(e) => handleInputChangefetchdata(e)}
//                           onKeyDown={(e) => handleEnterKeyPress(DATE, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Item:</div>
//                       <div className="col-sm-8" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="CustomerCode"
//                           placeholder="Code"
//                           name="CustomerCode"
//                           className="form-control-item"
//                           ref={CustomerCode}
//                           value={getfrefcod}
//                           style={{ width: "100px" }}
//                           onChange={handleInputChange3}
//                           // onKeyDown={(e) => handleEnterKeyPress(CustomerName, e)}
//                           // onKeyDown={(e) => {
//                           //   if (e.key === "Enter") {
//                           //     handleDoubleClick(e);
//                           //     handleEnterKeyPress(CustomerName, e);
//                           //   }
//                           // }}

//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               const upperCaseValue =
//                                 e.target.value.toUpperCase();
//                               const selectedItem = datalist.data.find(
//                                 (item) => item.TItmId === upperCaseValue
//                               );

//                               if (selectedItem) {
//                                 console.log("selectedItem:", selectedItem);
//                                 handleEnterKeyPress(Remarks, e);
//                               } else if (upperCaseValue.length < 9) {
//                                 // all feids empty

//                                 // handleEnterKeyPress(Description, e);
//                                 setAlertData({
//                                   type: "error",
//                                   message: `Please enter a valid account code`,
//                                 });
//                                 setTimeout(() => {
//                                   setAlertData(null);
//                                 }, 3000);
//                               } else {
//                                 handleEnterKeyPress(Remarks, e);
//                               }
//                             }
//                           }}
//                           onFocus={(e) => e.target.select()}
//                           onDoubleClick={(e) => {
//                             if (e.target.value.length <= 9) {
//                               handleDoubleClickAccount(e);
//                               setTimeout(() => {
//                                 focusNextInput(SearchBoxAccount);
//                               }, 100);
//                             }
//                           }}
//                           // style={{
//                           //   border: fieldErrors.accountCode
//                           //     ? "1px solid red"
//                           //     : "",

//                           //   transition:
//                           //     "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
//                           // }}
//                           // ref={Code}
//                         />
//                         <Form.Control
//                           type="text"
//                           id="CustomerName"
//                           placeholder="Customer"
//                           name="CustomerName"
//                           className="form-control-item"
//                           ref={CustomerName}
//                           onFocus={(e) => e.target.select()}
//                           value={getfrefcoddes}
//                           // style={{ width: "700px" }}
//                           onChange={handleInputChange3}
//                           onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Remarks:</div>
//                       <div className="col-sm-8" style={{ display: "flex" }}>
//                         <Form.Control
//                           id="Remarks"
//                           placeholder="Remarks"
//                           name="Remarks"
//                           className="form-control-item"
//                           ref={Remarks}
//                           onFocus={(e) => e.target.select()}
//                           value={getftrnrem}
//                           onChange={handleInputChange3}
//                           onKeyDown={(e) => handleEnterKeyPress(USEREF4, e)} // Adjust as needed
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-3">
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Date:</div>
//                       <div className="col-sm-10" style={{ display: "flex" }}>
//                         <input
//                           style={{ height: "24px", marginLeft: "-10px" }}
//                           type="date"
//                           format="dd-mm-yyyy"
//                           className="col-12"
//                           value={dateFormate}
//                           ref={DATE}
//                           onKeyDown={(e) =>
//                             handleEnterKeyPress(CustomerCode, e)
//                           }
//                           onChange={(e) => setDateFormate(e.target.value)}
//                           defaultValue={defaultFromDate}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-2 label-item">Time:</div>
//                       <div className="col-sm-10" style={{ display: "flex" }}>
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Time"
//                           disabled
//                           className="form-control-item"
//                           value={formattedTime}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </Form>
//               <br />

//             </div>
//           </div>
//           <br />
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrderList_Info;
