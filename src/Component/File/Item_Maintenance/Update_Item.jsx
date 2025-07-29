import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Footer from "../../MainComponent/Footer/Footer";
import { HiRefresh } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import "./Item_Maintenance.css";
import { useTheme } from "../../../ThemeContext";

function Update_Item() {
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const { TItmId } = useParams();
  const imageurl = `${apiLinks}/itemimage/`;
  const [user, setUser] = useState({
    TItmId: "",
    dscription: "",
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    rspcode: "",
    dscription1: "",
    amount1: "",
    dscription2: "",
    amount2: "",
    dscription3: "",
    amount3: "",
    dscription4: "",
    amount4: "",
    dscription5: "",
    amount5: "",
    itmsts: "",
    ctgid: "",
    TItmPic: "",
    tctgdsc: "",
    rspcode1: "",
    rspcode2: "",
    rspcode3: "",
    rspcode4: "",
    rspcode5: "",
  });
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  useEffect(() => {
    fetch(`${apiLinks}/get_item.php?TItmId=${TItmId}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.TItmId === TItmId);
        setUser(user);
        setPreviewImage1(user.TItmPic ? imageurl + user.TItmPic : "");
      })
      .catch((error) => console.error(error));
  }, [TItmId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////
  const Code = useRef(null);
  const Description = useRef(null);
  const Receipe = useRef(null);

  const Line1 = useRef(null);
  const Line2 = useRef(null);
  const Line3 = useRef(null);
  const Line4 = useRef(null);
  const Description1 = useRef(null);
  const Amount1 = useRef(null);
  const Description2 = useRef(null);
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
  const Receipe1 = useRef(null);
  const Receipe2 = useRef(null);
  const Receipe3 = useRef(null);
  const Receipe4 = useRef(null);
  const Receipe5 = useRef(null);
  const [companydata, setCompanydata] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

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
          setSelectedCategoryId(apiData[0].tctgcod);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
  const [capacitydata, setCapacitydata] = useState([]);
  const [selectedCapacityId, setSelectedCapacityId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/CapacityList.php`);
        const apiData = await response.json();
        setCapacitydata(apiData);
        if (apiData.length > 0) {
          setSelectedCapacityId(apiData[0].tcapcod);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [typedata, setTypedata] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/TypeList.php`);
        const apiData = await response.json();
        setTypedata(apiData);
        if (apiData.length > 0) {
          setSelectedTypeId(apiData[0].ttypcod);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // const fields = [Description, Status];

    // fields.forEach((fieldRef) => {
    //   if (fieldRef.current && fieldRef.current.value.trim() === "") {
    //     fieldRef.current.classList.add("error");
    //     setTimeout(() => {
    //       fieldRef.current.classList.remove("error");
    //     }, 3000);
    //   }
    // });

    // const emptyFields = fields.filter(
    //   (fieldRef) => fieldRef.current && fieldRef.current.value.trim() === ""
    // );
    // if (emptyFields.length > 0) {
    //   setAlertData({
    //     type: "error",
    //     message: "All fields are required. Please fill in all fields.",
    //   });
    //   setTimeout(() => {
    //     setAlertData(null);
    //   }, 3000);
    //   return;
    // }

    try {
      const formData = new FormData();

      formData.append("id", user.TItmId);
      formData.append("dscription", user.dscription);
      formData.append("status", user.itmsts);
      formData.append("categoryId", user.ctgid);
      // formData.append("rspCode", user.rspcode);

      formData.append("line1", user.line1);
      formData.append("line2", user.line2);
      formData.append("line3", user.line3);
      formData.append("line4", user.line4);
      formData.append("dscription1", user.dscription1);
      formData.append("dscription2", user.dscription2);
      formData.append("dscription3", user.dscription3);
      formData.append("dscription4", user.dscription4);
      formData.append("dscription5", user.dscription5);
      formData.append("amount1", user.amount1);
      formData.append("amount2", user.amount2);
      formData.append("amount3", user.amount3);
      formData.append("amount4", user.amount4);
      formData.append("amount5", user.amount5);
      formData.append("receipe1", user.rspcode1);
      formData.append("receipe2", user.rspcode2);
      formData.append("receipe3", user.rspcode3);
      formData.append("receipe4", user.rspcode4);
      formData.append("receipe5", user.rspcode5);
      formData.append("pic", selectedImage1);
      const response = await axios.post(
        `${apiLinks}/update_item.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response);

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
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setAlertData({
        type: "error",
        message:
          "An error occurred while updating the item. Please try again later.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 2000);
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
                  <strong>Update Item</strong>
                </div>
                <div className="text-end col-4" style={{ marginTop: "-1%" }}>
                  <Link to="/Get_Item" className="topBtn">
                    {/* <i className="fa fa-close fa-2md crossBtn"></i> */}
                  </Link>
                </div>
              </Nav>
              <br />
              <Form onSubmit={handleFormSubmit}>
                <div className="row ">
                  <div className="row">
                    <div className="col-sm-2 label-item">Code:</div>
                    <div className="col-sm-2">
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Code"
                        name="itmIdd"
                        className="form-control-item"
                        disabled
                        value={user.TItmId}
                        ref={Code}
                        onKeyDown={(e) => handleEnterKeyPress(Status, e)}
                      />
                    </div>
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
                          name="itmsts"
                          value={user.itmsts}
                          onChange={handleInputChange}
                          // onChange={(e) => setSelectedStatus(e.target.value)}
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
                        id="dscription"
                        placeholder="Description"
                        name="dscription"
                        className="form-control-item"
                        ref={Description}
                        value={user.dscription}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Receipe, e)}
                      />
                    </div>
                    {/* <div className="col-sm-1 label-item">Receipe:</div>
                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode"
                          value={user.rspcode}
                          onChange={handleInputChange}
                          onKeyDown={(e) => handleEnterKeyPress(Line1, e)}
                          ref={Receipe}
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
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-item">Line1:</div>
                    <div className="col-sm-6" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="line1"
                        placeholder="Line1"
                        name="line1"
                        className="form-control-item"
                        ref={Line1}
                        value={user.line1}
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
                        id="line2"
                        placeholder="Line2"
                        name="line2"
                        className="form-control-item"
                        ref={Line2}
                        value={user.line2}
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
                        id="line3"
                        placeholder="Line3"
                        name="line3"
                        className="form-control-item"
                        ref={Line3}
                        value={user.line3}
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
                        id="line4"
                        placeholder="Line4"
                        name="line4"
                        className="form-control-item"
                        ref={Line4}
                        value={user.line4}
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
                        id="dscription1"
                        placeholder="Description1"
                        name="dscription1"
                        className="form-control-item"
                        ref={Description1}
                        value={user.dscription1}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount1, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount1:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="amount1"
                        placeholder="Amount1"
                        name="amount1"
                        className="form-control-item"
                        ref={Amount1}
                        value={user.amount1}
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
                          name="rspcode1"
                          value={user.rspcode1}
                          onChange={handleInputChange}
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
                        id="dscription2"
                        placeholder="Description2"
                        name="dscription2"
                        className="form-control-item"
                        ref={Description2}
                        value={user.dscription2}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount2, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount2:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="amount2"
                        placeholder="Amount2"
                        name="amount2"
                        className="form-control-item"
                        ref={Amount2}
                        value={user.amount2}
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
                          name="rspcode2"
                          value={user.rspcode2}
                          onChange={handleInputChange}
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
                        id="dscription3"
                        placeholder="Description3"
                        name="dscription3"
                        className="form-control-item"
                        ref={Description3}
                        value={user.dscription3}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount3, e)}
                      />
                    </div>

                    <div className="col-sm-2 label-item">Amount3:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="amount3"
                        placeholder="Amount3"
                        name="amount3"
                        className="form-control-item"
                        ref={Amount3}
                        value={user.amount3}
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
                          name="rspcode3"
                          value={user.rspcode3}
                          onChange={handleInputChange}
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
                        id="dscription4"
                        placeholder="Description4"
                        name="dscription4"
                        className="form-control-item"
                        ref={Description4}
                        value={user.dscription4}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount4, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount4:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="amount4"
                        placeholder="Amount4"
                        name="amount4"
                        className="form-control-item"
                        ref={Amount4}
                        value={user.amount4}
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
                          name="rspcode4"
                          value={user.rspcode4}
                          onChange={handleInputChange}
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
                        id="dscription5"
                        placeholder="Description5"
                        name="dscription5"
                        className="form-control-item"
                        ref={Description5}
                        value={user.dscription5}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Amount5, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-item">Amount5:</div>
                    <div className="col-sm-2" style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        id="amount5"
                        placeholder="Amount5"
                        name="amount5"
                        className="form-control-item"
                        ref={Amount5}
                        value={user.amount5}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Receipe5, e)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Form.Control
                          as="select"
                          name="rspcode5"
                          value={user.rspcode5}
                          onChange={handleInputChange}
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
                          name="rspcode"
                          value={user.rspcode}
                          // onChange={(e) => {
                          //   setSelectedCategoryId(e.target.value);
                          // }}
                          onChange={handleInputChange}
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
                              src={imageurl + user.TItmPic}
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

export default Update_Item;
