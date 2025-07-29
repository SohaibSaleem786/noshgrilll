import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Item_Maintenance.css";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../Redux/action";
import { useTheme } from "../../../ThemeContext";
function Add_Item() {
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);

  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  useEffect(() => {
    console.log("datalist", datalist.data);

    dispatch(fetchItem());
  }, [dispatch]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);

  const [length, setLength] = useState(0);
  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
      setLength(datalist.data.length);
    }
  }, [datalist.data]);
  //////////////////////// PRESS ENTER TO  MOVE THE NEXT FIELD //////////////////
  const Code = useRef(null);
  const Description = useRef(null);
  const Line1 = useRef(null);
  const Line2 = useRef(null);
  const Line3 = useRef(null);
  const Line4 = useRef(null);
  const Description1 = useRef(null);
  const Amount1 = useRef(null);
  const Description2 = useRef(null);
  const Receipe1 = useRef(null);
  const Receipe2 = useRef(null);
  const Receipe3 = useRef(null);
  const Receipe4 = useRef(null);
  const Receipe5 = useRef(null);
  const Amount2 = useRef(null);
  const Description3 = useRef(null);
  const Amount3 = useRef(null);
  const Description4 = useRef(null);
  const Amount4 = useRef(null);
  const Description5 = useRef(null);
  const Amount5 = useRef(null);
  const Category = useRef(null);
  const Status = useRef(null);
  const Submit = useRef(null);
  const [receipedata, setreceipedata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/RacipeList.php`);
        const apiData = await response.json();
        setreceipedata(apiData);
        // if (apiData.length > 0) {
        //   setSelectedreceipeId(apiData[0].code);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [companydata, setCompanydata] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CompanyList.php`);
        const apiData = await response.json();
        setCompanydata(apiData);
        if (apiData.length > 0) {
          setSelectedCompanyId(apiData[0].tcmpdsc);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [categorydata, setCategorydata] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
        const apiData = await response.json();
        setCategorydata(apiData);
        if (apiData.length > 0) {
          // setSelectedCategoryId(apiData[0].tctgid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [selectedReceipe1Id, setSelectedReceipe1Id] = useState("");
  const [selectedReceipe2Id, setSelectedReceipe2Id] = useState("");
  const [selectedReceipe3Id, setSelectedReceipe3Id] = useState("");
  const [selectedReceipe4Id, setSelectedReceipe4Id] = useState("");
  const [selectedReceipe5Id, setSelectedReceipe5Id] = useState("");

  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      vstss: selectedStatus,
      categoyss: selectedCategoryId,
    };

    console.log(
      "value",
      value.vstss,
      value.categoyss,
      selectedImage1,
      Description.current.value,
      Line1.current.value,
      Line2.current.value,
      Line3.current.value,
      Line4.current.value,
      Description1.current.value,
      Description2.current.value,
      Description3.current.value,
      Description4.current.value,
      Description5.current.value,
      Amount1.current.value,
      Amount2.current.value,
      Amount3.current.value,
      Amount4.current.value,
      Amount5.current.value,
      selectedImage1,
      selectedCategoryId,
      selectedStatus
    );
    try {
      const formData = new FormData();
      // formData.append("itmcod", Code.current.value);
      formData.append("dscription", Description.current.value);
      formData.append("status", value.vstss);
      formData.append("categoryId", value.categoyss);
      formData.append("line1", Line1.current.value);
      formData.append("line2", Line2.current.value);
      formData.append("line3", Line3.current.value);
      formData.append("line4", Line4.current.value);
      formData.append("dscription1", Description1.current.value);
      formData.append("dscription2", Description2.current.value);
      formData.append("dscription3", Description3.current.value);
      formData.append("dscription4", Description4.current.value);
      formData.append("dscription5", Description5.current.value);
      formData.append("amount1", Amount1.current.value);
      formData.append("amount2", Amount2.current.value);
      formData.append("amount3", Amount3.current.value);
      formData.append("amount4", Amount4.current.value);
      formData.append("amount5", Amount5.current.value);
      formData.append("receipe1", selectedReceipe1Id);
      formData.append("receipe2", selectedReceipe2Id);
      formData.append("receipe3", selectedReceipe3Id);
      formData.append("receipe4", selectedReceipe4Id);
      formData.append("receipe5", selectedReceipe5Id);

      formData.append("pic", selectedImage1);

      axios
        .post(`${apiLinks}/add_item.php`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_Item");
            }, 2000);
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
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  };
  const handlebackSubmit = (event) => {
    event.preventDefault();
    navigate("/Get_Item");
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^\d.]/g, "");
    e.target.value = formatAmount(inputValue);
  };

  const formatAmount = (value) => {
    const formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
  };

  const Clear = useRef(null);
  const Return = useRef(null);
  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    Code.current.focus();
  };
  const handleReturn = () => {
    navigate("/Get_Item");
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

        {/* <PathHead
          pageName="File > Item Maintenance > Add Item"
          screen="Get_Item"
          pageLink="/Get_Item"
        /> */}

        <div
          className="col-12"
          style={{
            backgroundColor: "#F5F5F5",

            color: "black",
            fontWeight: "bold",
            fontFamily: fontFamily,
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
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div className="col-md-12 form-item-container">
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
                  style={{ display: "flex", marginTop: "-1%" }}
                >
                  <Link onClick={handleFormSubmit}>
                    {/* <i
                      className="fa-solid fa-paper-plane fa-md topBtn"
                      title="Next Page"
                    ></i> */}
                  </Link>

                  {/* <i className="fa fa-refresh fa-md topBtn" title="Refresh"></i> */}
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>Add Item</strong>
                </div>
                <div className="text-end col-4" style={{ marginTop: "-1%" }}>
                  {/* <Link to="/Get_Item" className="topBtn">
                    <i className="fa fa-close fa-2md crossBtn"></i>
                  </Link> */}
                </div>
              </Nav>
              <br />
              <Form onSubmit={handleFormSubmit}>
                <div className="row ">
                  <div className="row">
                    <div className="col-sm-2 label-item">Code:</div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-3 label-item">Status:</div>
                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Form.Control
                          as="select"
                          name="itemStss"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                          ref={Status}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Description:</div>
                    <div className="col-sm-6" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Description"
                        name="Description"
                        className="form-control-item"
                        ref={Description}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Line1, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Line1:</div>
                    <div className="col-sm-6" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Line1"
                        placeholder="Line1"
                        name="Line1"
                        className="form-control-item"
                        ref={Line1}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Line2, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Line2:</div>
                    <div className="col-sm-6" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Line2"
                        placeholder="Line2"
                        name="Line2"
                        className="form-control-item"
                        ref={Line2}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Line3, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Line3:</div>
                    <div className="col-sm-6" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Line3"
                        placeholder="Line3"
                        name="Line3"
                        className="form-control-item"
                        ref={Line3}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Line4, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Line4:</div>
                    <div className="col-sm-6" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Line4"
                        placeholder="Line4"
                        name="Line4"
                        className="form-control-item"
                        ref={Line4}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Description1, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Description1:</div>
                    <div className="col-sm-3" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Description1"
                        placeholder="Description1"
                        name="Description1"
                        className="form-control-item"
                        ref={Description1}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount1, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount1:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Amount1"
                        placeholder="Amount1"
                        name="Amount1"
                        className="form-control-item"
                        ref={Amount1}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Receipe1, e)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode"
                          // value={rspcode}
                          onChange={(e) => {
                            setSelectedReceipe1Id(e.target.value);
                          }}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Description2, e)
                          }
                          ref={Receipe1}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          <option value="">Select Receipe</option>
                          {receipedata.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.discription}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Description2:</div>
                    <div className="col-sm-3" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Description2"
                        placeholder="Description2"
                        name="Description2"
                        className="form-control-item"
                        ref={Description2}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount2, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount2:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Amount2"
                        placeholder="Amount2"
                        name="Amount2"
                        className="form-control-item"
                        ref={Amount2}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Receipe2, e)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode"
                          // value={rspcode}
                          onChange={(e) => {
                            setSelectedReceipe2Id(e.target.value);
                          }}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Description3, e)
                          }
                          ref={Receipe2}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          <option value="">Select Receipe</option>
                          {receipedata.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.discription}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Description3:</div>
                    <div className="col-sm-3" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Description3"
                        placeholder="Description3"
                        name="Description3"
                        className="form-control-item"
                        ref={Description3}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount3, e)}
                      />
                    </div>

                    <div className="col-sm-2 label-item">Amount3:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Amount3"
                        placeholder="Amount3"
                        name="Amount3"
                        className="form-control-item"
                        ref={Amount3}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Receipe3, e)}
                      />
                    </div>

                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode"
                          // value={rspcode}
                          onChange={(e) => {
                            setSelectedReceipe3Id(e.target.value);
                          }}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Description4, e)
                          }
                          ref={Receipe3}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          <option value="">Select Receipe</option>
                          {receipedata.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.discription}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Description4:</div>
                    <div className="col-sm-3" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Description4"
                        placeholder="Description4"
                        name="Description4"
                        className="form-control-item"
                        ref={Description4}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount4, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount4:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Amount4"
                        placeholder="Amount4"
                        name="Amount4"
                        className="form-control-item"
                        ref={Amount4}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Receipe4, e)}
                      />
                    </div>

                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode"
                          // value={rspcode}
                          onChange={(e) => {
                            setSelectedReceipe4Id(e.target.value);
                          }}
                          onKeyDown={(e) =>
                            handleEnterKeyPress(Description5, e)
                          }
                          ref={Receipe4}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          <option value="">Select Receipe</option>
                          {receipedata.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.discription}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Description5:</div>
                    <div className="col-sm-3" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Description5"
                        placeholder="Description5"
                        name="Description5"
                        className="form-control-item"
                        ref={Description5}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount5, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount5:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="Amount5"
                        placeholder="Amount5"
                        name="Amount5"
                        className="form-control-item"
                        ref={Amount5}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Category, e)}
                      />
                    </div>

                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode"
                          // value={rspcode}
                          onChange={(e) => {
                            setSelectedReceipe5Id(e.target.value);
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Category, e)}
                          ref={Receipe5}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          <option value="">Select Receipe</option>
                          {receipedata.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.discription}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-item">Category:</div>
                    <div className="col-sm-4">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="categoryIdd"
                          onChange={(e) => {
                            setSelectedCategoryId(e.target.value);
                          }}
                          onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                          ref={Category}
                          id="companyid"
                          style={{
                            height: "27px",
                            fontSize: "11px",
                          }}
                          className="form-control-item custom-select" // Add the custom CSS class 'custom-select'
                        >
                          {categorydata.map((item) => (
                            <option key={item.tctgid} value={item.tctgid}>
                              {item.tctgdsc}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <br />
                  <br />
                  <div className="Pictureitem">
                    <div style={{ flex: 1 }}>
                      <label htmlFor="pic" style={{ display: "block" }}>
                        <div
                          style={{
                            width: "30%",
                            height: "100px",
                            marginLeft: "40%",
                            border: "2px dashed #bbb",
                            borderRadius: "5px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#aaa",
                              marginBottom: "1%",
                            }}
                          >
                            Click to Upload
                          </span>
                          <label htmlFor="pic" style={{ cursor: "pointer" }}>
                            <img
                              id="pic-preview"
                              src=""
                              alt="Upload"
                              style={{
                                width: "70px",
                                height: "70px",
                                display: "block",
                              }}
                            />
                            <input
                              type="file"
                              id="pic"
                              style={{ display: "none" }}
                              onChange={handleImageChange1}
                            />
                          </label>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <br />
                {/* <hr
                  style={{
                    borderTop: "1px solid gray",
                    boxShadow: "0px 1px 2px gray",
                    width: "100%",
                  }}
                />

                <div className="row">
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className=" btn-primary-item"
                      onClick={handleFormSubmit}
                      style={{ border: "none" }}
                    >
                      SAVE
                    </button>
                    <button
                      className=" btn-primary-item"
                      onClick={handlebackSubmit}
                      style={{ border: "none" }}
                    >
                      RETURN
                    </button>

                    <button
                      className=" btn-primary-item"
                      style={{ border: "none" }}
                    >
                      NEW
                    </button>
                  </div>
                </div> */}
              </Form>
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
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Add_Item;
