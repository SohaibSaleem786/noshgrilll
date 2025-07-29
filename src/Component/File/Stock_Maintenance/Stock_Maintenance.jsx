import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Stock_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";

import { Modal } from "react-bootstrap";
import { fetchData } from "../../react_query/React_Query_Function";

function Stock_Maintenance() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const primaryColor = "#1f2670";
  const secondaryColor = "white";
  const fontFamily = "verdana";
  const apiLinks =
    "https://crystalsolutions.com.pk/umair_electronic/web/CapacityList.php";
  // Create refs for each input field
  const [Descriptionform, setDescriptionform] = useState("");
  const [AccountCodeform, setAccountCodeform] = useState("");
  const [Debitform, setDebitform] = useState(0.0);
  const [Creditform, setCreditform] = useState(0.0);
  const Code = useRef(null);
  const Status = useRef(null);
  const Description = useRef(null);
  const Debit = useRef(null);
  const Credit = useRef(null);
  const Submit = useRef(null);
  const Clear = useRef(null);
  const Return = useRef(null);
  const SearchBox = useRef(null);

  const [accountdropdown, setAccountdropdown] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [accountdata, setaccountdata] = useState([]);
  console.log(selectedCompanyId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crystalsolutions.com.pk/umair_electronic/web/CapacityList.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const transformedData = jsonData.map((item) => ({
          tcapcod: item.tcapcod,
          tcapdsc: item.tcapdsc,
        }));
        setAccountdropdown(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const fetchnewdata = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/umair_electronic/web/CapacityCode.php"
      );

      const data = await response.json();
      const Code = data.code;
      setAccountCodeform(Code);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/umair_electronic/web/CapacityCode.php"
        );

        const data = await response.json();
        const Code = data.code;
        setAccountCodeform(Code);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const accountcode = async () => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/umair_electronic/web/CapacityCode.php"
      );

      const data = await response.json();
      const Code = data.code;

      setAccountCodeform(Code);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      cstss: selectedStatus,
    };

    try {
      const formData = new FormData();

      formData.append("capdsc", Description.current.value);
      formData.append("capsts", value.cstss);
      formData.append("code", Code.current.value);
      formData.append("userid", 33);
      axios
        .post(
          `https://crystalsolutions.com.pk/umair_electronic/web/AddCapacity.php`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )

        .then((response) => {
          console.log(response);
          if (response.data.error === 200) {
            Code.current.focus();
            fetchnewdata();
            fetchDataAndDisplayy();
            accountcode();
            // setAccountCodeform("");
            setDescriptionform("");
            setSelectedStatus("");
            settextdata("Capacity Maintenance");
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              // navigate("/AccountCode_Maintenance");
            }, 3000);
          } else {
            console.log(response.data.message);

            setAlertData({
              type: "error",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
            }, 2000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });

      setAlert("Image uploaded successfully.");
    } catch (error) {
      setAlert("Error uploading image.");
      console.error(error);
    } finally {
    }
  };

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  useEffect(() => {
    // Focus on the first input when the component mounts
    if (Code.current) {
      Code.current.focus();
    }
  }, []);
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/AccountCode_Maintenance");
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [textdata, settextdata] = useState("Stock Maintenance");

  const handleCloseModal = () => {
    setData({ columns: [], rows: [] });
    setSearchText("");
    setHighlightedRowIndex(0);
    settextdata("Update Capacity Maintenance");

    setModalOpen(false);
  };
  const firstColWidth = "120px";
  const secondColWidth = "480px";
  const thirdColWidth = "150px";
  const fourthColWidth = "70px";
  const [Length, setLength] = useState("");

  const handleDoubleClick = (e) => {
    focusNextInput(Code);
    console.log("====== handle double click=======");
    // setSearchText(e.target.value);
    setModalOpen(true);
  };

  // const { dataa, error, isLoading } = useQuery("chartOfAccounts", fetchData);

  const fetchDataAndDisplay = async () => {
    try {
      const transformedData = await fetchData(apiLinks);
      const columns = [
        { label: "Code", field: "tacccod", sort: "asc" },
        { label: "Description", field: "taccdsc", sort: "asc" },
        { label: "Status", field: "taccsts", sort: "asc" },
      ];
      setData({ columns, rows: transformedData });
      setLength(transformedData.length);
    } catch (error) {
      // setError(error);
    } finally {
      // setIsLoading(false);
    }
  };
  const [dataa, setDataa] = useState({ columns: [], rows: [] });
  const fetchDataAndDisplayy = async () => {
    try {
      const transformedData = await fetchData(apiLinks);
      const columns = [
        { label: "Code", field: "tacccod", sort: "asc" },
        { label: "Description", field: "taccdsc", sort: "asc" },
        { label: "Status", field: "taccsts", sort: "asc" },
      ];
      setDataa({ columns, rows: transformedData });
      // setLengthh(transformedData.length);
    } catch (error) {
      // setError(error);
    } finally {
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDataAndDisplayy();
  }, []);
  const formatAccountCode = (value) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})(\d{3})/, "$1-$2-$3");
    if (formattedValue.length === 9) {
      Status.current.focus();
    }
    return formattedValue;
  };
  const formatAmount = (value) => {
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    let num = parseFloat(cleanedValue);
    if (isNaN(num)) {
      return value;
    }
    return num.toLocaleString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.trim().toUpperCase(); // Trim and convert to uppercase

    if (name === "AccountCodeform") {
      formattedValue = formatAccountCode(formattedValue);
      console.log("Searching for:", formattedValue);

      const selectedItem = dataa.rows.find(
        (item) => item.tcapcod === formattedValue
      );

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setAccountCodeform(selectedItem.tcapcod);
        setDescriptionform(selectedItem.tcapdsc);
        setSelectedStatus(selectedItem.tcapsts);
      } else {
        setDescriptionform("");
        setAccountCodeform(formattedValue);
        setSelectedStatus("");
      }
    } else if (name === "Descriptionform") {
      const uppercase = value.toUpperCase();
      setDescriptionform(uppercase);
    } else {
      setDescriptionform("");
      setAccountCodeform("");
      setSelectedStatus("");
    }
  };

  // useEffect(() => {
  //   // fetchDataAndDisplay();
  // }, []);
  const filteredRows = data.rows.filter(
    (row) =>
      (row.tcapcod &&
        row.tcapcod.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tcapdsc &&
        row.tcapdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tcapsts &&
        row.tcapsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    const uppercasesearch = event.target.value.toUpperCase();
    setSearchText(uppercasesearch);
  };
  const resetData = () => {
    setData({ columns: [], rows: [] });
    setSearchText("");
  };
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const firstRowRef = useRef(null);
  const handleRowClick = (rowData, rowIndex) => {
    console.log("handleRowClickAccount", rowData);
    setModalOpen(false);
    setHighlightedRowIndex(0);
    setSelectedStatus(rowData.tcapsts);
    setDescriptionform(rowData.tcapdsc);
    setAccountCodeform(rowData.tcapcod);
    resetData();
  };

  // React.useEffect(() => {
  //   return () => resetData();
  // }, []);
  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setAccountCodeform("");
    setDescriptionform("");

    setSelectedStatus("");
    Code.current.focus();
  };
  const handleReturn = () => {
    navigate("/MainPage");
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

  const handleArrowKeyPress = (direction) => {
    if (filteredRows.length === 0) return;

    let newIndex = highlightedRowIndex;
    let upindex = highlightedRowIndex - 10;
    let bottomindex = highlightedRowIndex + 10;

    if (direction === "up") {
      const rowElement = document.getElementById(`row-${upindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.max(-1, highlightedRowIndex - 1);
    } else if (direction === "down") {
      const rowElement = document.getElementById(`row-${bottomindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.min(filteredRows.length - 1, highlightedRowIndex + 1);
    }

    setHighlightedRowIndex(newIndex);
  };

  const [enterCount, setEnterCount] = useState(0);
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <Header />

        <div
          className="col-12"
          style={{
            color: "black",
            fontWeight: "bold",
            fontFamily: fontFamily,
            backgroundColor: "white",
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              // backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <div className="col-md-12 form-accountcode-container">
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  height: "24px",
                }}
              >
                {/* <div className="col-4 ">
                  <Link onClick={handleFormSubmit}>
                    <i
                      className="fa-solid fa-upload fa-xl topBtn"
                      title="Next Page"
                    ></i>
                  </Link>

                  <i className="fa fa-refresh fa-xl topBtn" title="Refresh"></i>
                </div> */}
                <div
                  style={{ fontSize: "14px" }}
                  className="col-12 text-center"
                >
                  <strong>{textdata}</strong>
                </div>
                {/* <div className="text-end col-4">
                  <Link
                    to="/MainPage"
                    className="topBtn"
                    onClick={() => setModalOpen(false)}
                  >
                    <i className="fa fa-close fa-xl crossBtn"></i>
                  </Link>
                </div> */}
              </Nav>
              <br />
              <Form>
                <div className="row scroll-account">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-2 account-field">Code:</div>
                      <div className="col-sm-4 input-account">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            className="form-control-account"
                            placeholder="Code"
                            name="AccountCodeform"
                            value={AccountCodeform}
                            onChange={(e) => handleInputChange(e)}
                            maxLength={3}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const upperCaseValue =
                                  e.target.value.toUpperCase();
                                const selectedItem = dataa.rows.find(
                                  (item) => item.tcapcod === upperCaseValue
                                );

                                if (selectedItem) {
                                  console.log("selectedItem:", selectedItem);
                                  handleEnterKeyPress(Status, e);
                                }
                                //  else if (upperCaseValue.length < 3) {
                                //   // handleEnterKeyPress(Description, e);
                                //   setAlertData({
                                //     type: "error",
                                //     message: `Please enter a valid account code`,
                                //   });
                                //   setTimeout(() => {
                                //     setAlertData(null);
                                //   }, 3000);
                                // }
                                else {
                                  handleEnterKeyPress(Status, e);
                                }
                              }
                            }}
                            onFocus={(e) => e.target.select()}
                            onDoubleClick={(e) => {
                              if (e.target.value.length <= 3) {
                                handleDoubleClick(e);
                                setTimeout(() => {
                                  focusNextInput(SearchBox);
                                }, 100);
                              }
                            }}
                            ref={Code}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-sm-2 account-field">Status:</div>
                      <div className="col-sm-4 input-account">
                        <Form.Group
                          controlId="status"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            as="select"
                            name="AreStss"
                            className="form-control-account"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            onKeyDown={(e) =>
                              handleEnterKeyPress(Description, e)
                            }
                            ref={Status}
                            style={{
                              height: "24px",
                              // width: "100px",
                              fontSize: "11px",
                              padding: "1px 10px ",
                              borderRadius: "0px",
                              backgroundColor: "white",
                              boxShadow: "none",
                            }}
                          >
                            <option value="A">Active</option>
                            <option value="N">Non Active</option>
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 account-field">Description:</div>
                      <div className="col-sm-10 input-account">
                        <Form.Group
                          controlId="description"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            className="form-control-account"
                            placeholder="Description"
                            name="Descriptionform"
                            value={Descriptionform}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                            ref={Description}
                            onFocus={(e) => e.target.select()}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </Form>
              {/* <p style={{ borderTop: "1px solid black " }}></p> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: "2px",
                  borderTop: "1px solid gray ",
                }}
              >
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",
                    backgroundColor: "#3368B5",
                  }}
                  onFocus={() => handleFocus(Submit)}
                  onBlur={() => handleBlur(Submit)}
                  accessKey="s"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "s") {
                      handleSave();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Return.current.focus();
                      event.preventDefault();
                    }
                  }}
                  onClick={handleFormSubmit}
                  ref={Submit}
                >
                  Save
                </button>

                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="r"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "r") {
                      handleReturn();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Clear.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  onFocus={() => handleFocus(Return)}
                  onBlur={() => handleBlur(Return)}
                  ref={Return}
                  onClick={handleReturn}
                >
                  Return
                </button>
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                    width: "75px",
                    marginLeft: "2px",
                    height: "25px",
                    marginTop: "2px",
                    color: "white",

                    backgroundColor: "#3368B5",
                  }}
                  accessKey="c"
                  onKeyDown={(event) => {
                    if (event.altKey && event.key === "c") {
                      handleClear();
                      event.preventDefault();
                    } else if (event.key === "ArrowLeft") {
                      Return.current.focus();
                      event.preventDefault();
                    } else if (event.key === "ArrowRight") {
                      Submit.current.focus();
                      event.preventDefault();
                    }
                  }}
                  ref={Clear}
                  onFocus={() => handleFocus(Clear)}
                  onBlur={() => handleBlur(Clear)}
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <Modal
                show={isModalOpen}
                onHide={handleCloseModal}
                size="lg"
                // style={{ maxWidth: "60%", width: "80%" }}
              >
                <Nav
                  className="col-12 d-flex justify-content-between"
                  style={{
                    backgroundColor: "#3368b5",
                    color: "#fff",
                    height: "24px",
                  }}
                >
                  <div className="col-4 ">
                    <i
                      className="fa fa-refresh fa-lg topBtn"
                      title="Refresh"
                    ></i>
                  </div>
                  <div
                    style={{ fontSize: "14px" }}
                    className="col-4 text-center"
                  >
                    <strong>Select Capacity</strong>
                  </div>
                  <div className="text-end col-4">
                    <Link
                      onClick={() => setModalOpen(false)}
                      // onClick={handleCloseModalAccount}
                      className="topBtn"
                    >
                      <i className="fa fa-close fa-lg crossBtn"></i>
                    </Link>
                  </div>
                </Nav>
                <Modal.Body>
                  <Row>
                    <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4 }}>
                      <Form.Control
                        type="text"
                        className="form-control-employee search"
                        style={{
                          height: "25px",
                          boxShadow: "none",
                          margin: "0.5%",
                          backgroundColor: "white",
                        }}
                        name="searchText"
                        ref={SearchBox}
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (enterCount === 0) {
                              fetchDataAndDisplay();
                              setEnterCount(1);
                            } else if (enterCount === 1) {
                              fetchDataAndDisplay();
                              const selectedRowData =
                                filteredRows[highlightedRowIndex];
                              handleRowClick(
                                selectedRowData,
                                highlightedRowIndex
                              );
                              setEnterCount(0); // Reset count after the second enter press
                            }
                          } else if (e.key === "ArrowUp") {
                            handleArrowKeyPress("up");
                          } else if (e.key === "ArrowDown") {
                            handleArrowKeyPress("down");
                          } else {
                            setEnterCount(0); // Reset count for any other key press
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <table
                    className="custom-table-area"
                    style={{ color: "black" }}
                  >
                    <thead>
                      <tr>
                        <th
                          class="sticky-header-area"
                          style={{
                            width: firstColWidth,
                            fontWeight: "bold",
                            textAlign: "center",
                            borderRight: "1px solid black",
                          }}
                        >
                          Code
                        </th>
                        <th
                          class="sticky-header-area"
                          style={{
                            width: secondColWidth,
                            textAlign: "center",

                            fontWeight: "bold",
                            borderRight: "1px solid black",
                          }}
                        >
                          Description
                        </th>
                        <th
                          class="sticky-header-area"
                          style={{
                            width: thirdColWidth,
                            textAlign: "center",

                            fontWeight: "bold",
                            borderRight: "1px solid black",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredRows.length === 0 ? (
                        <>
                          {Array.from({ length: 9 }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 3 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}
                          {/* <tr>
                            <td colSpan={3} style={{ textAlign: "center" }}>
                              <div style={{ padding: "20px" }}>
                                <Spinner animation="border" variant="primary" />
                                <p>No data available</p>
                              </div>
                            </td>
                          </tr> */}
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                width: firstColWidth,
                              }}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                width: secondColWidth,
                              }}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                width: thirdColWidth,
                              }}
                            ></td>
                          </tr>
                          {Array.from({ length: 9 }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 3 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          {filteredRows.map((row, index) => (
                            <tr
                              style={{
                                fontWeight:
                                  highlightedRowIndex === index
                                    ? "bold"
                                    : "normal",
                                border:
                                  highlightedRowIndex === index
                                    ? "1px solid #3368B5"
                                    : "1px solid #3368B5",
                                backgroundColor:
                                  highlightedRowIndex === index
                                    ? "#739ad1"
                                    : "",
                              }}
                              ref={index === 0 ? firstRowRef : null}
                              key={index}
                              id={`row-${index}`}
                              onClick={(e) => {
                                handleRowClick(row, index);
                              }}
                            >
                              <td style={{ width: firstColWidth }}>
                                {row.tcapcod}
                              </td>
                              <td
                                style={{
                                  width: secondColWidth,
                                  textAlign: "left",
                                }}
                              >
                                {row.tcapdsc}
                              </td>
                              <td style={{ width: thirdColWidth }}>
                                {row.tcapsts}
                              </td>
                            </tr>
                          ))}
                          {Array.from({
                            length: Math.max(0, 19 - filteredRows.length),
                          }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 3 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                    <tfoot>
                      <tr
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        <th
                          className="sticky-footer-area"
                          style={{
                            textAlign: "center",
                            width: firstColWidth,
                          }}
                        >
                          {Length}
                        </th>
                        <th
                          className="sticky-footer-area"
                          style={{
                            width: secondColWidth,
                          }}
                        ></th>
                        <th
                          className="sticky-footer-area"
                          style={{
                            width: thirdColWidth,
                          }}
                        ></th>
                      </tr>
                    </tfoot>
                  </table>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Stock_Maintenance;
